import { IThunkAction } from "../actions/types";
import { addAvailableWorker, removeAvailableWorker } from "../actions/castle";
import { editAssignedWorkers } from "../actions/buildings";

const getBuildingLocation = (building: string) => {
  switch(building){
    case "lumber_mill":
      return ["gathering", "lumber_mill"]
    default:
      return [""]
  }
}

export const removeWorkerFromBuilding = (building: string): IThunkAction =>
  async (dispatch, getState) => {
    let state = getState()
    let location = getBuildingLocation(building)
    let buildingData = state.buildings[location[0]][location[1]]

    let newWorkerCount = buildingData.ASSIGNED_WORKERS - 1
    if(newWorkerCount >= 0){
      dispatch(editAssignedWorkers(location, newWorkerCount))
      dispatch(addAvailableWorker())
    }
  }

export const addWorkerToBuilding = (building: string): IThunkAction =>
  async (dispatch, getState) => {
    let state = getState()
    let location = getBuildingLocation(building)
    let buildingData = state.buildings[location[0]][location[1]]

    let newWorkerCount = buildingData.ASSIGNED_WORKERS + 1
    if(state.castle.AVAILABLE_WORKERS > 0 && buildingData.ASSIGNED_WORKERS < buildingData.MAX_WORKERS){
      dispatch(removeAvailableWorker())
      dispatch(editAssignedWorkers(location, newWorkerCount))
    }
  }