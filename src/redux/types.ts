import { Tasks } from "../engine/task";

export interface PlayerState {
  uid: string
}

export interface CastleState {
  MAX_WORKERS: number
  TOTAL_WORKERS: number
  AVAILABLE_WORKERS: number
  IDLE_WORKERS: number
  tasks: Tasks[]
}

export interface Resource {
  id: string
  name: string
  amount: number
  isUnlocked: boolean
  MAX_STOCKPILE: number
}

export interface ResourcesState {
  plants: {
    logs: Resource
  }
  [key: string]: {[key: string]: Resource}
}

export interface BuildingsState {
  gathering: {
    lumber_mill: Building
  }
  [key: string]: {
    [key: string]: Building
  }
}

export interface Building {
  id: string
  name: string
  isUnlocked: boolean
  description: string
  ASSIGNED_WORKERS: number
  IDLE_WORKERS: number
  MAX_WORKERS: number
  GATHERING_TIME: number
  GATHERED_PER_TASK: number
}

export interface CloudState {
  isLoading: boolean
  isLoaded: boolean
  loadingError: string | null
  isSaving: boolean
  isSaved: boolean
  savingError: string | null
}

export interface RootState {
  player: PlayerState
  resources: ResourcesState
  buildings: BuildingsState
  cloud: CloudState
  castle: CastleState
}