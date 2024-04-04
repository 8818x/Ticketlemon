import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'

const Show = ({ occasion, toggle, setToggle, setOccasion }) => {
  const togglePop = () => {
    setOccasion(occasion)
    toggle ? setToggle(false) : setToggle(true)
    console.log(occasion.ipfsuri)
  }
  return (
    <Container className='card-container'>
      <Card>
      <Card.Body >
        <Card.Img variant='top' src={occasion.image}  className="card-image-top"/>
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
          {occasion.tickets.toString() === "0" ? (
            <Button disabled>Sold Out</Button>
          ) : (
            <Button onClick={() => togglePop()}>View Seats</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Show;