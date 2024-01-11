import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as CpusActions from './cpu.actions';
import { Cpu } from '../cpu.model';
import { AppState } from 'src/app/app.reducer';

@Injectable()
export class CpuEffects {
  constructor(private $actions: Actions, private http: HttpClient, private store: Store<AppState>) {
  }

  fetchCpus = createEffect(() => this.$actions.pipe(
    ofType(CpusActions.FETCH_CPUS),
    switchMap(() => this.http.get<Cpu[]>('http://localhost:4000/cpu')),
    map((cpus: Cpu[]) => cpus.map(cpu => ({ ...cpu, parts: cpu.parts ? cpu.parts : [] }))),
    map((cpus) => new CpusActions.SetCpus(cpus))
  ));

  storeCpus = createEffect(() => this.$actions.pipe(
    ofType(CpusActions.STORE_CPUS),
    withLatestFrom(this.store.select('cpus')),
    switchMap(([actionData, cpusState]) => this.http.put('http://localhost:4000/cpu', cpusState.cpus))
  ), { dispatch: false })
}
