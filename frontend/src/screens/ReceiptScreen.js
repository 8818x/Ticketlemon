import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { ethers } from "ethers";
import config from '../config.json';
import { Container, Row, Col } from "react-bootstrap";

const ReceiptScreen = () => {
    const [provider, setProvider] = useState(null);
    const { receiptId } = useParams();
    const [receiptData, setReceiptData] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchReceiptData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/purchases/${receiptId}`);
                setReceiptData(response.data);

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                const network = await provider.getNetwork();
                setAddress(config[network.chainId].Ticketlemon.address);
            } catch (error) {
                console.error('Error fetching receipt data:', error);
            }
        };
        fetchReceiptData();
    }, [receiptId]);

    if (!receiptData) {
        return <div className="receipt-loading">Loading...</div>; // Use dedicated CSS class
    }

    return (
        <div>
            <Helmet>
                <title>Receipt {receiptData._id}</title>
            </Helmet>
            <Container className="receipt-container">
                <Row>
                    <Col>
                        <h1>Ticket</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div>

                            <img src={receiptData.description.image} alt='nya-hello' className="img-responsive"></img>
                            <h5 className="receipt-id">Account: {receiptData.description.account}</h5>
                            <h6 className="receipt-id">Receipt ID: {receiptData._id}</h6>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="receipt-details">
                            <h4>Event: {receiptData.description.name}</h4>
                            <h5>Token Id: {receiptData.description.tkid}</h5>
                            <h5>Contract Address: {address}</h5>
                            <h5>Seat: {receiptData.description.seat}</h5>
                            <h5>Cost: {receiptData.description.cost} ETH</h5>
                            <h5>Date: {receiptData.description.date}</h5>
                            <h5>Time: {receiptData.description.time}</h5>
                            <h5>Location: {receiptData.description.location}</h5>
                            <h5>Paid At: {receiptData.paidAt}</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div>
                <p className="disclaimer">This receipt is for informational purposes only.</p>
            </div>
        </div>
    );
};

export default ReceiptScreen;
