import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import reportWebVitals from "./reportWebVitals";
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider'
import axios from 'axios'

axios.defaults.baseURL = 'https://chat-app-1-blyr.onrender.com';

createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <BrowserRouter>
     <ChakraProvider>     
      <App />
     </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>,
)
reportWebVitals();