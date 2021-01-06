import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import PopupHero from './PopupHero'

const Dropzone = ({ isDropDisabled, heroes, id, endGame, gameState, color }) => {
  const [selectedHero, setSelectedHero] = useState("")

  return (
    <HeroContainerStyle>
      {endGame && heroes.length === 0 && (
        <button className="btn btn-default" onClick={endGame}>
          Enda spælið
        </button>
      )}
      <div style={{ marginTop: "20px", borderBottom: `${gameState === "review" ? `10px ${color} solid` : ""}` }}>{id}</div>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
        {(provided) => {
          return (
            <HeroSubContainerStyle
              className="menu hero-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
              grouped={id !== `Óflokkad` ? true : false}
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
            className="menu-item tile tile-centered center-column"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <img
              src={`./hero_icons/${name
                .toLowerCase()
                .replaceAll(' ', '_')}.png`}
              alt={name}
              style={{ height: "125px" }}
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
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px;
`

const HeroStyle = styled.div`
  display: flex;
  img {
    height: 70px;
  }
`

const HeroSubContainerStyle = styled.div`
  flex-direction: row;
`
export default Dropzone
