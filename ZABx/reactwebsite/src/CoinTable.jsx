import React, { useEffect, useState, useRef } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CryptoTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dummyState, setDummyState] = useState(0); // Dummy state
  const [currentPage, setCurrentPage] = useState(1);
  const cryptoDataRef = useRef([]);
  const getChangeColorAndSymbol = (change) => {
    if (change > 0) {
      return { color: 'green', symbol: '↑' };
    } else if (change < 0) {
      return { color: 'red', symbol: '↓' };
    } else {
      return { color: 'black', symbol: '-' };
    }
  };
  const itemsPerPage = 40; // Number of items per page

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      data.forEach((item) => {
        if (
          item.s.endsWith('USDT') &&
          !item.s.includes('DOWN') &&
          !item.s.includes('UP')
        ) {
          const symbol = item.s;
          const index = cryptoDataRef.current.findIndex((crypto) => crypto.s === symbol);

          if (index !== -1) {
            const prevC = cryptoDataRef.current[index].c;
            cryptoDataRef.current[index] = { ...item, prevC };
          } else {
            cryptoDataRef.current = [...cryptoDataRef.current, { ...item, prevC: item.c }];
          }
        }
      });

      setDummyState(prevState => prevState + 1); // Update dummy state to force re-render
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const displayedCryptoData = cryptoDataRef.current.filter((crypto) =>
    crypto.s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedCryptoData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(displayedCryptoData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getPriceColor = (prevC, currentC) => {
    if (prevC < currentC) {
      return 'green';
    } else if (prevC > currentC) {
      return 'red';
    } else {
      return 'black';
    }
  };

  return (
    <Wrapper>
      <div className="centered-search">
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search symbol" />
      </div>
      <div className="crypto-list">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Volume (24H)</th>
              <th>Change (24H)</th>
            </tr>
          </thead>
          <tbody>
           {currentItems.map((crypto, index) => {
  const { color: changeColor, symbol } = getChangeColorAndSymbol(crypto.P);
  const priceColor = getPriceColor(crypto.prevC, crypto.c);
  return (
    <tr key={crypto.s}>
      <td>{index + 1}</td>
      <td>
        <Link to={`/trade/BYBIT:${crypto.s}`}>{crypto.s}</Link>
      </td>
      <td style={{ color: priceColor }}>{crypto.c}</td>
      <td>{crypto.v}</td>
      <td style={{ color: changeColor }}>{crypto.P}% {symbol}</td>
    </tr>
  );
})}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>Next</button>
        )}
        </Pagination>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  
  .centered-search {
    text-align: center;
    margin-bottom: 20px;
    width: 80%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px; 
  }

  .crypto-list {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  a {
    color: #0000ee;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    background-color: #014aac;
    color:#FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
  }
`;

export default CryptoTable;
