import { Link } from 'react-router-dom'
import logo from '../lemon.png'
import { ethers } from 'ethers'
import Button from 'react-bootstrap/Button'
import SearchBox from "./SearchBox"

const Navbar = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account)
    }

    return (
        <div>
            <nav>
                <Link to='/' className="title">
                    <img src={logo} alt='Ticketlemon' className="logo"></img>
                    Ticketlemon
                </Link>
                <SearchBox />
                {account ? (
                    <Button variant="outline-light" className="btn-margin">
                        {account.slice(0, 6) + "..." + account.slice(38, 42)}
                    </Button>
                ) : (
                    <Button variant="primary" onClick={connectHandler} className="btn-margin" size='lg'>
                        Connect
                    </Button>
                )}
            </nav>

        </div>
    )
}

export default Navbar;
