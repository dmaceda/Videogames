import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import joystick from './joystick.jpg'
import Navbar from '../Navbar/Navbar';
import logo from '../../images/gamesland.png'

const LandingPage = () => {
  return (
   
    <div className='landing-container'>
            <Navbar/>
            <img id='background'src={joystick} alt="" />
            <div className='landing'>
                <h1 className='animated-text'>Welcome to</h1>
            <div className='animated-container'>
            <img className='logo' src={logo} alt="logo" />
            </div>      
            <div className='text'>
                <h5>¡Haz una recorrida por los mejores videojuegos de todos los tiempos, desde los clasicos hasta los mas actuales!<br/> 
                      Podras explorar más de 2000 videojuegos, filtrarlos y buscar tu juego favorito.<br/> 
                    ¡Ademas podras crear tu propio videojuego!
                </h5>
            </div>
            <div className='create'>
                <Link to='/home'>
                <a href="!#" className="btn-neon">
                Let's Go!
                </a>
                </Link>
                <Link to='/about'>
                <a href="!#" className="neon-alt">
                Read More
                </a>
                </Link>
            </div>
            </div>
            <div className='pie'>
                <p>© 2022 GamesLand by Diego Maceda.</p>
            </div>
    </div>
  )
}

export default LandingPage

