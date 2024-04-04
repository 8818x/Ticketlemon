import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
const SelectedProduct = ({ occasion, toggle, setToggle, setOccasion }) => {

  const togglePop = () => {
    setOccasion(occasion)
    toggle ? setToggle(false) : setToggle(true)
  }

  return (
    <Container className='product-container'>
      <Row className="selected-product">
        <Col>
          <img src={occasion.image} alt={occasion.name} className="product-image" />
        </Col>
        <Col>
          <div className="product-details">
            <p><strong>{occasion.date}</strong><br />{occasion.time}</p>
            <h2>{occasion.name}</h2>
            <p>{occasion.location}</p>
            <p>
              <strong>
                {ethers.utils.formatUnits(occasion.cost.toString(), 'ether')}
              </strong>
              ETH
            </p>
            {occasion.tickets.toString() === "0" ? (
            <Button disabled>Sold Out</Button>
          ) : (
            <Button onClick={() => togglePop()}>View Seats</Button>
          )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectedProduct;
