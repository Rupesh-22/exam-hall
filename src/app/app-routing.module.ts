import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.authUrl,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.examUrl,
    loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)
  },
  {
    path: AppRoutes.authUrl,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
