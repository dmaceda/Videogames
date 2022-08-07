import React from 'react'
import './Paginado.css'


const Paginado = ({gamesPerPage, allGames, paginado}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
    return (
        <nav>

            <ul className="pagination">
                <li className="page-item_">◄</li>
                {pageNumbers?.map(number => (
                    <li key={number} className="page-item">
                        <a className="page-link" onClick={() => paginado(number)}>
                            {number}
                        </a>
                    </li>
                ))}
                <li className="page-item_">►</li>
            </ul>

        </nav>
    );
}

export default Paginado