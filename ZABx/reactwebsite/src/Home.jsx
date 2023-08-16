import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { Button } from './styles/Button';
import NewsContainer from './CryptoNews';


const Home = () => {
  return <Wrapper>
    <div className="main-section">
    <div className='section-data'>
    <h1 className='main-heading'>Let's Make <br></br>Better Life With<br></br>New Currency</h1>
    <p className='main-paragraph'>Get real time monitoring and<br></br>help grow your currency</p>
    <Button className='btn get-btn'>
    <NavLink to="/Trade">Get Started</NavLink>
</Button>
<div className='under-hero'>
    <ul className='under-hero-section'>
        <li className='hero-format'>24 Hours</li>
        <li className='hero-format'>200+</li>
        <li className='hero-format'>1 Million</li>
        <li className='hero-format'>0.10%</li>

    </ul>

  </div>
  <div className='more-under'>
    <ul className='more-under-section'>
        <li className='more-format'>Trading on ZABx Exchange</li>
        <li className='more-format'>Cryptocurrencies</li>
        <li className='more-format'>Registered Users</li>
        <li className='more-format'>Lowest Transaction Fee</li>

    </ul>

  </div>
  </div>
  <div className='section-hero-image'>
        <picture>
        <img src='./images/hero.png' alt='hero' className='hero-img'/>
        </picture>
  </div>
  </div>
<div>
  <NewsContainer></NewsContainer>
</div>
 </Wrapper>
}
const Wrapper = styled.section`

.main-section{
height: 70rem;
background-color:#192a56;
display: flex;
}
.section-data {
    margin-left: 30rem;
    margin-top: 10rem;
}
.main-heading {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 4rem;
    color:#ecf0f1;

  }
  .main-paragraph {
    font-weight: 500;
    font-size: 2rem;
    color:#ecf0f1;
  }
  .btn {
    max-width: 17rem;
    background-color:#00a8ff;
    border-radius: 50px 20px;
    margin-top: 5rem;
    margin-left:4rem;

  }
  .section-hero-image {
    display: flex;
    margin-top: 4rem;
    margin-left:80rem;
    position: absolute;
  }

  picture {
    text-align: center;
  }

  .hero-img {
    max-width: 80%;
  }
  .under-hero-section{
    margin-top: 8rem;
    margin-left:3rem;
    display: flex;
    gap: 18rem;
  }
  .hero-format{
    display: inline-block;
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: 600;
    text-transform: uppercase;
    color:#ecf0f1;
  }
  .more-under-section{
    margin-top: 2rem;
    margin-left:3rem;
    display: flex;
    gap: 11.5rem;
  }
  .more-format{
    display: inline-block;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 400;
    color:#ecf0f1;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 7.2rem;
    }
}
`;
export default Home
