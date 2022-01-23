import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import App from './App';

const getLibrary = (provider: ethers.providers.ExternalProvider) => {
    return new ethers.providers.Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
