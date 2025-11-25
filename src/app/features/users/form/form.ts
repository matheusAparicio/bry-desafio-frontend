import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { UserServiceAdapter } from 'src/app/core/services/user-adapter';
import { CustomersService } from 'src/app/core/services/customers';
import { EmployeesService } from 'src/app/core/services/employees';
import { Auth } from 'src/app/core/services/auth';
import { CompaniesService } from 'src/app/core/services/companies';
import { CompanyUserService } from 'src/app/core/services/company-user';
import { FileService } from 'src/app/core/services/file';
import { noAccentValidator } from 'src/app/shared/validators/no-accent.validator';

@Component({
  standalone: true,
  selector: 'user-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form {

  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  isEmployee = signal(false);
  isSelf = signal(false);

  mode = signal<'new' | 'edit'>('new');
  userType = signal<'customers' | 'employees'>('customers');

  fileToUpload = signal<File | null>(null);
  fileName = signal<string | null>(null);

  selectedCompanies = signal<any[]>([]);
  allCompanies = signal<any[]>([]);

  service!: UserServiceAdapter;

  title() {
    var modality = this.isCreateMode() ? 'Novo': 'Editar';
    var type = this.userType() === 'customers'
    ? 'Cliente'
    : 'Funcionário';
    return modality + ' ' + type;
  }

  id: number | null = null;

  form = new FormGroup({
    login: new FormControl('', [Validators.required, noAccentValidator()]),
    name: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl<'customer' | 'employee'>('customer'),
    address: new FormControl('', Validators.required),
    password: new FormControl('')
  });  

  constructor(
    private route: ActivatedRoute,
    private customers: CustomersService,
    private employees: EmployeesService,
    private companies: CompaniesService,
    private companyUser: CompanyUserService,
    private file: FileService,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // this.init();
  }

  handleFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    this.fileToUpload.set(file);
    this.fileName.set(file.name);
  }

  clearFile() {
    this.fileToUpload.set(null);
    this.fileName.set(null);
  }

  cancel() {
    this.router.navigate([`/${this.userType()}`]);
  }

  openCompanyModal() {
    this.companies.list().subscribe({
      next: (companies) => {
        this.allCompanies.set(companies.data);
  
        const selected = prompt(
          "Digite o ID da empresa para vincular:\n\n" +
          companies.data.map(c => `${c.id} - ${c.name}`).join("\n")
        );
  
        const comp = companies.data.find(c => c.id == Number(selected));
        if (!comp) return;
  
        this.selectedCompanies.update(list => [...list, comp]);
      }
    });
  }

  removeCompany(index: number) {
    this.selectedCompanies.update(list => list.filter((_, i) => i !== index));
  }

  ngAfterViewInit() {
    const url = this.router.url;

    if (url.startsWith('/customers')) {
      this.userType.set('customers');
      this.service = this.customers;
    } else {
      this.userType.set('employees');
      this.service = this.employees;
    }

    const params = this.route.snapshot.params;
    this.id = params['id'] ? Number(params['id']) : null;

    this.mode.set(this.id ? 'edit' : 'new');

    const current = this.auth.user();
    if (current) {
      this.isEmployee.set(current.type === 'employee');
      this.isSelf.set(current.id === this.id);
    }

    if (this.mode() === 'edit' && this.id) {
      this.loadUser(this.id);
    } else {
      if (!this.isEmployee()) {
        this.form.get('type')?.setValue('customer');
      }
      this.loading.set(false);
    }
  }

  loadUser(id: number) {
    this.loading.set(true);
  
    const user = history.state.user;
  
    if (!user) {
      this.error.set("Usuário não encontrado no estado da rota.");
      this.loading.set(false);
      return;
    }
  
    // Preenche os campos básicos
    this.form.patchValue({
      login: user.login,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      type: user.type,
      address: user.address,
      password: ''
    });
  
    // Empresas vinculadas
    this.selectedCompanies.set(user.companies || []);
  
    // Arquivo existente
    if (user.document_file) {
      this.fileName.set(user.document_file.filename);
    }
  
    // Trava/destrava campos
    this.disableLockedFields(user);
  
    this.cdr.detectChanges();
    this.loading.set(false);
  }

  downloadFile() {
    const user = history.state.user;
    if (!user?.document_file) return;
  
    const fileId = user.document_file.id;
  
    this.file.get(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
  
      a.href = url;
      a.download = user.document_file.filename;
      a.click();
  
      window.URL.revokeObjectURL(url);
    });
  }
  

  disableLockedFields(target: any) {
    const current = this.auth.user();
  
    this.form.get('login')?.disable();
    this.form.get('cpf')?.disable();
    this.form.get('email')?.disable();
  
    if (current.type !== 'employee') {
      this.form.get('type')?.disable();
    } else {
      this.form.get('type')?.enable();
    }
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
  
    // remove password se vazio
    const payload = {
      ...raw,
      ...(raw.password ? { password: raw.password } : {})
    };
  
    this.saving.set(true);
  
    const request$ = this.isCreateMode()
      ? this.service.create(payload)             // POST
      : this.service.update(this.id!, payload);  // PUT
  
    request$.subscribe({
      next: (res: any) => {
        const userId = this.isCreateMode()
          ? res.user.id
          : this.id!; // edição usa o id atual
  
        // upload de arquivo (se houver)
        if (this.fileToUpload()) {
          const formData = new FormData();
          formData.append("file", this.fileToUpload()!);
          formData.append("user_id", userId);
          this.file.upload(formData).subscribe();
        }
  
        // vincular empresas
        this.selectedCompanies().forEach(company => {
          this.companyUser.attach({
            user_id: userId,
            company_id: company.id
          }).subscribe();
        });
  
        this.saving.set(false);
        this.router.navigate([`/${this.userType()}`]);
      },
  
      error: (err: any) => {
        this.error.set(err.error?.error || "Erro ao salvar usuário");
        this.saving.set(false);
      }
    });
  }

  remove() {
    if (!this.id) return;

    if (!confirm("Deseja excluir este usuário?")) return;

    this.service.delete(this.id).subscribe({
      next: () => {
        const current = this.auth.user();
        if (current && current.id === this.id) {
          this.auth.logout();
          return;
        }
        this.router.navigate([`/${this.userType()}`]);
      },
      error: (err: any) => {
        this.error.set(err.error?.error || "Erro ao excluir.");
      }
    });
  }

  canEditType() {
    return this.isEmployee();
  }

  isCreateMode() {
    return this.mode() === 'new';
  }
}
