import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { URLSearchParams } from '@angular/http';
import { LoadingService } from './shared/services/loading.service';
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.toggleLoadingIndicator(true);
    this.router.events.subscribe(() => window.scrollTo(0, 0));
  }
}
