import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import iso from '../../images/isologo.png'
import logo from '../../images/gamesland.png'
import home from '../../images/home.png'
import about from '../../images/about.png'
import plus from '../../images/plus.png'



const Navbar = () => {
  return (
    <nav id='navbar'>
      
      <Link to='/home' className='iso-container'>
      <img className='isologo' src={iso} alt="isologo" />
      <img className='log2' src={logo} alt="logo" />
      </Link>

      <Link className='link' to= '/home'><a href="!#" id='nav-links'><img src={home} alt="" className='i__' /><p className='p'>Home</p></a></Link>
      <Link className='link' to='/about'><a href="!#" id='nav-links'><img src={about} alt="" className='i__'/><p className='p'>About</p></a></Link>
      <Link className='link' to="/create"><a href="!#" className="btn-clasic_"> <img src={plus} alt="" className='plus'/><p className='p'>Create</p></a></Link>

    </nav>
  )
}

export default Navbar

