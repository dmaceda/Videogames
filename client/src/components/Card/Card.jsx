import React from 'react'
import './Card.css'
import defaultImage from "../../images/create.png"
import star from "../../images/star.png"


const Card = ({name, image, genres, rating, }) => {
  return (
    <div className='card-item' >
        <div className='rating-container'>
        <h6 className='rating'><img src={star} alt="" width='10px'  />{rating}</h6>
        </div>
        <div className='name-container'>
          <h5 className='name'>{name}</h5>
        </div>

        <img className='card-item-image' src={image || defaultImage } alt="img not found" width='90%' height='200px'/>
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

      )
    }   

export default Card