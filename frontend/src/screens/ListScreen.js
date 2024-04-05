import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ethers } from 'ethers';
import { Container, Button, Table } from 'react-bootstrap';



function ListScreen() {
    const [account, setAccount] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { accountId } = useParams();

    const loadBlockchainData = async () => {
        try {
            window.ethereum.on('accountsChanged', async () => {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = ethers.utils.getAddress(accounts[0]);
                setAccount(account);
            });

            // Fetch initial account data
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0]);
            setAccount(account);

            // Fetch purchases data after setting the account state
            fetchData(account);
        } catch (error) {
            console.error('Error loading blockchain data:', error);
            // Handle error (e.g., show error message to the user)
        }
    }

    const fetchData = async (account) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/purchases/account/${account}`);
            setPurchases(response.data);
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBlockchainData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Helmet>
                <title>My Tickets</title>
            </Helmet>
            
            <Container>
            <h2 style={{ paddingTop: '10px' }}>My Tickets</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Event</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index}>
                                <td><img src={purchase.description.image} alt="Occasion" style={{ width: '100px' }} /></td>
                                <td>{purchase.description.name}</td>
                                <td>{parseFloat(purchase.description.cost, 16)} ETH</td>
                                <td>{purchase.description.date}</td>
                                <td>{purchase.description.time}</td>
                                <td>{purchase.description.location}</td>
                                <td>
                                    {/* Button to link to purchase ID */}
                                    <Link to={`/receipt/${purchase._id}`}>
                                        <Button variant="primary">View Ticket</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default ListScreen;
