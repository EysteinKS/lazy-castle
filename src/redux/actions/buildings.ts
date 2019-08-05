export const EDIT_ASSIGNED_WORKERS = 'EDIT_ASSIGNED_WORKERS'
export const editAssignedWorkers = (location: string[], amount: number) => ({
  type: EDIT_ASSIGNED_WORKERS,
  payload: {location, amount}
})
