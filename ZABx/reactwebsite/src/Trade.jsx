import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TradingViewWidget from './TradingViewWidget';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from './styles/Button';
import { useParams } from 'react-router-dom';

const Trade = () => {
  const sym = useParams();
  const [orderType, setOrderType] = useState('limit');
  const [buyOrderPrice, setBuyOrderPrice] = useState(0);
  const [buyOrderQuantity, setBuyOrderQuantity] = useState(0);
  const [buySliderValue, setBuySliderValue] = useState(0);
  const [buyTriggerPrice, setBuyTriggerPrice] = useState(0);
  const [sellOrderPrice, setSellOrderPrice] = useState(0);
  const [sellOrderQuantity, setSellOrderQuantity] = useState(0);
  const [sellSliderValue, setSellSliderValue] = useState(0);
  const [sellTriggerPrice, setSellTriggerPrice] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
    if (event.target.value === 'market') {
      setBuyOrderPrice(0);
      setSellOrderPrice(0);
    }
  };

  const handleBuyOrderPriceChange = (event) => {
    setBuyOrderPrice(parseFloat(event.target.value));
  };

  const handleSellOrderPriceChange = (event) => {
    setSellOrderPrice(parseFloat(event.target.value));
  };

  const handleBuyOrderQuantityChange = (event) => {
    setBuyOrderQuantity(parseFloat(event.target.value));
  };

  const handleSellOrderQuantityChange = (event) => {
    setSellOrderQuantity(parseFloat(event.target.value));
  };

  const handleSellSliderChange = (value) => {
    setSellSliderValue(value);
    const maxSliderValue = 100;
    const sellOrderQuantity = (availableBalance * value) / maxSliderValue;
    setSellOrderQuantity(sellOrderQuantity);
  };

  const handleBuySliderChange = (value) => {
    setBuySliderValue(value);
    const maxSliderValue = 100;
    const buyOrderQuantity = (availableBalance * value) / maxSliderValue;
    setBuyOrderQuantity(buyOrderQuantity);
  };

  const handleBuyTriggerPriceChange = (event) => {
    setBuyTriggerPrice(parseFloat(event.target.value));
  };

  const handleSellTriggerPriceChange = (event) => {
    setSellTriggerPrice(parseFloat(event.target.value));
  };

  const handleBuySliderButtonClick = (percentage) => {
    const maxSliderValue = 100;
    const value = (maxSliderValue * percentage) / 100;
    setBuySliderValue(value);
    const buyOrderQuantity = (availableBalance * value) / maxSliderValue;
    setBuyOrderQuantity(buyOrderQuantity);
  };

  const handleSellSliderButtonClick = (percentage) => {
    const maxSliderValue = 100;
    const value = (maxSliderValue * percentage) / 100;
    setSellSliderValue(value);
    const sellOrderQuantity = (availableBalance * value) / maxSliderValue;
    setSellOrderQuantity(sellOrderQuantity);
  };

  const handleBuyOrSell = () => {
    console.log('Executing order...');
    if (availableBalance >= buyOrderValue && sellOrderValue) {
      if(orderType === 'buy') {
        buyCoin();
      } else if (orderType === 'sell') {
        sellCoin();
      }
    } else {
      setErrorMessage('Insufficient balance');
    }
  };

  const buyOrderValue = buyOrderQuantity * buyOrderPrice;
  const sellOrderValue = sellOrderQuantity * sellOrderPrice;

  useEffect(() => {
    // Fetch the balance of the account
    const fetchBalance = async () => {
      try {
        // Check if Web3 is available
        if (window.ethereum) {
          // Connect to the Ethereum provider
          const web3 = new Web3(window.ethereum);

          // Get the current account address
          const [account] = await web3.eth.getAccounts();

          // Fetch the balance of the account
          const balance = await web3.eth.getBalance(account);

          setIsMetamaskConnected(true);
          setAvailableBalance(balance);
        } else {
          throw new Error('Metamask not found');
        }
      } catch (error) {
        console.log('Error connecting to Metamask:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <Wrapper>
      <TradingViewWrapper>
        <TradingViewWidget />
      </TradingViewWrapper>
      <BuySellWrapper>
        <div>
          <div>
            <select value={orderType} onChange={handleOrderTypeChange}>
              <option value="limit">Limit</option>
              <option value="market">Market</option>
              <option value="stop-limit">Stop Limit</option>
            </select>
          </div>
          {orderType !== 'market' && (
            <div>
              <label>Order Price:</label>
              <input
                type="number"
                step="0.01"
                value={buyOrderPrice}
                onChange={handleBuyOrderPriceChange}
                style={{ width: '100%', marginTop :'3px' }}
              />
            </div>
          )}
          {orderType === 'stop-limit' && (
            <div>
              <label>Trigger Price:</label>
              <input
                type="number"
                step="0.01"
                value={buyTriggerPrice}
                onChange={handleBuyTriggerPriceChange}
              />
            </div>
          )}
          <div>
            <label>Order Quantity:</label>
            <input
              type="number"
              step="0.01"
              value={buyOrderQuantity}
              onChange={handleBuyOrderQuantityChange}
              style={{ width: '100%', marginTop :'3px' }}
            />
          </div>
          <div>
            <label>Available Balance:</label>
            <span>{Web3.utils.fromWei(availableBalance.toString(), 'ether')}</span>
          </div>
          <div>
            <SliderContainer>
              <input
                type="range"
                min="0"
                max="100"
                value={buySliderValue}
                onChange={(event) => handleBuySliderChange(event.target.value)}
              />
              <SliderValue>{buySliderValue}%</SliderValue>
            </SliderContainer>
            <SliderButtonContainer>
              <SliderButton onClick={() => handleBuySliderButtonClick(25)}>25%</SliderButton>
              <SliderButton onClick={() => handleBuySliderButtonClick(50)}>50%</SliderButton>
              <SliderButton onClick={() => handleBuySliderButtonClick(75)}>75%</SliderButton>
              <SliderButton onClick={() => handleBuySliderButtonClick(100)}>MAX</SliderButton>
            </SliderButtonContainer>
          </div>
          <div>
            <label>Order Value:</label>
            <input value={buyOrderValue} readOnly style={{marginLeft:'3px'}} />
          </div>
          <div style={{ display: 'flex',marginLeft: '120px', textAlign: 'center' }}>
           
            <Button onClick={handleBuyOrSell} disabled={!isMetamaskConnected} style={{ backgroundColor: '#2ecc71', height: '40px', width: '80px' }}>
              Buy
            </Button>
          </div>
        </div>
        <div>
          <div>
            <select value={orderType} onChange={handleOrderTypeChange}>
              <option value="limit">Limit</option>
              <option value="market">Market</option>
              <option value="stop-limit">Stop Limit</option>
            </select>
          </div>
          {orderType !== 'market' && (
            <div>
              <label>Order Price:</label>
              <br/>
              <input
                type="number"
                step="0.01"
                value={sellOrderPrice}
                onChange={handleSellOrderPriceChange}
                style={{ width: '100%', marginTop :'3px' }}
              />
            </div>
          )}
          {orderType === 'stop-limit' && (
            <div>
              <label>Trigger Price:</label>
              <input
                type="number"
                step="0.01"
                value={sellTriggerPrice}
                onChange={handleSellTriggerPriceChange}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <div>
            <label>Order Quantity:</label>
            <input
              type="number"
              step="0.01"
              value={sellOrderQuantity}
              onChange={handleSellOrderQuantityChange}
              style={{ width: '100%' , marginTop :'3px'}}
            />
          </div>
          <div>
            <label>Available Balance:</label>
            <span>{Web3.utils.fromWei(availableBalance.toString(), 'ether')}</span>
          </div>
          <div>
            <SliderContainer>
              <input
                type="range"
                min="0"
                max="100"
                value={sellSliderValue}
                onChange={(event) => handleSellSliderChange(event.target.value)}
              />
              <SliderValue>{sellSliderValue}%</SliderValue>
            </SliderContainer>
            <SliderButtonContainer>
              <SliderButton onClick={() => handleSellSliderButtonClick(25)}>25%</SliderButton>
              <SliderButton onClick={() => handleSellSliderButtonClick(50)}>50%</SliderButton>
              <SliderButton onClick={() => handleSellSliderButtonClick(75)}>75%</SliderButton>
              <SliderButton onClick={() => handleSellSliderButtonClick(100)}>MAX</SliderButton>
            </SliderButtonContainer>
          </div>
          <div>
            <label>Order Value:</label>
            <input value={sellOrderValue} readOnly style={{marginLeft:'3px'}}/>
          </div>
          <div style={{ display: 'flex', marginLeft: '120px', textAlign: 'center' }}>
            <br/>
            <Button onClick={handleBuyOrSell} disabled={!isMetamaskConnected} style={{ backgroundColor: '#e74c3c', height: '40px', width: '80px' }}>
              Sell
            </Button>
          </div>
        </div>
      </BuySellWrapper>
    </Wrapper>
  );
};


export default Trade;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px;
`;

const TradingViewWrapper = styled.div`
  flex-basis: 60%;
`;

const BuySellWrapper = styled.div`
  
  flex-basis: 25%;
  right:10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    margin-bottom: 10px;
  }

  select,
  input {
    height: 25px;
  }
  label{
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SliderValue = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
`;

const SliderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SliderButton = styled.button`
  height: 20px;
  width: 80px;
  background-color: #54a0ff;
`;