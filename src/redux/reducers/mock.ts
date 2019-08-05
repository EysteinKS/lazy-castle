import { Building } from "../types";

interface IBuildingSettings {
  id: string
  name: string
  isUnlocked?: boolean
  description?: string
  ASSIGNED_WORKERS?: number
  IDLE_WORKERS?: number
  MAX_WORKERS?: number
  GATHERING_TIME?: number
  GATHERED_PER_TASK?: number
}

interface IMergedSettings {
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

const defaultSettings = {
  id: "",
  name: "",
  isUnlocked: false,
  description: "",
  ASSIGNED_WORKERS: 0,
  IDLE_WORKERS: 0,
  MAX_WORKERS: 10,
  GATHERING_TIME: 5000,
  GATHERED_PER_TASK: 1
}

const createBuilding = (settings: IBuildingSettings): Building => {
  let mergedSettings = {defaultSettings, ...settings} as IMergedSettings
  return {
    id: mergedSettings.id,
    name: mergedSettings.name,
    isUnlocked: mergedSettings.isUnlocked,
    description: mergedSettings.description,
    ASSIGNED_WORKERS: mergedSettings.ASSIGNED_WORKERS,
    IDLE_WORKERS: mergedSettings.IDLE_WORKERS,
    MAX_WORKERS: mergedSettings.MAX_WORKERS,
    GATHERING_TIME: mergedSettings.GATHERING_TIME,
    GATHERED_PER_TASK: mergedSettings.GATHERED_PER_TASK
  }
}