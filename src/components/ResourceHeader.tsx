import React from 'react'
import styled from 'styled-components';

const StyledResourceHeader = styled.div`
  width: 100%;
  height: 5vh;
  background-color: #ccc;
  text-align: center
`

//Add settings menu to change highlighted resources

const ResourceHeader = () => {
  return (
    <StyledResourceHeader>
      Resources
    </StyledResourceHeader>
  )
}

export default ResourceHeader