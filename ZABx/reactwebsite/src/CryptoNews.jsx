import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CryptoNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
        );
        setNewsData(response.data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(newsData.length / pageSize);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.split(' ').slice(0, maxLength).join(' ');
    return truncatedText + '...';
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNewsData = newsData.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <h4>Crypto News</h4>
      <div className="container">
        {currentNewsData.map((news) => (
          <div key={news.id} className="news-block">
            <div className="news-box">
              <div className="image-container">
                <img src={news.imageurl} alt={news.title} className="news-image" />
              </div>
              <h3>{news.title}</h3>
              <p>{truncateText(news.body, 25)}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      <Pagination>
        {currentPage > 1 && (
          <button onClick={handleClickPrevious}>
            &lt; Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={handleClickNext}>
            Next &gt;
          </button>
        )}
      </Pagination>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  h4{
  text-transform: uppercase;
  font-weight: 600;
  font-size: 4rem;
  color:Black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 1rem;
  }

  .news-block {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px;
  }

  .news-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px; 
  }

  .news-image {
    max-width: 100%;
    max-height: 100%;
  }

  a {
    font-size: 1.8rem;
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

export default CryptoNews;