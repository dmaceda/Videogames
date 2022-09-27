// require('dotenv').config();
// const { Router } = require('express');
// const axios = require('axios');
// const { API_KEY } = process.env;
// const router = Router();
// const { Videogame, Genre } = require('../db');



// //Funcion para traer videogames de la API

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



// //Ruta para traer los generos y guardarlos en DB

//  router.get('/genre', async (req, res) => {
//     try {
//      const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
//      const genre = genreApi.data?.results.map(genre => {
//          return genre.name  // genre = ["Action","Indie","Adventure","RPG",etc]//
//      });
//      genre.forEach(gen => {
//          Genre.findOrCreate({
//              where: {name: gen}
//          });
//      });
//      const allGenres = await Genre.findAll();
//      res.status(200).send(allGenres);
//     }catch(e){
//         console.log(e)
//     }
//  })
 



// //Ruta para guardar nuevo videogame en la DB

//  router.post('/videogames', async (req, res) => {
//     try{
//      const { name, description, released, rating, platforms, genres, image, link} = req.body;

//      const videogameCreated = await Videogame.create({
//          name,
//          description,
//          released,
//          rating,
//          platforms,
//          image,
//          link
//      });

//      //Conexion con la tabla de generos

//      let genreCreated = await Genre.findAll({
//          where: {name: genres}
//      });

//      videogameCreated.addGenre(genreCreated);
//      res.status(201).send('Videojuego creado con exito');
//     }catch(e){
//         console.log(e)
//     }
//  })

  
//  //Ruta para traer un videogame por id  

// router.get('/videogames/:id', async (req, res) => {
//     try {
//     const id = req.params.id;
//   if (isNaN(id)) { //si mi id no es un numero busco en la DB
//     try {
//       let videogame = await Videogame?.findByPk(id, {
//         include: [
//           {
//             model: Genre,
//             attributes: ["name"],
//             through: {
//             attributes: [],
//             },
//           },
//         ],
//       });

//       generos = videogame?.genres.map((e) => {
//         return e.name;
//       });


//       let videogameNew = {
//         name: videogame.name,
//         image: videogame.image,
//         link: videogame.link, 
//         description: videogame.description,
//         rating: videogame.rating,
//         genres: generos,
//         platforms: videogame.platforms,
//         released: videogame.released,
//       };
//       res.json(videogameNew);
//     } catch (e) {
//       res.status(404).send("Error de la Base de Datos: ", e);
//     }
//   } else {

//     //Creo detalle del videogame

//     const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);  
//     const detail =  {
//         id: apiUrl.data.id,
//         name: apiUrl.data.name,
//         image: apiUrl.data.background_image,
//         released: apiUrl.data.released,
//         rating: apiUrl.data.rating,
//         description: apiUrl.data.description.replace(/<[^>]+>/g, '').replace(/&#39;s/g, ''),
//         platforms: apiUrl.data.platforms.map(game => game.platform.name),
//         genres: apiUrl.data.genres.map(game => game.name),
//         aditionalImg: apiUrl.data.background_image_additional
//     };
//     res.status(200).json(detail)

//     }    }catch(e){
//         console.log(e)
//         }
// }
// );

//  //Creo una ruta para actualizar un videogame
  
// //     router.put('/videogames/:id', async (req, res) => {
// //         const id = req.params.id;
// //         const { name, description, released, rating, platforms, genres} = req.body;
// //         const videogame = await Videogame.findByPk(id);
// //         if (videogame) {
// //             await videogame.update({
// //                 name,
// //                 description,
// //                 released,
// //                 rating,
// //                 platforms,
// //             });
// //             await videogame.setGenres(genres);
// //             res.status(200).send('Videojuego actualizado con exito');
// //         } else {
// //             res.status(404).send('No se encontro el videojuego');
// //         }
// //     }
// //     );

// // //Ruta para eliminar un videogame
// //     router.delete('/videogames/:id', async (req, res) => {
// //         const id = req.params.id;
// //         const videogame = await Videogame.findByPk(id);
// //         if (videogame) {
// //             await videogame.destroy();
// //             res.status(200).send('Videojuego eliminado con exito');
// //         } else {
// //             res.status(404).send('No se encontro el videojuego');
// //         }
// //     } );






// module.exports = router;

require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// GET a '/videogames
router.get('/videogames', async (req, res) => {
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parseamos el objeto recibido de findAll porque es una referencia circular (?)
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //Aca dejamos el arreglo de generos plano con solo los nombres de cada genero
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(g => g.name)
    }), [])

    if (req.query.name) {
        try {
            let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`);
            if (!response.data.count) return res.status(404).send(`No se encontro ningun videojuego con el nombre "${req.query.name}"`);
            response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                ...el,
                genres: el.genres.map(g => g.name)
            }), [])
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            const results = [...filteredGamesDb, ...response.data.results.splice(0, 15)];
            return res.json(results)
        } catch (err) {
            return console.log(err)
        }
    } else {
        try {
            let pages = 0;
            let results = [...videogamesDb];
            let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            while (pages < 4) {
                pages++;
                response.data.results = response.data.results.reduce((acc, el) => acc.concat({
                    ...el,
                    genres: el.genres.map(g => g.name)
                }), [])
                results = [...results, ...response.data.results]
                response = await axios.get(response.data.next)
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
})
// GET /videogame/:idVideoGame
router.get('/videogames/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb)
    };

    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        let { name, background_image, genres, description, released: releaseDate, rating, platforms } = response.data;
        genres = genres.map(g => g.name);
        platforms = platforms.map(p => p.platform.name);
        return res.json({
            name,
            background_image,
            genres,
            description,
            releaseDate,
            rating,
            platforms
        })
    } catch (err) {
        return console.log(err)
    }
})
// GET a /genres
router.get('/genres', async (req, res) => {
    const genresDb = await Genre.findAll();
    if (genresDb.length) return res.send(`Ya existen generos en la Base de Datos, longitud: ${genresDb.length}`)

    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = response.data.results;
    genres.forEach(async g => {
        await Genre.findOrCreate({
            where: {
                name: g.name
            }
        })
    })
    res.json(genres)
})
//POST a /videogame
router.post('/videogames', async (req, res) => {
    let { name, description, releaseDate, rating, genres, platforms } = req.body;
    platforms = platforms.join(', ')
    try {
        const gameCreated = await Videogame.findOrCreate({
            where: {
                name,
                description,
                releaseDate,
                rating,
                platforms
            }
        })
        await gameCreated[0].setGenres(genres);
    } catch (err) {
        console.log(err);
    }
    res.send('Created succesfully')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;