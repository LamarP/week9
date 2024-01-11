import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';

import * as AuthActions from '../authentication/store/authentication.actions';
import * as CpuActions from '../cpus/store/cpu.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) { }
  isAuthenticated: boolean = false;
  private userSubscription!: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('authentication')
      .pipe(
        map((state) => state.user)
      )
      .subscribe(user => {
        this.isAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  storeCpus() {
    this.store.dispatch(new CpuActions.StoreCpus());
  }

  getCpus() {
    this.store.dispatch(new CpuActions.FetchCpus());
  }

}
