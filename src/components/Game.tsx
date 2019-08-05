import React from 'react'
import useGame, { useGameProps } from '../hooks/useGame';
import GameButton from './GameButton';
import ResourceHeader from './ResourceHeader';
import Header from './Header';
import styled from 'styled-components';
import ThroneRoom from './ThroneRoom';

export default () => {
  const game = useGame()

  if(!game.isRunning){
    return <Loading game={game}/>
  }

  return (
    <div>
      <Header game={game}/>
      <ResourceHeader/>
      <ThroneRoom/>
    </div>
  )
}

interface LoadingProps {
  game: useGameProps
}

const LoadingText = styled.p`
  text-align: center
`

const Loading: React.FC<LoadingProps> = ({ game }) => {
  return(
    <div>
      <Header game={game}/>
      {game.isLoading && <LoadingText>Loading...</LoadingText>}
      {game.isLoaded && <LoadingText>Loaded!</LoadingText>}
    </div>
  )
}