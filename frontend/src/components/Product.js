import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Product = ({ occasion, toggle, setToggle, setOccasion }) => {
  
  const buyHandler = async () => {
    setOccasion(occasion);
  }

  // const togglePop = () => {
  //   setOccasion(occasion);
  //   setToggle(!toggle);
  // };

  return (
    <Container>
      <Card className="h-100">
        <Card.Img variant='top' src={occasion.image} className="card-image-top" />
        <Card.Body>
          <Card.Text>
            <strong>{occasion.date}</strong><br />{occasion.time}
          </Card.Text>
          <Card.Title>
            {occasion.name}
          </Card.Title>
          <Card.Text>
            <small>{occasion.location}</small>
          </Card.Text>
          <Card.Text>
            <strong>
              {ethers.utils.formatUnits(occasion.cost.toString(), 'ether')}
            </strong>
            ETH
          </Card.Text>
        </Card.Body>
        {/* <Button onClick={() => null} disabled={occasion.tickets.toString() === "0"}>
          {occasion.tickets.toString() === "0" ? "Sold Out" : "View Seats"}
        </Button> */}
        {occasion.tickets.toString() === '0' ? (
          <p className="text-danger">Sold Out</p>
        ) : (
          <Link to={`/product/${occasion.id}`}>
            <Button onClick={() => buyHandler()}>Get Ticket</Button>
          </Link>
        )}
      </Card>
    </Container>
  );
}

export default Product;
