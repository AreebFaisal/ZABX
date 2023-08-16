import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { Button } from "./styles/Button";
import styled from 'styled-components'

const MetamaskConnector = ({ showDropdownOption = false }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const detectProvider = async () => {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        setProvider(ethereumProvider);
      } else {
        console.log("Please install MetaMask!");
      }
    };
    detectProvider();
  }, []);

  const connectMetamask = async () => {
    if (!provider) return;
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectMetamask = () => {
    setAccount(null);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Wrapper>
      <div>
        {!account ? (
          <Button className="btn-metamask" onClick={connectMetamask}>
            Connect Metamask
          </Button>
        ) : (
          showDropdownOption ? (
            <div className="account-wrapper">
              <Button className="account" onClick={toggleDropdown}>
                {account} ▼ 
              </Button>
              {showDropdown && (
                <div className="dropdown">
                  <Button className="disconnect-option" onClick={disconnectMetamask}>
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button className="btn-metamask">
              Connected: {account}
            </Button>
          )
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn-metamask {
    background-color: #4834d4;
    border-radius: 50px 20px;
  }

  .disconnect-option {
    background-color: red;
    border-radius: 20px 20px;
  }
`;

export default MetamaskConnector;
