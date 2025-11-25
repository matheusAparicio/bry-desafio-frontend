import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CompaniesService } from 'src/app/core/services/companies';

@Component({
  selector: 'companies-list',
  standalone: true,
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
  imports: [NgFor, NgIf]
})
export class List {
  companies = signal<any[]>([]);
  loading = signal(true);

  constructor(
    private service: CompaniesService,
    private router: Router
  ) {
    this.load();
  }

  load() {
    this.service.list().subscribe({
      next: (res) => {
        this.companies.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        alert('Erro ao carregar empresas.');
        this.loading.set(false);
      }
    });
  }

  edit(company: any) {
    this.router.navigate(['/companies/', company.id], {
      state: { company }
    });
  }

  remove(id: number) {
    if (!confirm('Deseja realmente excluir esta empresa?')) return;

    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => {
        alert(err.error?.error || 'Não foi possível excluir.');
      }
    });
  }
}
