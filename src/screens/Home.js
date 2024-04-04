import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Show from '../components/Show'
import SeatChart from '../components/SeatChart'

import Ticketlemon from '../abis/Ticketlemon.json'

import config from '../config.json'

function Home() {
    const [provider, setProvider] = useState(null)
    const [account, setAccount] = useState(null)

    const [lemon, setLemon] = useState(null)
    const [occasions, setOccasions] = useState([])

    const [occasion, setOccasion] = useState({})
    const [toggle, setToggle] = useState(false)

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)

        const network = await provider.getNetwork()
        const lemon = new ethers.Contract(config[network.chainId].Ticketlemon.address, Ticketlemon, provider)
        setLemon(lemon)

        const totalOccasions = await lemon.totalOccasions()
        const occasions = []

        for (var i = 1; i <= totalOccasions; i++) {
            const occasion = await lemon.getOccasion(i)
            occasions.push(occasion)
        }

        setOccasions(occasions)

        window.ethereum.on('accountsChanged', async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const account = ethers.utils.getAddress(accounts[0])
            setAccount(account)

        })
    }

    useEffect(() => {
        loadBlockchainData()
    }, [])
    return (
        <div className='card-container'>
            {occasions.map((occasion, index) => (
                <Show
                    occasion={occasion}
                    id={index + 1}
                    lemon={lemon}
                    provider={provider}
                    account={account}
                    toggle={toggle}
                    setToggle={setToggle}
                    setOccasion={setOccasion}
                    key={index}
                />
            ))}
            {toggle && (
                <SeatChart
                    occasion={occasion}
                    lemon={lemon}
                    provider={provider}
                    setToggle={setToggle}
                />
            )}
        </div>

    )
}

export default Home;