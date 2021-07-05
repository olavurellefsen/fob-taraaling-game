import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import PopupHero from './PopupHero'
import { media } from "../utils/mediaTemplate"

const Dropzone = ({ isDropDisabled, heroes, id, identifier, gameState, color }) => {
  const [selectedHero, setSelectedHero] = useState("")
  return (
    <HeroContainerStyle grouped={identifier} style={{ marginTop: "20px", borderTop: `${gameState === "review" ? `10px ${color} solid` : ""}` }}>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled} style={{ borderTop: `${gameState === "review" ? `10px ${color} solid` : ""}` }}>
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
const Hero = ({ name, color, rank, description, index, gameState,
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
  margin: auto;
  flex-direction: ${props => props.identifier};
  width: ${props => props.identifier === "row" ? "100%" : ""};
  /* min-height: ${props => props.identifier === "row" ? "" : "300px"}; */
  /* max-height: ${props => props.identifier === "row" ? "300px" : ""}; */
  ${media.phone1`
    max-height: 0;
  `}
`

const HeroStyle = styled.div`
  height: 100px;
  margin: 0 auto;
  img {
    height: 70px;
  }
  ${({ review, color }) =>
    review && color &&
    `
    border-bottom: 5px solid ${color};
    color: white;

  `}
`

const HeroSubContainerStyle = styled.div`
  display: flex;
  flex-direction: ${props => props.identifier};
  align-items: center;
  max-width: 232px;
  width: 100%;
  flex-wrap: wrap;
  ${props => props.identifier === "row" ? `
  `: `
    height: 900px;
  `}
`
export default Dropzone
