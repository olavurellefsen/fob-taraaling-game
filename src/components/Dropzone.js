import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import PopupHero from './PopupHero'

const Dropzone = ({ isDropDisabled, heroes, id, identifier, gameState }) => {
  const [selectedHero, setSelectedHero] = useState("")
  return (
    <HeroContainerStyle grouped={identifier}>
      <Droppable  droppableId={id} isDropDisabled={isDropDisabled}>
        {(provided) => {
          return (
            <HeroSubContainerStyle
              className={`menu hero-list`}
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={{ flexDirection: identifier }}
              identifier={identifier}
            >
              {heroes.map(({ name, color, rank, description, comics }, index) => (
                <Hero key={name} name={name} description={description} index={index}
                  color={color} gameState={gameState} rank={rank}
                  selectedHero={selectedHero}
                  setSelectedHero={setSelectedHero}
                  comics={comics}
                />
              ))}
              {provided.placeholder}
            </HeroSubContainerStyle>
          )
        }}
      </Droppable>
    </HeroContainerStyle>
  )
}
const Hero = ({ name, color, rank, description, comics, index, gameState,
  selectedHero, setSelectedHero }) => {
  return (
    <Draggable key={index} draggableId={name} index={index}>
      {(provided) => {
        return (
          <HeroStyle
            review={gameState === "review"}
            color={color}
            className="menu-item tile"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img
              src={`./hero_icons/${name
                .toLowerCase()
                .replaceAll(' ', '_')}.png`}
              alt={name}
              style={{ height: "95px" }}
            />
            {gameState === "review" &&
              <PopupHero name={name} rank={rank} description={description}
                selectedHero={selectedHero} setSelectedHero={setSelectedHero}
              />}
          </HeroStyle>
        )
      }}
    </Draggable>
  )
}

const HeroContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
  flex-direction: ${props => props.identifier};
  width: ${props => props.identifier === "row" ? "100%" : ""};

`

const HeroStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin: 10px;
  img {
    height: 70px;
  }
`

const HeroSubContainerStyle = styled.div`
  display: flex;
  flex-direction: ${props => props.identifier};
  ${props => props.identifier === "row" ? `
    max-width: 505px;
    width: 100%;
    flex-wrap: wrap;
  `: `
    height: 900px;
  `}
`
export default Dropzone
