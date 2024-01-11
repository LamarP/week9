import { Action } from "@ngrx/store";

import { Cpu } from "../cpu.model";

export const SET_CPUS = 'Set Cpus';
export const FETCH_CPUS = 'Fetch Cpus';
export const ADD_CPU = 'Add Cpu';
export const UPDATE_CPU = 'Update Cpu';
export const DELETE_CPU = 'Delete Cpus';
export const STORE_CPUS = 'Fetch Cpus';

export class SetCpus implements Action {
  readonly type = SET_CPUS;

  constructor(public payload: Cpu[]) {}
}

export class FetchCpus implements Action {
  readonly type = FETCH_CPUS;
}

export class AddCpu implements Action {
  readonly type = ADD_CPU;
  constructor(public payload: Cpu) {}
}

export class UpdateCpu implements Action {
  readonly type = UPDATE_CPU;
  constructor(public payload: { index: number; newCpu: Cpu }) {}
}

export class DeleteCpu implements Action {
  readonly type = DELETE_CPU;
  constructor(public payload: number) {}
}

export class StoreCpus implements Action {
  readonly type = STORE_CPUS;
}

export type CpusActions = SetCpus | FetchCpus | AddCpu | UpdateCpu | DeleteCpu | StoreCpus;
