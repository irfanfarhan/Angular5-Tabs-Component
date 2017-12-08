import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LibraryModule } from '../lib/lib.module';
import { LoadingService } from '../shared/services/loading.service';
import { Ng4TabsRoutingModule } from './ng4-tabs-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TabsDemoComponent } from './components/tabs-demo/tabs-demo.component';

@NgModule({
  imports: [CommonModule, SharedModule, LibraryModule, Ng4TabsRoutingModule],
  declarations: [
    NavigationComponent,
    DashboardComponent,
    TabsDemoComponent
  ],
  entryComponents: [],
  providers: [LoadingService]
})
export class Ng4TabsModule {}
