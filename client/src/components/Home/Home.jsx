import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenre, filterByGenre, filterCreated, orderByName, orderByRating, refreshState } from '../../actions';
import { Link } from 'react-router-dom';
import './Home.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import refresh from '../../images/refresh.png';
import filter from '../../images/filter.png';
import sort from '../../images/sort.png';



const Home = () => {
  const dispatch = useDispatch();// creo una instancia de dispatch para usarlo en el componente
  const allGames = useSelector(state => state.videogames); //traigo todo los games del estado y la guardo, evito mapstatetoprops
  const allGenres = useSelector(state => state.genres); //traigo todo los genres del estado y la guardo, evito mapstatetoprops
  //Defino estados locales
  const [currentPage, setCurrentPage] = useState(1);  // defino un estado con la pagina actual y lo seteo en 1 (pagina 1)
  const [gamesPerPage, setGamesPerPage] = useState(15); // defino un estado con el numero de games por pagina y lo seteo en 15 (15 games por pagina)
  const [orden, setOrden] = useState('');
  const [activeLink, setActiveLink] = useState(null);
  const indexOfLastGame = currentPage * gamesPerPage; // calculo el indice del ultimo game de la pagina actual 15 * 1 = 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // calculo el indice del primer game de la pagina actual 15 * 1 = 15 - 15 = 0
  const currentGames = allGames?.slice(indexOfFirstGame, indexOfLastGame); //traigo mi estado con todos los games y con el metodo slice separo mi array con 15 games

  //seteo el estado con el numero de pagina actual
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveLink(pageNumber);
  }


  useEffect(() => {
    dispatch(getGames());
  },[dispatch]);


  useEffect(() => {
    dispatch(getGenre());
  },[dispatch]);



  function handleClick(e) {
    e.preventDefault();
    dispatch(refreshState());
    dispatch(getGames());
    setCurrentPage(1);
  }

  function handleFilterByGenre(e) {
    dispatch(refreshState());
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }


  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }
  
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  
  function handleOrderByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }


  return (
    <div  className='home'>
      <Navbar />
       <div className='home-container'>
        <div className='create-search'>
          <button className='refresh'onClick={e => handleClick(e)}> <img className='ic' src={refresh} alt="" width="20px"/> </button>
          <SearchBar />
        </div>
     <div className='filter-container'>

      <div className='filter'> 
        <div>
          <div className='icon'>
          <p><img src={filter} alt="" className='ic' width="12px"/> Filter by</p>
          </div>
           <select className='filter-item' onChange={e => handleFilterByGenre(e)}>
          <option value="All">Category</option>
              {
              allGenres?.map(genre => (
                <option  
                key={genre.id} 
                value={genre.name}
                >{genre.name}</option>
              ))
            }  
          </select> 

          <select className='filter-item'  onChange={e=>handleFilterCreated(e)}>
            <option value="All">Type</option>
            <option value="Exist">Exist</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <div>
          <div className='icon'>
          <p><img src={sort} alt="" className='ic' width="12px"/>Sort by</p>
            </div>
          <select className='filter-item' onChange={e=> handleOrderByName(e)}>
            <option value="asc">AZ</option>
            <option value="desc">ZA</option>
          </select>
          <select className='filter-item' onChange={e => handleOrderByRating(e)}>
            <option value="rat_a">Rating +</option>
            <option value="rat_d">Rating -</option>
          </select> 
        
          </div>
          </div>
        </div>
        </div>
        <div className="cards-container">

         {  allGames.length === 0 ? 
         
         <div className="load load--full-height"></div> 
         
         :
         
          currentGames?.map((game) => {
          return (
            <div key={game.id} className='cards-items'>
              
              <Card className='card-container' id={game.id}name={game.name} image={game.image} genres={game.genres} rating={game.rating} key={game.id} description={game.description} link={game.link? game.link : null}/>
             
            </div>
          )
         })}
         </div>

         { allGames.length !== 0 ? 
         <div className='paginado-container'>
         <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames?.length}
          paginado={paginado}
          currentPage={currentPage}
          activeLink={activeLink}
          />
         </div> : null}



         <Footer/>

    </div>
  );}

export default Home