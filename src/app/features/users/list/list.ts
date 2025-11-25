import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { UserServiceAdapter } from 'src/app/core/services/user-adapter';
import { CustomersService } from 'src/app/core/services/customers';
import { EmployeesService } from 'src/app/core/services/employees';
import { Auth } from 'src/app/core/services/auth';

@Component({
  standalone: true,
  selector: 'user-list',
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
  imports: [NgIf, NgFor]
})
export class List {

  users = signal<any[]>([]);
  isEmployee = signal(false);
  selfId = signal<number | null>(null);

  service!: UserServiceAdapter;
  mode = signal<'customers' | 'employees'>('customers');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customers: CustomersService,
    private employees: EmployeesService,
    private auth: Auth
  ) {
    this.init();
  }

  init() {
    const url = this.router.url;

    if (url.startsWith('/customers')) {
      this.mode.set('customers');
      this.service = this.customers;
    } else {
      this.mode.set('employees');
      this.service = this.employees;
    }

    const user = this.auth.user();
    if (user) {
      this.isEmployee.set(user.type === 'employee');
      this.selfId.set(user.id);
    }

    this.load();
  }

  load() {
    this.service.list().subscribe({
      next: (res: any) => {
        this.users.set(res.data);
      },
      error: () => alert("Erro ao carregar usuários")
    });
  }
  edit(user: any) {
    this.router.navigate([`/${this.mode()}/${user.id}`], {
      state: { user }
    });
  }

  remove(id: number) {
    if (!confirm("Deseja excluir este usuário?")) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err: any) =>
        alert(err.error?.error || "Erro ao excluir")
    });
  }

  fabAction() {
    const user = this.auth.user();
    if (!user) return;

    if (this.isEmployee()) {
      this.router.navigate([`/${this.mode()}/new`]);
    } else {
      this.router.navigate([`/${this.mode()}/${user.id}`]);
    }
  }
}
