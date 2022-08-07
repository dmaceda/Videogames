import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getName, refreshState} from '../../actions';
import './Searchbar.css';
import {BsSearch} from 'react-icons/bs'


function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value);

    }

    const [loading, setLoading] = useState(false);


  
   
    function handleSubmit(e) {
      e.preventDefault()
      dispatch(refreshState());
      setLoading(true);

      if (!name) {
          alert("Videogame's name required"); 
      } else {
          dispatch(getName(name));
          setName('');    
      }
      setLoading(false);
    };






   
  return (
    <div className='searchbar-container'>
         


      <form className='searchbar' action='#'>
        <input onChange={(e) => handleChange(e)}type="text"
        placeholder='Search Videogame'
        required value={name}
         />
         <button onClick={(e) => handleSubmit(e)} type='submit'><BsSearch/></button>
         { loading ? <div className="load load--full-height"></div> : null }
      </form >
    </div>
  )
}

export default SearchBar