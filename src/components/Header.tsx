import React from 'react'
import styled from "styled-components"
import GameButton from './GameButton';
import { useGameProps } from '../hooks/useGame';

const StyledHeader = styled.header`
  width: 100%;
  height: 5vh;
  background-color: #bbb;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
`

const HeaderTitle = styled.h1`
  margin: 0
`

interface HeaderProps {
  game: useGameProps
}

const Header: React.FC<HeaderProps> = ({ game }) => {
  return (
    <StyledHeader>
      <br/>
      <HeaderTitle>Header</HeaderTitle>
      <GameButton game={game}/>
    </StyledHeader>
  )
}

export default Header