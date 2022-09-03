import React from 'react'
import ReactDOM from 'react-dom/client'
//import ReactDOM  from 'react-dom' -> Not supported anymore
import App from './App'
import './index.css'

import {BrowserRouter} from 'react-router-dom';
import UserProvider from './context/UserProvider';

import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
)


/*
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
)
*/
