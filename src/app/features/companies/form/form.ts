import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CompaniesService } from 'src/app/core/services/companies';

@Component({
  standalone: true,
  selector: 'company-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form {

  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  mode = signal<'new' | 'edit'>('new');
  id: number | null = null;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    cnpj: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    address: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) {}

  ngAfterViewInit() {
    const params = this.route.snapshot.params;
    this.id = params['id'] ? Number(params['id']) : null;

    this.mode.set(this.id ? 'edit' : 'new');

    if (this.mode() === 'edit' && this.id) {
      this.loadCompany();
    } else {
      this.loading.set(false);
    }
  }

  loadCompany() {
    this.loading.set(true);

    const company = history.state.company;

    if (!company) {
      this.error.set("Empresa não encontrada no estado da rota.");
      this.loading.set(false);
      return;
    }

    // Preenche igual ao usuário
    this.form.patchValue({
      name: company.name,
      cnpj: company.cnpj,
      address: company.address
    });

    this.loading.set(false);
  }

  cancel() {
    this.router.navigate(['/companies']);
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.value;
    this.saving.set(true);

    const request$ = this.mode() === 'new'
      ? this.service.create(payload)
      : this.service.update(this.id!, payload);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/companies']);
      },
      error: (err) => {
        this.error.set(err.error?.error || 'Erro ao salvar empresa.');
        this.saving.set(false);
      }
    });
  }
}
