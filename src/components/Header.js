import React from 'react';
// import LoginLogout from './LoginLogout'
import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, endGame, isUngroupedEmpty }) => (
  <header className="navbar">
    {(gameState === GAME_STATE.PLAYING || gameState === GAME_STATE.REVIEW) && (
      <>
        <section className="navbar-center text-error">{getSeconds(timeLeft)} sekundir eftir. </section>
        <section className="navbar-center text-success large">Drag kassarnar í rætta bólkin</section>
        <section className="navbar-center">
          {/* <LoginLogout /> */}
          {isUngroupedEmpty ?  <button className="btn btn-default" onClick={endGame}>
            {"Enda spælið"}
          </button> : <div></div>}
        </section>
      </>
    )}
  </header>
);

export default Header;
