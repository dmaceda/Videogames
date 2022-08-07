import React from 'react'
import './Card.css'
import {GrStar} from 'react-icons/gr'
import defaultImage from "../../images/create.png"


const Card = ({name, image, genres, rating, }) => {
  return (
    <div className='card-item' >
        <div className='rating-container'>
        <h6 className='rating'><GrStar/>{rating}</h6>
        </div>
        <div className='name-container'>
          <h5 className='name'>{name}</h5>
        </div>

        <img className='card-item-image' src={image || defaultImage } alt="img not found" width='90%' height='300px'/>
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