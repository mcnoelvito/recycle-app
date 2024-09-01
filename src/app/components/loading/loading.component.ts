import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingState } from 'src/store/loading/LoadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  querySelected(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  loadingState$!: Observable<LoadingState>;

  constructor(private store: Store<{loading: LoadingState}>) { }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
