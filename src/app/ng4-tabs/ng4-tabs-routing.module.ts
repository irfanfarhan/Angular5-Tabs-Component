import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TabsDemoComponent } from './components/tabs-demo/tabs-demo.component';

const ng4TabsRoutes: Routes = [
  {
    path: 'ng4-tabs',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'tabs-demo',
        component: NavigationComponent,
        children: [
          {
            path: '',
            component: TabsDemoComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ng4TabsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Ng4TabsRoutingModule { }
