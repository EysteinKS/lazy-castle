import { AnyAction } from "redux"
import { PlayerState } from "../types";
import produce from "immer"

const initialState: PlayerState = {
  uid: ""
}

export default (state: PlayerState = initialState, {type, payload}: AnyAction) => 
  produce(state, draft => {
    switch(type){
      default:
        return state
    }
  })