import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {postVideogame, getGenre, getGames} from '../../actions'
import './GameCreate.css'
import back from "../../images/back.png"
import ok from "../../images/ok.png"
import err from "../../images/err.png"
import defaultImage_back from "../../images/back.jpg"


const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "Web"
  ]
  
  
  
  const GameCreate = () => {
      const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const [error, setError] = useState({});
    const [messageOk, setMessageOk] = useState('');
    const [messageErr, setMessageErr] = useState('');
    const [active, setActive] = useState(false)
    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        link: '',
        rating: '',
        platforms: [],
        genres: []
    })
    
    
    useEffect(() => {
        dispatch(getGames());
      },[dispatch]);
    
    
      useEffect(() => {
        dispatch(getGenre());
    
      },[dispatch]);

      

    function validate(input) {
        let errorValidate = {};
        if (!input.name) {
            errorValidate.name = "* Name required";
        }
        if (!input.description) {
            errorValidate.description = "* Description required";
        }
        if (input.platforms.length === 0) {
            errorValidate.platforms = "* Platform(s) selection required";
         }
         if (input.genres.length === 0) {
            errorValidate.genres = "* Genre(s) selection required";
         }

        return errorValidate;
    }
    



    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value 

            })
        )
    }

    const handleSelectPlatform = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

  


    const handleSelectGenre = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(error)

        if (Object.keys(error).length === 0 && input.name && input.description && input.genres && input.platforms && input.released) {
          
                dispatch(postVideogame(input))
                setMessageOk('   Congrats! Game created successfully!')
                setInput({
                    name: '',
                    image: '',
                    description: '',
                    link: '',
                    released: '0000-00-00',
                    rating: '',
                    platforms: [],
                    genres: []
                })
        


        
    }else{
        setMessageErr('   Please complete the *required fields')
        return;
    }
    setMessageErr('')
    }

  console.log(input)


  return (
    <div className='create-container'>
        <img className='background'  src={defaultImage_back} alt="img not found" />
        <div className='back_'>
        <Link to='/home'>
           <button className='btn-clasic'><img src={back} alt="" className='ic' width='15px'/></button>
        </Link>
        </div>
        <div className='message-ok'>
        {messageOk ? (<p className=""><img src={ok} alt="" className='ok_' width='30px'/>{messageOk}</p>) : null}
        </div>
        <div className='message-error'>
        {messageErr ? (<p className=""><img src={err} alt="" className='err_' width='30px'/>{messageErr}</p>) : null}
        </div>
        <form className='formulario' onSubmit={(e) => handleSubmit(e)}>
                <div className='title_container'>
                <h2 className='animated-text_' >Create a Videogame</h2>
                </div>
                <label ><p>Name</p></label>
                <input 
                autoComplete='off'
                className='controls'
                placeholder='Enter a video game name'
                type="text"
                name="name" 
                value={input.name}
                onChange={(e) => handleChange(e)} />
                {error.name ? (<p className="errors">{error.name}</p>) : null}


                <label ><p>Released</p></label>
                <input 
                autoComplete='off'
                className='controls'
                type="date"
                name="released"
                value={input.released} 
                onChange={(e) =>handleChange(e)}/>




                <label ><p>Image</p></label>
                <input 
                autoComplete='off'
                className='controls'
                placeholder='Enter a image url'
                type="text"
                name="image"
                value={input.image} 
                onChange={(e) =>handleChange(e)}/>


                
        
          
                <label ><p>Rating</p></label>
                <input 
                autoComplete='off'
                placeholder='Enter a video game rating'
                className='controls'
                type="number"
                name="rating"
                value={input.rating}
                onChange={(e) =>handleChange(e)} />
                {input.rating <0 || input.rating >5 ? (<p className="errors">Enter a value in the range 0-5</p>) : null}

                <label ><p>Game Link</p></label>
                <input 
                autoComplete='off'
                className='controls'
                placeholder='Enter a game url'
                type="text"
                name="link"
                value={input.link} 
                onChange={(e) =>handleChange(e)}/>
  
          
                <label ><p>Platform(s)</p></label>
                <select 
                placeholder='Select a platform'
                className='controls'
                onChange={(e) => handleSelectPlatform(e)}>
                     <option>Select Plataform</option>
                    {platforms.map(platform => (
                    <option 
                    key={platform} 
                    value={platform}
                    >{platform}
                    </option>
                    ))}
                   
                </select>
                <ul><li><p className='charged'>{input.platforms.map(plat=> plat + '  ')}</p></li></ul>
                {error.platforms ? (<p className="errors">{error.platforms}</p>) : null}
         
            
                <label ><p>Genre(s)</p></label>
                <select
                className='controls' 
                onChange={(e)=> handleSelectGenre(e)}>
                    <option>Select Genre</option>
                    {genres.map(genre => (
                    <option 
                    key={genre.id} 
                    value={genre.name}
                    >{genre.name}
                    </option>
                    ))}
                    </select>
                <ul><li><p className='charged'>{input.genres.map(genre=> genre + ' ')}</p></li></ul>
                {error.genres ? (<p className="errors">{error.genres}</p>) : null}
            
                
                <label ><p>Description</p></label>
                <textarea
                autoComplete='off'
                className='controls'
                placeholder='Enter a video game description'
                type="text"
                name="description"
                value={input.description}
                onChange={(e) =>handleChange(e)}/>
                {error.description ? (<p className="errors">{error.description}</p>) : null}
            
                <div className='butt_'>
                <button 
                className='btn-neon'
                type="submit"
                >Create
                </button>
                </div>
        </form>

    </div>
  )
}

export default GameCreate