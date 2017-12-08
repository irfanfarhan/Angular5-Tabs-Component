import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRedirectComponent } from './shared/components/login-redirect/login-redirect.component';

const appRoutes: Routes = [
  { path: '', component: LoginRedirectComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
