import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () =>
        import('./features/auth/login/login')
          .then(m => m.Login),
    },
    {
      path: 'register',
      loadComponent: () =>
        import('./features/auth/register/register')
          .then(m => m.Register),
    },

    {
      path: '',
      canActivate: [authGuard],
      children: [
        // EMPLOYEES
        {
          path: 'employees',
          loadComponent: () =>
            import('./features/employees/list/list')
              .then(m => m.List),
        },
        {
          path: 'employees/new',
          loadComponent: () =>
            import('./features/employees/form/form')
              .then(m => m.Form),
        },
        {
          path: 'employees/:id',
          loadComponent: () =>
            import('./features/employees/form/form')
              .then(m => m.Form),
        },
  
        // CUSTOMERS
        {
          path: 'customers',
          loadComponent: () =>
            import('./features/customers/list/list')
              .then(m => m.List),
        },
        {
          path: 'customers/new',
          loadComponent: () =>
            import('./features/customers/form/form')
              .then(m => m.Form),
        },
        {
          path: 'customers/:id',
          loadComponent: () =>
            import('./features/customers/form/form')
              .then(m => m.Form),
        },
  
        // COMPANIES
        {
          path: 'companies',
          loadComponent: () =>
            import('./features/companies/list/list')
              .then(m => m.List),
        },
        {
          path: 'companies/new',
          loadComponent: () =>
            import('./features/companies/form/form')
              .then(m => m.Form),
        },
        {
          path: 'companies/:id',
          loadComponent: () =>
            import('./features/companies/form/form')
              .then(m => m.Form),
        },
      ],
    },
  
    { path: '**', redirectTo: 'login' },
  ];