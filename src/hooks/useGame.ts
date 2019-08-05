import { TaskManager, Tasks, TimeoutTask } from "../engine/task";
import React from "react";
import { RootState } from "../redux/types";
import { useSelector, useDispatch } from "react-redux";
import { pullTask } from "../redux/actions/castle";

const taskManager = TaskManager.getInstance()

const TICKS_PER_SECOND = 20
const GAME_TICK = 1000 / TICKS_PER_SECOND

export type useGameProps = {
  startGame: Function, 
  stopGame: Function, 
  isLoading: boolean, 
  isLoaded: boolean, 
  isRunning: boolean
}

export default function useGame(): useGameProps {
  const [isLoading, setLoading] = React.useState(false)
  const [isLoaded, setLoaded] = React.useState(false)
  const [isRunning, setRunning] = React.useState(false)

  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.castle.tasks)

  const addTask = (task: Tasks) => taskManager.push(task)
  const runTasks = () => taskManager.run()
  const stopTaskManager = () => taskManager.stop()

  const queueTasks = async () => {
    if(tasks.length > 0){
      let queuedTasks = [...tasks]
      await queuedTasks.forEach(task => {
        addTask(task)
        dispatch(pullTask())
      })
    }
  }

  const loadGame = () => {
    addTask(new TimeoutTask(() => console.log("Task finished after 1 second"), 1000))
    addTask(new TimeoutTask(() => console.log("Task finished after 5 seconds"), 5000))
  }

  const [time, setTime] = React.useState(Date.now())
  const [ticks, setTicks] = React.useState(0)

  React.useEffect(() => {
    if(Date.now() - time >= 1000){
      console.log("One second elapsed with ticks: ", ticks)
      setTime(Date.now())
      setTicks(0)
    }
  }, [ticks])

  const loopRef = React.useRef(0)
  const gameLoop = () => {
    queueTasks()
    runTasks()
    setTicks(t => t += 1)
  }

  const startGame = (): void => {
    console.log("Starting game")
    console.log("loopRef.current: ", loopRef.current)
    console.log("isRunning: ", isRunning)
    if(loopRef.current === 0 && !isRunning){
      loopRef.current = window.setInterval(gameLoop, GAME_TICK)
      setRunning(true)
    }
  }

  const stopGame = () => {
    clearInterval(loopRef.current)
    loopRef.current = 0
    stopTaskManager()
    setRunning(false)
  }

  const initializeGame = async () => {
    await setLoading(true)

    await console.log("Initializing game")
    await loadGame()

    await setLoading(false)
    await setLoaded(true)
  }

  //Initialize game
  React.useEffect(() => {
    initializeGame()
  }, [])

  return { startGame, stopGame, isLoading, isLoaded, isRunning }
}