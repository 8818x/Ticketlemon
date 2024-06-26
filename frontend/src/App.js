import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import ReceiptScreen from './screens/ReceiptScreen.js'
import { HelmetProvider } from 'react-helmet-async'
import ListScreen from './screens/ListScreen.js'


function App() {
  const [account, setAccount] = useState(null)
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Navbar account={account} setAccount={setAccount} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:occasionId' element={<ProductScreen />} />
          <Route path='/receipt/:receiptId' element={<ReceiptScreen />} />
          <Route path="/purchases/account/:account" element={<ListScreen/>} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );

}

export default App;