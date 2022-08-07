import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import iso from '../../images/isologo.png'
import logo from '../../images/gamesland.png'




import { useState } from 'react'

const Navbar = () => {
const [activeNav,setActiveNav] = useState('#')
  return (
    <nav id='navbar'>
      <div className='iso-container'>
      <img className='isologo' src={iso} alt="isologo" />
      <img className='log2' src={logo} alt="logo" />
      </div>
      <a id='nav-links' href='/home' onClick={()=> setActiveNav('home')} className={activeNav ==='home' ? 'active' : ''}>Home</a>
      <Link className='link' to='/about'><a href="!#" id='nav-links'>About</a></Link>
      <Link className='link' to="/videogames"><a href="!#" className="btn-clasic"> Create</a></Link>

    </nav>
  )
}

export default Navbar

