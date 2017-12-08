import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isShow: boolean;
  private sub: any;

  constructor(private _loadingService: LoadingService) {
    this.isShow = false;
  }

  ngOnInit() {
    this.sub = this._loadingService.loading
      .debounceTime(2000)
      .distinctUntilChanged()
      .subscribe((data: boolean) => {
        this.isShow = data;
      });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }
}
