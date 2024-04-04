import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Navbar from './components/Navbar.js'

import Home from './screens/Home.js'

function App() {
  const [account, setAccount] = useState(null)

  return (
    <BrowserRouter>
      <Helmet>
        <title>Ticketlemon</title>
      </Helmet>
      <Navbar account={account} setAccount={setAccount} />
      <Home />
      <Routes>
      </Routes>
    </BrowserRouter>
  );

}

export default App;