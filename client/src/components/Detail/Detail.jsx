import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDetail, setGlobalEstate} from '../../actions/index'
import { useEffect } from 'react'
import './Detail.css'
import defaultImage_back from "../../images/back.jpg"
import defaultImage from "../../images/create.png"
import star from "../../images/star.png"
import back from "../../images/back.png"
import date from "../../images/date.png"
import genre from "../../images/genre.png"
import platform from "../../images/platform.png"


const Detail = (props) => {
    const dispatch = useDispatch()
    const myVideogame = useSelector((state) => state.videogameDetail)
    


useEffect(() => {
  dispatch(setGlobalEstate())
  dispatch(getDetail(props.match.params.id))   
    
}
, [dispatch, props.match.params.id])





  return (
    <div>

         {
        myVideogame ? 
        <div className='detail-container'>
              <img className='background'  src={myVideogame.aditionalImg || defaultImage_back} alt="img not found" />

          <div id='backbutton'>
         <Link to="/home">
            <button className='btn-clasic'><img src={back} alt="" className='ic' width='15px'/></button>
         </Link> 
          </div> 

            <div className='general-container'>

            <img id='imgb'src={myVideogame.image || defaultImage} alt="img not found" width='20%' height='200px'/>
            
            <div className='contenido'>
            <h2 id='tit'>{myVideogame.name}</h2>
            <div className='img-container'>
            <h5>{myVideogame.description}</h5>
            </div>
            <div className='released'>
            <ul>
              <li><img src={date} alt="" className='ic___' width='15px'/> <a>{myVideogame.released} </a> </li>
              <li><img src={star} alt="" className='ic___' width='15px'/> <a>{myVideogame.rating}</a> </li>
            </ul>
            </div>
             <div className='generos-container'>
             <img src={genre} alt="" className='ic___' width='15px'/>
           {myVideogame.genres?.map((genre, index) => {
                    return (
                      <ul  key={index}>
                        <li className='genero' >{genre}</li>
                      </ul>
                    );
                  })}
            </div> 
             <div className='generos-container'>
             <img src={platform} alt="" className='ic___' width='15px'/> 
             <div className='platform'>
            {myVideogame.platforms?.map((platform, index) => {
                    return (
                      <ul  key={index}>
                        <li className='genero' >{platform}</li>
                      </ul>
                    );
                  })}
             </div>
            </div>  
        </div>
            </div>
            </div>
        :
        
             <div className="loading loading--full-height"></div>
        
       } 
    </div>
  )
}

export default Detail