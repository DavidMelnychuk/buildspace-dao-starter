import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

const RINKEBY_CHAIN_ID = 4;
const supportedChainIds = [RINKEBY_CHAIN_ID];

const connectors = {
  injected: {}
};

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
