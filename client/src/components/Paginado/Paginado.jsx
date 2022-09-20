import React, { useEffect }from 'react'
import './Paginado.css'



const Paginado = ({gamesPerPage, allGames, paginado, currentPage, activeLink}) => {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [paginado])

  const pageNumbers = []; //creo un array vacio para guardar los numeros de las paginas
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) { //recorro el array de games y lo divido por el numero de games por pagina
    pageNumbers.push(i); //agrego cada numero a mi array
  }
  //renderizo una lista de numeros de paginas, cuando hago click sobre el numero de pagina seteo el estado con el numero de pagina actual
    return (
        <nav> 
            <ul className="pagination">
                <a className="page-item_" onClick={ currentPage >1 ? () => paginado(currentPage - 1) : null}>◄</a>
                {pageNumbers?.map(number => (
                    <li key={number} id={number} className={`${activeLink === number ? 'class1' : 'page-item'}`}>
                        <a  onClick={() => paginado(number)}> 
                            {number}
                        </a>
                    </li>
                ))}
                <a className="page-item_" onClick={currentPage < pageNumbers.length ? () => paginado(currentPage + 1) : null}>►</a>
            </ul>

        </nav>
    );
}

export default Paginado