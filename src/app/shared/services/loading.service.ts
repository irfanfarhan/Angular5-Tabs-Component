import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
//import 'rxjs/add/operator/share';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class LoadingService {
  loading: Observable<boolean>;
  private _observer: Observer<boolean>;

  constructor() {
    this.loading = new Observable<boolean>(
      observer => (this._observer = observer)
    ).share();
  }

  toggleLoadingIndicator(value: boolean) {
    if (this._observer) {
      this._observer.next(value);
    }
  }
}
