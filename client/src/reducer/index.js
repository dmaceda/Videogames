//defino mis estados globales
const initialState = {
  videogames : [],
  videogamesCopy: [],
  genres : [],
  videogameDetail: {},
  filteredGames: [],
}



function rootReducer(state = initialState, action) {
 switch (action.type) {

          case "GET_GAMES":
            return {
              ...state,
              videogames: action.payload,
              videogamesCopy: action.payload,
              filteredGames: action.payload
            }

          case "GET_GENRE":
            return {
              ...state,
              genres: action.payload
          }

          case "FILTER_BY_GENRE":
                  let games = state.filteredGames;
                  let filtered = action.payload === 'All' ? games : games.filter(game => game.genres?.includes(action.payload))
                  if(filtered.length === 0){
                  return state
                  } else {   
                      return {
                      ...state,
                      videogames: filtered,
                      }
                    }
          
          
          case "FILTER_CREATED":
          const allGames = state.videogamesCopy;
          let payload = [];
          if(action.payload === 'All'){
            payload = allGames;
          }
          action.payload === "Created" ? payload = allGames.filter(game => game.createdInDb) : payload = allGames.filter(game => !game.createdInDb)         
          return {
              ...state,
              videogames: payload
          }

          case "ORDER_BY_NAME":
            let orderName = action.payload === 'asc' ? 
            state.videogames.sort((a,b) => {
              if(a.name < b.name){
                return -1;
              }
              if(a.name > b.name){
                return 1;
              }
              return 0;
            }
            ) : state.videogames.sort((a,b) => {
              if(a.name > b.name){
                return -1;
              }
              if(a.name < b.name){
                return 1;
              }
              return 0;
            }
            );
            return {
              ...state,
              videogames: orderName
            }

            case "ORDER_BY_RATING":
              let orderRating = action.payload === 'rat_d' ? 
              state.videogames.sort((a,b) => {
                return a.rating - b.rating;
              }
              ) : state.videogames.sort((a,b) => {
                return b.rating - a.rating;
              }
              );
              return {
                ...state,
                videogames: orderRating
              }

              case "GET_DETAIL":
                return {
                  ...state,
                  videogameDetail: action.payload
                }

              case "GET_NAME":
                return {
                  ...state,
                  videogames: action.payload
                }

              case "POST_GAME":
                return {
                  ...state,
                }

              case "SET_GLOBAL_STATE":
                return {
                  ...state,
                  videogameDetail: '',
                }

              case "REFRESH_STATE":
                return {
                ...state,
                videogames: [],
                }

              default:
              return state;

  }
} 

export default rootReducer;