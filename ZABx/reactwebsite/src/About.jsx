import React from 'react'
import styled from 'styled-components';

const About = () => {
  return <Wrapper>
    <div className='ab-section'>
        <h2 className='ab-main'>Your Trusted Crypto Exchange</h2>
    <div className='first-image'>
    <picture>
        <img src='./images/pe.jpg' alt='pe' className='pe-img'/>
        </picture> 
  </div>
  <p1 className='first-para'>Allows you to restrict account and addresses<br></br>that can access your account.</p1>
  <div className='second-image'>
    <picture>
        <img src='./images/pf.png' alt='pf' className='pf-img'/>
        </picture> 
  </div>
  <p2 className='second-para'>Your transaction data is secured only you<br></br>have access to your personal information.</p2>
  <div className='third-image'>
    <picture>
        <img src='./images/pg.jpg' alt='pg' className='pg-img'/>
        </picture>
        </div> 
        <p3 className='third-para'>We have implemented fraud detection<br></br>to keep your wallet safe.</p3>
        <div className='fourth-image'>
    <picture>
        <img src='./images/ph.png' alt='ph' className='ph-img'/>
        </picture>
     </div>
     <p4 className='fourth-para'>Always upfront no unfair rates<br></br>no hidden fee.</p4>
        <div className='fifth-image'>
    <picture>
        <img src='./images/pi.jpg' alt='pi' className='pi-img'/>
        </picture> 
        </div>
        <p5 className='fifth-para'>We provide fingerprint and face ID for<br></br>quick and easy access to your account.</p5>
    </div>
    <div className='abc-section'>
    <div className='roadmap-image'>
    <picture>
        <img src='./images/Roadmap.png' alt='Roadmap' className='rm-img'/>
        </picture> 
        </div>
    </div>
  </Wrapper>

}
const Wrapper = styled.section`
.ab-section{
height: 70rem;
background:linear-gradient(#30336b,#8c7ae6,#273c75,#30336b,#0c2461);
display: flex;
}
.ab-main {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 3rem;
    color:white;
    margin-top: 5rem;
    margin-left:50rem;
}

.abc-section{
    height: 65rem;
    background-color:blue;
    display: flex;
    }
    .rm-img{
       
        width: 152rem;
        height: 65rem;
    }
    .first-image {
        display: flex;
        margin-top: 20rem;
        margin-left:32rem;
        position: absolute;
      }
      .first-para {
        display: flex;
        margin-top: 32rem;
        margin-left:26rem;
        position: absolute;
        font-weight: 700;
        font-size: 1.3rem;
        color:white;
        text-align: center;
      }
      .second-image {
        display: flex;
        margin-top: 20rem;
        margin-left:75rem;
        position: absolute;
      }
      .second-para {
        display: flex;
        margin-top: 32rem;
        margin-left:70rem;
        position: absolute;
        font-weight: 700;
        font-size: 1.3rem;
        color:white;
        text-align: center;
      }
      .third-image {
        display: flex;
        margin-top: 20rem;
        margin-left:115rem;
        position: absolute;
      }
      .third-para {
        display: flex;
        margin-top: 32rem;
        margin-left:110rem;
        position: absolute;
        font-weight: 700;
        font-size: 1.3rem;
        color:white;
        text-align: center;
      }
      .fourth-image {
        display: flex;
        margin-top: 44rem;
        margin-left:53rem;
        position: absolute;
      }
      .fourth-para {
        display: flex;
        margin-top: 57rem;
        margin-left:50rem;
        position: absolute;
        font-weight: 700;
        font-size: 1.3rem;
        color:white;
        text-align: center;
      }
      .fifth-image {
        display: flex;
        margin-top: 44rem;
        margin-left:94rem;
        position: absolute;
      }
      .fifth-para {
        display: flex;
        margin-top: 57rem;
        margin-left:90rem;
        position: absolute;
        font-weight: 700;
        font-size: 1.3rem;
        color:white;
        text-align: center;
      }
      
    
    
      .pe-img {
        width: 150px;
        height: 100px;
      }
      .pf-img {
        width: 150px;
        height: 110px;
      }
      .pg-img {
        width: 150px;
        height: 110px;
      }
      .ph-img {
        width: 150px;
        height: 110px;
      }
      .pi-img {
        width: 150px;
        height: 110px;
      }
`

export default About
