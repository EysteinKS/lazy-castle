import { ThunkAction } from "redux-thunk";
import { RootState } from "../types";
import { AnyAction } from "redux";

export type IThunkAction = ThunkAction<Promise<any>, RootState, {}, AnyAction>