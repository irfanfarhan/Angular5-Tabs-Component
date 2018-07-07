import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private loadingService: LoadingService, private router: Router) {}

  ngOnInit() {
    this.loadingService.toggleLoadingIndicator(false);
  }

  demoHere() {
    this.router.navigate(['/ng4-tabs', 'tabs-demo']);
  }
}
