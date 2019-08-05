import React from 'react'
import { Resource, RootState, Building } from '../redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { IntervalTask } from '../engine/task';
import { gatherResource, sellAllOfResource } from '../redux/actions/resources';
import { addWorkerToBuilding, removeWorkerFromBuilding } from '../redux/thunks/workers';
import { editIdleWorkers } from '../redux/actions/castle';

export default () => {
  const lumberMill = useLumberMill()

  return (
    <div style={{
      height: "100vh",
      maxHeight: "100vh"
    }}>
      <div style={{
        margin: "10vh 20vw",
        backgroundColor: "#CCC"
      }}>
        <Workers/>
        <Resources/>
        <BuildingView building={lumberMill}/>
      </div>
    </div>
  )
}

interface BuildingViewProps {
  building: Building
}

const BuildingView: React.FC<BuildingViewProps> = ({ building }) => {
  const dispatch = useDispatch()

  return(
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      width: "100%"
    }}>
      <h3 style={{gridColumn: "1/3"}}>{building.name}</h3>
      <p style={{gridColumn: "1/3"}}>Workers</p>
      <p>Assigned: {building.ASSIGNED_WORKERS}</p>
      <p>Max: {building.MAX_WORKERS}</p>
      <button onClick={() => dispatch(addWorkerToBuilding(building.id))}>Add</button>
      <button onClick={() => dispatch(removeWorkerFromBuilding(building.id))}>Remove</button>
    </div>
  )
}

const useLumberMill = () => {
  const dispatch = useDispatch()
  const lumberMill = useSelector((state: RootState) => state.buildings.gathering.lumber_mill)
  const { ASSIGNED_WORKERS, GATHERING_TIME } = lumberMill
  const logs = useSelector((state: RootState) => state.resources.plants.logs)

  const [currentTask, setTask] = React.useState({} as IntervalTask)
  const [taskTime, setTaskTime] = React.useState(GATHERING_TIME)

  const newInterval = () => new IntervalTask(() => {
    dispatch(gatherResource("logs"))
  }, GATHERING_TIME)

  //Initialize task
  React.useEffect(() => {
    let task = newInterval()
    task.start()
    setTask(task)
  }, [])

  //Create new task if gathering time changes
  React.useEffect(() => {
    if(taskTime !== GATHERING_TIME){
      console.log("Gathering time changed")
      currentTask.stop()
      let task = newInterval()
      task.start()
      setTaskTime(GATHERING_TIME)
      setTask(task)
    }
  }, [GATHERING_TIME])

  //Edit idle worker amount 
  const [isIdle, setIdle] = React.useState(false)
  React.useEffect(() => {
    if(logs.amount === logs.MAX_STOCKPILE && !isIdle){
      console.log("Stockpile is full, setting idle workers")
      setIdle(true)
      dispatch(editIdleWorkers(lumberMill.ASSIGNED_WORKERS))
    } else if(logs.amount < logs.MAX_STOCKPILE && isIdle){
      setIdle(false)
      dispatch(editIdleWorkers(-lumberMill.ASSIGNED_WORKERS))
    }
  }, [logs.amount, logs.MAX_STOCKPILE, isIdle])

  //Starting or stopping task based on assigned workers
  React.useEffect(() => {
    if(taskTime > 0 && ASSIGNED_WORKERS === 0){
      console.log("No workers assigned, stopping task")
      currentTask.stop()
      setTaskTime(0)
    } else if (taskTime === 0 && ASSIGNED_WORKERS > 0){
      console.log("Workers assigned, starting task")
      let task = newInterval()
      task.start()
      setTaskTime(GATHERING_TIME)
      setTask(task)
    }
  }, [ASSIGNED_WORKERS])

  return lumberMill
}

const Workers = () => {
  const castle = useSelector((state: RootState) => state.castle)

  return(
    <div style={{
      display: "grid",
      width: "100%",
      gridTemplateColumns: "1fr 1fr 1fr 1fr"
    }}>
      <h3 style={{gridColumn: "1/5"}}>Workers</h3>
      <p>Available: {castle.AVAILABLE_WORKERS}</p>
      <p>Idle: {castle.IDLE_WORKERS}</p>
      <p>Total: {castle.TOTAL_WORKERS}</p>
      <p>Max: {castle.MAX_WORKERS}</p>
      <p></p>
    </div>
  )
}

const Resources = () => {
  const resources = useSelector((state: RootState) => state.resources)

  return(
    <div style={{
      display: "grid",
      width: "100%",
      gridTemplateColumns: "1fr 1fr"
    }}>
      <ResourceView resource={resources.plants.logs}/>
    </div>
  )
}

interface ResourceProps {
  resource: Resource
}

const ResourceView: React.FC<ResourceProps> = ({resource}) => {
  const dispatch = useDispatch()

  return(
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr"
    }}>
      <p>{resource.name}</p>
      <p>{resource.amount}/{resource.MAX_STOCKPILE}</p>
      <button onClick={() => dispatch(sellAllOfResource(resource.id))}>Sell all</button>
    </div>
  )
}