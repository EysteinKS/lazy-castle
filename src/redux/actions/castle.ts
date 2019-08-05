export const ADD_AVAILABLE_WORKER = 'ADD_AVAILABLE_WORKER'
export const addAvailableWorker = () => ({
  type: ADD_AVAILABLE_WORKER,
})

export const REMOVE_AVAILABLE_WORKER = 'REMOVE_AVAILABLE_WORKER'
export const removeAvailableWorker = () => ({
  type: REMOVE_AVAILABLE_WORKER
})

export const EDIT_IDLE_WORKERS = 'EDIT_IDLE_WORKERS'
export const editIdleWorkers = (amount: number) => ({
  type: EDIT_IDLE_WORKERS,
  payload: amount
})

export const PULL_TASK = 'PULL_TASK'
export const pullTask = () => ({
  type: PULL_TASK
})
