import { ResourcesState } from "../types";
import { AnyAction } from "redux";
import produce from "immer";

const initialState: ResourcesState = {
  money: {
    copper: {
      id: "copper",
      name: "Copper",
      amount: 0,
      isUnlocked: true,
      MAX_STOCKPILE: 999
    }
  },
  plants: {
    logs: {
      id: "logs",
      name: "Logs",
      amount: 0,
      isUnlocked: true,
      MAX_STOCKPILE: 100
    }
  }
}

export default (state: ResourcesState = initialState, {type, payload}: AnyAction) =>
  produce(state, draft => {
    switch(type){
      case "GATHER":
        draft[payload.location[0]][payload.location[1]].amount += payload.amount
        return draft
      case "SELL_ALL":
        draft[payload.location[0]][payload.location[1]].amount = 0
      default:
        return draft
    }
  })