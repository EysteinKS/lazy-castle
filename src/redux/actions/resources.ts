import { IThunkAction } from "./types";

export const GATHER = 'GATHER'
export const gather = (location: string[], amount: number) => ({
  type: GATHER,
  payload: {
    location,
    amount
  }
})

const getResourceLocation = (resource: string) => {
  switch(resource){
    case("logs"):
      return {
        resource: ["plants", "logs"],
        building: ["gathering", "lumber_mill"]
    }
    default:
      return {
        resource: [""],
        building: [""]
      }
  }
}

export const gatherResource = (resource: string): IThunkAction =>
  async (dispatch, getState) => {
    let state = getState()
    let location = getResourceLocation(resource)

    let buildingData = state.buildings[location.building[0]][location.building[1]]
    let amount = buildingData.GATHERED_PER_TASK * buildingData.ASSIGNED_WORKERS
    let resourceData = state.resources[location.resource[0]][location.resource[1]]

    //Resource is at max stockpile
    if(amount + resourceData.amount > resourceData.MAX_STOCKPILE){
      let newAmount = resourceData.MAX_STOCKPILE - resourceData.amount
      dispatch(gather(location.resource, newAmount))
    } else {
      dispatch(gather(location.resource, amount))
    }
  }

export const SELL_ALL = 'SELL_ALL'
export const sellAll = (location: string[]) => ({
  type: SELL_ALL,
  payload: { location }
})


export const sellAllOfResource = (resource: string): IThunkAction =>
  async (dispatch) => {
    let location = getResourceLocation(resource)
    dispatch(sellAll(location.resource))
  }