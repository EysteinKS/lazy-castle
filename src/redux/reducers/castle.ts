import { CastleState } from "../types";
import * as actions from "../actions/castle"
import { AnyAction } from "redux";
import produce from "immer";

const initialState: CastleState = {
  MAX_WORKERS: 10,
  TOTAL_WORKERS: 10,
  AVAILABLE_WORKERS: 8,
  IDLE_WORKERS: 0,
  tasks: []
}

export default (state: CastleState = initialState, {type, payload}: AnyAction) =>
  produce(state, draft => {
    switch(type){
      case actions.ADD_AVAILABLE_WORKER:
        draft.AVAILABLE_WORKERS += 1
        return draft
      case actions.REMOVE_AVAILABLE_WORKER:
        draft.AVAILABLE_WORKERS -= 1
        return draft
      case actions.EDIT_IDLE_WORKERS:
        draft.IDLE_WORKERS += payload
        return draft
      case "PULL_TASK":
        draft.tasks.shift()
        return draft
      default:
        return state
    }
  })
