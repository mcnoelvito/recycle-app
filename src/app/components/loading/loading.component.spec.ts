import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingComponent } from './loading.component';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';


describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading", loadingReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should hide loading component when it is not loading', () => {
    const complied = fixture.nativeElement;

    store.dispatch(hide());
    fixture.detectChanges();

    expect(complied.querySelected(".backdrop")).toBeNull();
  });

  it('should show loading component when it is loading', () => {
    const complied = fixture.nativeElement;

    store.dispatch(show());
    fixture.detectChanges();

    expect(complied.querySelected(".backdrop")).not.toBeNull();
  });
});
