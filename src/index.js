import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './GlobalStyle'
import Web3Provider from './store/Web3Provider'
import CollectionProvider from './store/CollectionProvider'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Web3Provider>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
