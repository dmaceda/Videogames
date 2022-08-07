require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const router = Router();
const { Videogame, Genre } = require('../db');

console.log(API_KEY)




//Funcion para traer videogames de la API

const getApiInfo = async (i) => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
    const apiInfo = apiUrl.data.results.map(game => {

        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            genres: game.genres.map(genre => genre.name)
        };
        
    });
    

    return apiInfo;

}



// Funcion para traer los videogames de la DB

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}






// const getAllVideogames = async (i) => {
//     const apiInfo = await getApiInfo(i);
//     const dbInfo = await getDbInfo();
//     const allInfo = apiInfo.concat(dbInfo);
//     return allInfo;
// }


//Ruta para traer todos los videogames y filtrar por query

router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    let allVideogames = [];
    for(let i = 1; i <= 10; i++){
        allVideogames.push(await getApiInfo(i));
    }
    const dbInfo = await getDbInfo();
    allVideogames.push(dbInfo);

    Promise.all(allVideogames).then(allVideogames => {
        allVideogames = allVideogames.flat();
              if (name) {
                  let gameName = allVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
                  gameName.length ? 
                  res.status(200).send(gameName) :
                  res.status(404).send('No se encontro el videojuego');
              } else{
                  res.status(200).json(allVideogames);
              }
          

           });

    });



//Ruta para traer los generos y guardarlos en DB

 router.get('/genre', async (req, res) => {
     const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
     const genre = genreApi.data.results.map(genre => {
         return genre.name// genre = ["Action","Indie","Adventure","RPG",etc]//
     });
     genre.forEach(gen => {
         Genre.findOrCreate({
             where: {name: gen}
         });
     });
     const allGenres = await Genre.findAll();
     res.status(200).send(allGenres);
 })



//Ruta para guardar nuevo videogame en la DB

 router.post('/videogames', async (req, res) => {
     const { name, description, released, rating, platforms, genres} = req.body;

     const videogameCreated = await Videogame.create({
         name,
         description,
         released,
         rating,
         platforms,
     });

     //Conexion con la tabla de generos

     let genreCreated = await Genre.findAll({
         where: {name: genres}
     });

     videogameCreated.addGenre(genreCreated);
     res.status(201).send('Videojuego creado con exito');

 })

  
 //Ruta para traer un videogame por id  

router.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
  if (isNaN(id)) {
    try {
      let videogame = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      generos = videogame.genres.map((e) => {
        return e.name;
      });


      let videogameNew = {
        name: videogame.name,
        description: videogame.description,
        rating: videogame.rating,
        genres: generos,
        platforms: videogame.platforms,
        released: videogame.released,
      };
      res.json(videogameNew);
    } catch (e) {
      res.status(404).send("Error de la Base de Datos: ", e);
    }
  } else {

    //Creo detalle del videogame

    const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);  
    const detail =  {
        id: apiUrl.data.id,
        name: apiUrl.data.name,
        image: apiUrl.data.background_image,
        released: apiUrl.data.released,
        rating: apiUrl.data.rating,
        description: apiUrl.data.description.replace(/<[^>]+>/g, '').replace(/&#39;s/g, ''),
        platforms: apiUrl.data.platforms.map(game => game.platform.name),
        genres: apiUrl.data.genres.map(game => game.name),
        aditionalImg: apiUrl.data.background_image_additional
    };
    res.status(200).json(detail);
    }
}
);









module.exports = router;
