import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenre, filterByGenre, filterCreated, orderByName, orderByRating, refreshState } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import {FiRefreshCw} from 'react-icons/fi';
import {MdSort, MdOutlineManageSearch} from 'react-icons/md';
import Footer from '../Footer/Footer';


const Home = () => {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.videogames); //traigo todo los games del estado y la guardo, evito mapstatetoprops
  const allGenres = useSelector(state => state.genres); //traigo todo los genres del estado y la guardo, evito mapstatetoprops
 //Defino estados locales
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [orden, setOrden] = useState('');
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0
  const currentGames = allGames?.slice(indexOfFirstGame, indexOfLastGame); //currentGames es un array con los 15 primeros games

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }






  useEffect(() => {
    dispatch(getGames());
  },[dispatch]);

 

 


  useEffect(() => {
    dispatch(getGenre());

  },[dispatch]);








  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleFilterByGenre(e) {
    dispatch(refreshState());
    dispatch(filterByGenre(e.target.value));
  }


  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
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
    <div >
      <Navbar />
       <div className='home-container'>
        <div className='create-search'>
          <button className='refresh'onClick={e => handleClick(e)}><FiRefreshCw/></button>
          <SearchBar />
        </div>

    
     <div className='filter-container'>

      <div className='filter'> 
        <div>
          <div className='icon'>
          <p><MdOutlineManageSearch/>Filter by</p>
          </div>
           <select className='filter-item' onChange={e => handleFilterByGenre(e)}>
          <option value="All">Category</option>
            <option value="All">All</option>
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
            <option value="All">All</option>
            <option value="Exist">Exist</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <div>
          <div className='icon'>
          <p><MdSort/>Sort by</p>
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
              <Link className='link' to={'/home/' + game.id}>
              <Card className='card-container' name={game.name} image={game.image} genres={game.genres} rating={game.rating} key={game.id} description={game.description}/>
              </Link>
            </div>
          )
         }) 
        }
         </div>
         <div className='paginado-container'>
         <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames?.length}
          paginado={paginado}
          />
         </div>
         <Footer/>

</div>
  );
}

export default Home