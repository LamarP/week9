import { Cpu } from "../cpu.model";
import * as CpusActions from './cpu.actions';

export interface State {
  cpus: Cpu[]
}

const initialState: State = {
  cpus: []
}

export function cpuReducer(state = initialState, action: CpusActions.CpusActions) {
  switch (action.type) {
    case CpusActions.SET_CPUS:
      return {
        ...state,
        cpus: [...action.payload]
      }
    case CpusActions.ADD_CPU:
      return {
        ...state,
        cpus: [...state.cpus, action.payload]
      }
    case CpusActions.DELETE_CPU:
      return {
        ...state,
        cpus: state.cpus.filter((cpu, index) => index !== action.payload)
      }
    default:
      return state;
  }
}
