import React from 'react';
import {Link} from 'react-router-dom';
import './About.css';
import {MdOutlineCreateNewFolder, MdFilterList, MdOutlineCategory, MdSearch} from 'react-icons/md';
import {MdArrowBack} from 'react-icons/md';
import {BiJoystick} from 'react-icons/bi';
import {AiFillHtml5} from 'react-icons/ai';
import {DiCss3, DiPostgresql} from 'react-icons/di';
import {TbBrandJavascript} from 'react-icons/tb';
import {DiReact} from 'react-icons/di';
import {SiRedux, SiSequelize} from 'react-icons/si';
import Navbar from '../Navbar/Navbar';
import logo from '../../images/gamesland.png'

const About = () => {
  return (
   
      <div className='about-container'>
        <Navbar/>
        <div className='cont-back'>
        <Link to="/home">
            <button className='btn-clasic'><MdArrowBack/></button>
         </Link> 
        </div>
        
    <div className='about'>
        <div className='about-container'>
        <img className='logo_about' src={logo} alt="logo" />
        </div>      
        <div className='text_about'>

        <h4>Esta aplicación fue desarrollada por <strong>Diego Maceda</strong>, para el proyecto individual del Bootcamp <strong>Henry</strong>.<br/> 
        Obtiene información de la API <strong>rawg</strong> y trabaja con una base de datos donde almacena los videojuegos creados y categorías.<br/> 
        Se trabajo desde el front para el diseño de la interfaz, paginado, ordenamientos y filtrados, <br /> y desde el back para la lógica de la aplicación.<br/> 
        Las tecnologías utilizadas en este proyecto fueron:
        </h4>
        </div>
        <div>
        <ul className='list'>
        <div className='list-items'>
          <AiFillHtml5 className='i'/>
          <li>HTML</li>
          </div>
          <div className='list-items'>
          <DiCss3 className='i'/>
          <li>CSS</li>
          </div> 
          <div className='list-items'>
          <TbBrandJavascript className='i'/>
          <li>JavasCript</li>
          </div> 
          <div className='list-items'>
          <DiReact className='i'/>
          <li>React</li>
          </div> 
          <div className='list-items'>
          <SiRedux className='i'/>
          <li>Redux</li>
          </div> 
          <div className='list-items'>
          <DiPostgresql className='i'/>
          <li>Postgres</li>
          </div> 
          <div className='list-items'>
          <SiSequelize className='i'/>
          <li>Sequelize</li>
          </div> 
        </ul>
        </div> 

    </div>
         <div>
        <ul className='lista'>
        <div className='lista-items'>
          <BiJoystick className='iconos'/>
          <li>+2000 Videogames</li>
          </div>
          <div className='lista-items'>
          <MdOutlineCategory className='iconos'/>
          <li>+50 Categorias</li>
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
          <MdOutlineCreateNewFolder className='iconos'/>
          <li>Crear tu Videogame</li>
          </div>

        </ul>
        </div> 
      </div>
  )
}

export default About

