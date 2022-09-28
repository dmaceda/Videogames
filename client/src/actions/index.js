import axios from "axios";


    //Obtener todos los videojuegos
    export function getGames() {
        return async function(dispatch) {
            try {
                    var json = await axios.get('/videogames');
                    return dispatch({
                    type: "GET_GAMES",
                    payload: json.data? json.data : null
                    });
                }catch(error){
                console.log(error);
                }
        }
    }

    //Obtener todos los generos
    export function getGenre() {
            return async function(dispatch) {
            try{
                var json = await axios.get('/genre');
                return dispatch({
                type: "GET_GENRE",
                payload: json.data ? json.data : null
                    });
                }catch(error){
                console.log(error);
                }

            }
    }

    //Agraga videojuego a la db
    export function postVideogame(videogame) {
                return async function(dispatch) {
                try{
                    var json = await axios.post('/videogames', videogame);
                    return dispatch({
                    type: "POST_GAME",
                    payload: json ? json : null
                    });
                    }catch(err){
                        console.log(err);
                    }
                }
    }

    //Reinicia el estado
    export function refreshState() {
        return {
                type: "REFRESH_STATE"
        }
    }

    //Filtra los videojuegos por genero
    export function filterByGenre(genre) {
        return {
            type: "FILTER_BY_GENRE",
            payload: genre
        }
    }

    //Filtra entre db y api
    export function filterCreated(payload){
            return {
                type: "FILTER_CREATED",
                payload: payload
            }
    }

    //Ordena por nombre
    export function orderByName(payload){
        return {
            type: "ORDER_BY_NAME",
            payload: payload
        }
    }

    //Ordena por puntuacion
    export function orderByRating(payload){
        return {
            type: "ORDER_BY_RATING",
            payload: payload
        }
    }

    //Obtiene el detalle de un videojuego
    export function getDetail(id){
        return async function(dispatch){
            try {
            var json = await axios.get('/videogames/'+id);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            });
            } catch (error) {
                console.log(error);
            }
        }
    }

    //Reinicia el estado global
    export function setGlobalEstate () {
        return {
        type: "SET_GLOBAL_STATE",
        }
    }

    //Obtiene los videojuegos por nombre
    export function getName(name){
        return async function(dispatch){
            try {
            var json = await axios.get('/videogames?name=' + name);
            return dispatch({
                type: "GET_NAME",
                payload: json.data
            });
            } catch (error) {
                alert('No se encontro el videojuego');
            }
        }   
    }



