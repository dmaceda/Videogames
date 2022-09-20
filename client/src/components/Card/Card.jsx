import React from 'react'
import './Card.css'
import defaultImage from "../../images/create.png"
import star from "../../images/star.png"
import play from "../../images/play.png"
import { Link } from 'react-router-dom';



const Card = ({id, name, image, genres, rating, link }) => {
  return (
    <div className='cards'>
      <div className='card'>
          <div className='container'>
              <div className='nombre_container'>
              <h5 className='nombre'>{name}</h5>
              <div className='rating-container'>
              <h6 className='rating' ><img src={star} alt="" width='15px'  />{rating}</h6>
              </div>
              </div>
              <Link className='link' to={'/home/' + id}>
              <img className='card-item-image' src={image || defaultImage } alt="img not found" width='100%' height='160px'/>
              </Link>
          </div>
          <div className='details'>
              <div className='genres-container'>
              {genres.map((genre, index) => {
                     return (
                       <ul  key={index}>
                         <li className='genres'>{genre.name?genre.name:genre}</li>
                       </ul>
                     );
                   })}
              </div>
          </div>
          { link ? 
          // <button className='but'><img src={play} alt="" className='play'/></button> 
          <a href={link} target='_blank' rel="noreferrer"> <img src={play} alt="" className='play'/></a>
          : null }
      </div>
    </div>
    // <div className='card-item' >
    //     <div className='rating-container'>
    //     <h6 className='rating'><img src={star} alt="" width='10px'  />{rating}</h6>
    //     </div>
    //     <div className='name-container'>
    //       <h5 className='name'>{name}</h5>
    //     </div>

    //     <img className='card-item-image' src={image || defaultImage } alt="img not found" width='90%' height='200px'/>
    //     <div className='genres-container'>
    //     {genres.map((genre, index) => {
    //                 return (
    //                   <ul  key={index}>
    //                     <li className='genres'>{genre.name?genre.name:genre}</li>
    //                   </ul>
    //                 );
    //               })}
    //             </div>

    //         </div>

      )
    }   

export default Card