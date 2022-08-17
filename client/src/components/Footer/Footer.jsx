import React from 'react'
import './Footer.css'
import LOGO from '../../images/gamesland_blk.png'
import linkedin from "../../images/linkedin.png"
import github from "../../images/github.png"
import twitter from "../../images/twitter.png"

const Footer = () => {
  return (
    <footer>
      <img className='log3' src={LOGO} alt='logo' />
      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/dmaceda/" target='_blank' rel="noreferrer"> <img src={linkedin} alt="" width='20px'className='ic'/></a>
        <a href="https://github.com/dmaceda" target='_blank' rel="noreferrer"> <img src={github} alt="" width='20px' className='ic'/></a>
        <a href="https://twitter.com/?lang=es" target='_blank' rel="noreferrer"> <img src={twitter} alt="" width='20px' className='ic'/></a>
      </div>
      <div className="footer__copyright">
        <small>&copy; 2022 GamesLand Created by Diego Maceda. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer