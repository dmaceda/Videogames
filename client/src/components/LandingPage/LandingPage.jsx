import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import joystick from './joystick.jpg'
// import {MdOutlineCreateNewFolder, MdFilterList, MdFavoriteBorder, MdSearch} from 'react-icons/md';
// import {BiJoystick} from 'react-icons/bi';
import Navbar from '../Navbar/Navbar';
import logo from '../../images/gamesland.png'

const LandingPage = () => {
  return (
   
      <div className='landing-container'>
        <Navbar/>
        <div>
        <img id='background'src={joystick} alt="" />
        </div>

    <div className='landing'>
        <h1 className='animated-text'>Welcome to</h1>
        <div className='animated-container'>
        <img className='logo' src={logo} alt="logo" />
        </div>      
        <div className='text'>
        <h5>¡Haz una recorrida por los mejores videojuegos de todos los tiempos, desde los clasicos hasta los mas actuales!<br/> 
           Podras explorar más de 2000 videojuegos, filtrarlos y buscar tu juego favorito.<br/> 
           ¡Ademas podras crear tu propio videojuego!</h5>
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
        {/* <div>
        <ul className='lista'>
        <div className='lista-items'>
          <BiJoystick className='iconos'/>
          <li>+2000 Videogames</li>
          </div>
          <div className='lista-items'>
          <MdSearch className='iconos'/>
          <li>Busca tu Videogame</li>
          </div>
          <div className='lista-items'>
          <MdFilterList className='iconos'/>
          <li>Filtra y ordena</li>
          </div>
          <div className='lista-items'>
          <MdFavoriteBorder className='iconos'/>
          <li>Agrega a Favoritos</li>
          </div>
          <div className='lista-items'>
          <MdOutlineCreateNewFolder className='iconos'/>
          <li>Crear tu Videogame</li>
          </div>

        </ul>
        </div> */}
        <div className='pie'>
        <p>© 2022 GamesLand by Diego Maceda.</p>
        </div>
      </div>
  )
}

export default LandingPage

