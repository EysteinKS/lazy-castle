import React from 'react';
import Mock from './components/Mock';
import Game from './components/Game';

const showMock = false

const App: React.FC = () => {
  return showMock 
  ? <Mock/>
  : <Game/>
}

export default App;
