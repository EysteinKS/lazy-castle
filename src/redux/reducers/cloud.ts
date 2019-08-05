import { AnyAction } from "redux"
import { CloudState } from "../types";
import produce from "immer"

const initialState: CloudState = {
  isLoading: false,
  isLoaded: false,
  loadingError: null,
  isSaving: false,
  isSaved: true,
  savingError: null
}

export default (state: CloudState = initialState, {type, payload}: AnyAction) => 
  produce(state, draft => {
    switch(type){
      default:
        return state
    }
  })