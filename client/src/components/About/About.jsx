import React from 'react';
import {Link} from 'react-router-dom';
import './About.css';
import Navbar from '../Navbar/Navbar';
import logo from '../../images/gamesland.png'
import back from "../../images/back.png"
import platform from "../../images/platform.png"
import genre from "../../images/genre.png"
import search from "../../images/search.png"
import filter from "../../images/filter.png"
import crea from "../../images/crea.png"
import html from "../../images/html.png"
import css from "../../images/css.png"
import js from "../../images/js.png"
import react from "../../images/react.png"
import redux from "../../images/redux.png"
import seq from "../../images/seq.png"
import post from "../../images/post.png"


const About = () => {
  return (
   
      <div className='about-container'>
        <Navbar/>
        <div className='cont-back'>
        <Link to="/home">
            <button className='btn-clasic'><img src={back} alt="" className='ic' width='15px'/></button>
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
        <img src={html} alt="" className='icox' width='25px'/>
          <li>HTML</li>
          </div>
          <div className='list-items'>
          <img src={css} alt="" className='icox' width='25px'/>
          <li>CSS</li>
          </div> 
          <div className='list-items'>
          <img src={js} alt="" className='icox' width='25px'/>
          <li>JavasCript</li>
          </div> 
          <div className='list-items'>
          <img src={react} alt="" className='icox' width='25px'/>
          <li>React</li>
          </div> 
          <div className='list-items'>
          <img src={redux} alt="" className='icox' width='25px'/>
          <li>Redux</li>
          </div> 
          <div className='list-items'>
          <img src={post} alt="" className='icox' width='25px'/>
          <li>Postgres</li>
          </div> 
          <div className='list-items'>
          <img src={seq} alt="" className='icox' width='25px'/>
          <li>Sequelize</li>
          </div> 
        </ul>
        </div> 

    </div>
         <div>
        <ul className='lista'>
        <div className='lista-items'>
         <img src={platform} alt="" className='ic' width='25px'/>
          <li>+2000 Videogames</li>
          </div>
          <div className='lista-items'>
          <img src={genre} alt="" className='ic' width='25px'/>
          <li>+50 Categorias</li>
          </div>
          <div className='lista-items'>
          <img src={search} alt="" className='ic' width='25px'/>
          <li>Busca tu Videogame</li>
          </div>
          <div className='lista-items'>
          <img src={filter} alt="" className='ic' width='25px'/>
          <li>Filtra y ordena</li>
          </div>
          <div className='lista-items'>
          <img src={crea} alt="" className='ic' width='25px'/>
          <li>Crear tu Videogame</li>
          </div>

        </ul>
        </div> 
      </div>
  )
}

export default About

