import buildings from "./buildings"
import castle from "./castle"
import cloud from "./cloud"
import player from "./player"
import resources from "./resources"

import { Reducer, combineReducers } from "redux";

const reducers: {[key: string]: Reducer} = {
  buildings,
  castle,
  cloud,
  player,
  resources
}

export default combineReducers(reducers)