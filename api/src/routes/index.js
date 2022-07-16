const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

const { Videogame, Genero } = require('../db');
const url = 'https://api.rawg.io/api/games?key=6fbb56db8b8f4aac963cf91bba72005d'



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.rawg.io/api/games?key=6fbb56db8b8f4aac963cf91bba72005d');
    const apiInfo = apiUrl.data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(game => game.platform.name),
        };
    });
    return apiInfo;

}
const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });

}
const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    let allVideogames = await getAllVideogames();
    if (name) {
        let gameName = allVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length ? 
        res.status(200).send(gameName) :
        res.status(404).send('No se encontro el videojuego');
    } else{
        res.status(200).send(allVideogames);
    }
}
);

router.get('/genre', async (req, res) => {
    const genreApi = await axios.get('https://api.rawg.io/api/genres?key=6fbb56db8b8f4aac963cf91bba72005d');
    const genre = genreApi.data.results.map(genre => {
        return genre.name  // genre = ["Action","Indie","Adventure","RPG",etc]//
    });
    genre.forEach(gen => {
        Genero.findOrCreate({
            where: {name: gen}
        });
    });
    const allGenres = await Genero.findAll();
    res.status(200).send(allGenres);
})

router.post('/videogames', async (req, res) => {
    const { name, description, released, rating, platforms, createdInDb, genre} = req.body;
    const videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        createdInDb
    });
    const generoCreated = await Genero.findAll({
        where: {name: genre}
    });

    videogameCreated.addGeneros(generoCreated);

    res.status(201).send('Videojuego creado con exito');

})

router.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
    let allVideogames = await getAllVideogames();
    if(id){
        let gameId = await allVideogames.filter(game => game.id === id);
        gameId.length ?
        res.status(200).json(gameId) :
        res.status(404).send('No se encontro el videojuego');
    }
})


module.exports = router;
