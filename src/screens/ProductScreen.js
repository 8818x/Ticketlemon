import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import Ticketlemon from '../abis/Ticketlemon.json';
import config from '../config.json';
import SelectedProduct from '../components/SelectedProduct';
import SeatChart from '../components/SeatChart';

const ProductScreen = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [lemon, setLemon] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { occasionId } = useParams();
  
  const [filteredOccasion, setFilteredOccasion] = useState(null);
  useEffect(() => {
    const filtered = occasions.find(ocs => ocs.id.toString() === occasionId);
    setFilteredOccasion(filtered);
  }, [occasions, occasionId]);

  const loadBlockchainData = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const lemon = new ethers.Contract(config[network.chainId].Ticketlemon.address, Ticketlemon, provider);
    setLemon(lemon);

    const totalOccasions = await lemon.totalOccasions();
    const occasions = [];

    for (let i = 1; i <= totalOccasions; i++) {
      const occasion = await lemon.getOccasion(i);
      occasions.push(occasion);
    }

    setOccasions(occasions);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });

  };

  useEffect(() => {
    loadBlockchainData();
  }, []);


  return (

    <div>
      <div>
        {filteredOccasion && <SelectedProduct id = {occasionId} occasion={filteredOccasion}  
        lemon = {lemon} provider = {provider} account = {account} toggle={toggle}
        setOccasion={setFilteredOccasion} 
        setToggle={setToggle}/>}
      </div>
      <div>
        {toggle && (
          <SeatChart
            occasion={filteredOccasion}
            lemon={lemon}
            provider={provider}
            setToggle={setToggle}
          />
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
