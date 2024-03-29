import React from 'react';
import Home from './Home';
import About from './About';
import Trade from './Trade';
import Earn from './Earn';
import Contact from './Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from './GlobalStyle';
import CryptoTable from './CoinTable';


const App = () => {
  const theme ={
    colors:{
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "#30336b",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
    };
 
  return (
  <ThemeProvider theme={theme}>
    <GlobalStyle/>
    
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/trade" element={<CryptoTable/>}/>
    <Route path="/earn" element={<Earn/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/trade/:sym" element={<Trade/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  </ThemeProvider>

  )
};

export default App
