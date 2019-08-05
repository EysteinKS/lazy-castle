import { BuildingsState } from "../types";
import { AnyAction } from "redux";
import produce from "immer";

const initialState: BuildingsState = {
  gathering: {
    lumber_mill: {
      id: "lumber_mill",
      name: "Lumber Mill",
      isUnlocked: true,
      description: "",
      ASSIGNED_WORKERS: 2,
      IDLE_WORKERS: 0,
      MAX_WORKERS: 10,
      GATHERING_TIME: 1000,
      GATHERED_PER_TASK: 1
    }
  }
}

export default (state: BuildingsState = initialState, {type, payload}: AnyAction) =>
  produce(state, draft => {
    switch(type){
      case "EDIT_ASSIGNED_WORKERS":
        draft[payload.location[0]][payload.location[1]].ASSIGNED_WORKERS = payload.amount
        return draft
      default:
        return state
    }
  })