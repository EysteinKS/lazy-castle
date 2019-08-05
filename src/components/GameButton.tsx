import React from 'react'
import useGame, { useGameProps } from '../hooks/useGame';

interface IProps {
  game: useGameProps
}

const GameButton: React.FC<IProps> = ({ game }) => {
  const {startGame, stopGame, isLoading, isLoaded, isRunning} = game

  const buttonAction = React.useMemo(() => {
    if(!isLoaded) {
      return () => {}
    } else if(isLoaded && !isRunning){
      return () => startGame()
    } else if(isLoaded && isRunning){
      return () => stopGame()
    }
  }, [isLoaded, isRunning])

  const buttonText = React.useMemo(() => {
    if(isLoading){
      return "Loading..."
    } else if(isLoaded && !isRunning) {
      return "Start"
    } else if(isLoaded && isRunning) {
      return "Stop"
    }
  }, [isLoading, isLoaded, isRunning])

  return (
    <div>
      <button onClick={buttonAction}>
        {buttonText}
      </button>
    </div>
  )
}

export default GameButton