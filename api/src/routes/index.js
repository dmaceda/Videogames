require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const router = Router();
const { Videogame, Genre } = require('../db');



//Funcion para traer videogames de la API

// const getApiInfo = async (i) => {
//     const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
//     const apiInfo = apiUrl.data?.results.map(game => {
//         return {
//             id: game.id,
//             name: game.name,
//             image: game.background_image,
//             rating: game.rating,
//             genres: game.genres.map(genre => genre.name)
//         };  
//     });
//     return apiInfo;
// }

// // Funcion para traer los videogames de la DB

// const getDbInfo = async () => {
//     return await Videogame.findAll({
//         include: {
//             model: Genre,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     });
// }

// //Ruta para traer todos los videogames y filtrar por query

// router.get('/videogames', async (req, res) => {
//     try {
//     const name = req.query.name;
//     let allVideogames = [];
//     for(let i = 1; i <= 5; i++){
//         allVideogames.push(await getApiInfo(i));
//     }
//     const dbInfo = await getDbInfo();
//     allVideogames.push(dbInfo);

//     await Promise.all(allVideogames).then(allVideogames => {
//         allVideogames = allVideogames.flat();
//               if (name) {
//                   let gameName = allVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
//                   gameName.length ? 
//                   res.status(200).send(gameName) :
//                   res.status(404).send('No se encontro el videojuego');
//               } else{
//                   res.status(200).json(allVideogames);
//               }
//            })    }catch(e){
//             console.log(e)
//             }
//     });

//------------------------------------------------------
const getApiInfo = async () => {
    let promises = [];
    let allGames = [];
    try {
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let i = 0; i < 5; i++) {
        let apiVideo = await axios.get(url).then((response) => {
          return response;
        });
        promises = promises.concat(apiVideo);
        url = apiVideo.data.next;
      }
  
      await Promise.all(promises).then((response) => {
        for (let i = 0; i < promises.length; i++) {
          allGames = allGames.concat(
            response[i].data.results.map((el) => {
              return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                rating: el.rating,
                genres: el.genres.map((e) => {
                  return { name: e.name };
                }),
                
                
              };
            })
          );
        }
      });
  
      return allGames;
    } catch (error) {
      console.log(error);
    }
  };
  //-------------------------------------------------------
  const getDbInfo = async () => {
    return await Videogame.findAll({
      include: {
        //trae el modelo genre mediante el atributo name
        model: Genre,
        attributes: ["name"],
        througth: {
          //mediante los atributos, traeme el name. sino traeria solo name porque es el unico, pero
          //si hubiera mas atributos podria traer mas
          attributes: [],
        },
      },
    });
  };
  //-------------------------------------------------------
  
  const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    //console.log('api:::::',apiInfo)
    //console.log('db::.::',dbInfo)
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  
  
  };
  //-------------------------------------------------------
  router.get("/videogames", async (req, res) => {
    const name = req.query.name;
    const infoTotal = await getAllVideogames();
    if (name) { 
  
   let videoNames =  infoTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase()) 
      );
      videoNames.length
        ? res.status(200).send(videoNames)
        : res.status(400).send("no existe el videogame");
      
    }  else {
      res.status(200).send(infoTotal);
    } 
  
      
  
    }
     
  );
  //-------------------------------------------------------



//Ruta para traer los generos y guardarlos en DB

 router.get('/genre', async (req, res) => {
    try {
     const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
     const genre = genreApi.data?.results.map(genre => {
         return genre.name  // genre = ["Action","Indie","Adventure","RPG",etc]//
     });
     genre.forEach(gen => {
         Genre.findOrCreate({
             where: {name: gen}
         });
     });
     const allGenres = await Genre.findAll();
     res.status(200).send(allGenres);
    }catch(e){
        console.log(e)
    }
 })
 



//Ruta para guardar nuevo videogame en la DB

 router.post('/videogames', async (req, res) => {
    try{
     const { name, description, released, rating, platforms, genres, image, link} = req.body;

     const videogameCreated = await Videogame.create({
         name,
         description,
         released,
         rating,
         platforms,
         image,
         link
     });

     //Conexion con la tabla de generos

     let genreCreated = await Genre.findAll({
         where: {name: genres}
     });

     videogameCreated.addGenre(genreCreated);
     res.status(201).send('Videojuego creado con exito');
    }catch(e){
        console.log(e)
    }
 })

  
 //Ruta para traer un videogame por id  

router.get('/videogames/:id', async (req, res) => {
    try {
    const id = req.params.id;
  if (isNaN(id)) { //si mi id no es un numero busco en la DB
    try {
      let videogame = await Videogame?.findByPk(id, {
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

      generos = videogame?.genres.map((e) => {
        return e.name;
      });


      let videogameNew = {
        name: videogame.name,
        image: videogame.image,
        link: videogame.link, 
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
    res.status(200).json(detail)

    }    }catch(e){
        console.log(e)
        }
}
);

 //Creo una ruta para actualizar un videogame
  
//     router.put('/videogames/:id', async (req, res) => {
//         const id = req.params.id;
//         const { name, description, released, rating, platforms, genres} = req.body;
//         const videogame = await Videogame.findByPk(id);
//         if (videogame) {
//             await videogame.update({
//                 name,
//                 description,
//                 released,
//                 rating,
//                 platforms,
//             });
//             await videogame.setGenres(genres);
//             res.status(200).send('Videojuego actualizado con exito');
//         } else {
//             res.status(404).send('No se encontro el videojuego');
//         }
//     }
//     );

// //Ruta para eliminar un videogame
//     router.delete('/videogames/:id', async (req, res) => {
//         const id = req.params.id;
//         const videogame = await Videogame.findByPk(id);
//         if (videogame) {
//             await videogame.destroy();
//             res.status(200).send('Videojuego eliminado con exito');
//         } else {
//             res.status(404).send('No se encontro el videojuego');
//         }
//     } );






module.exports = router;
