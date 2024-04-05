import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Seat from './Seat'
import axios from 'axios';
import { ethers } from 'ethers';

const SeatChart = ({ occasion, lemon, provider, setToggle, account, setAccount}) => {
  
  const [seatsTaken, setSeatsTaken] = useState(false)
  const [hasSold, setHasSold] = useState(false)
  const navigate = useNavigate();

  const getSeatsTaken = async () => {
    const seatsTaken = await lemon.getSeatsTaken(occasion.id)
    setSeatsTaken(seatsTaken)
  }

  function convert(bignum) {
    const largeNumber = ethers.BigNumber.from(bignum);
    const largeNumberAsNumber = largeNumber.toNumber();
    return largeNumberAsNumber;
  }

  function hex(num) {
    const hexValue = num;
    const weiNumber = parseInt(hexValue, 16);
    const ethnum = parseFloat(weiNumber) / 1e18;
    return ethnum
  }

  const buyHandler = async (_seat) => {
    setHasSold(false)
    try {

      const signer = await provider.getSigner()
      const transaction = await lemon.connect(signer).mint(occasion.id, _seat, { value: occasion.cost })
      await transaction.wait()

      const tokenId = await lemon.connect(signer).getTotalSupply();
      setHasSold(true)

      const data = {
        description: {
          account: account,
          tkid: convert(tokenId),
          ocid: convert(occasion.id._hex),
          name: occasion.name,
          seat: _seat,
          cost: hex(occasion.cost._hex),
          date: occasion.date,
          time: occasion.time,
          location: occasion.location,
          image: occasion.image
        }
      };

      // POST data to MongoDB
      const response = await axios.post('http://localhost:5000/api/purchases', data);
      // console.log(response.data._id)

      navigate(`/receipt/${response.data._id}`);

    } catch (error) {
      console.error('Error minting:', error);
      window.alert('Minting failted. Please try again.')
    }

  }

  useEffect(() => {
    getSeatsTaken()
  }, [hasSold])

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name}</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {seatsTaken && Array(25).fill(1).map((e, i) =>
          <Seat
            i={i}
            step={1}
            columnStart={0}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={i}
          />
        )}

        <div className="occasion__spacer--1 ">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken && Array(Number(occasion.maxTickets) - 50).fill(1).map((e, i) =>
          <Seat
            i={i}
            step={26}
            columnStart={6}
            maxColumns={15}
            rowStart={2}
            maxRows={15}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={i}
          />
        )}

        <div className="occasion__spacer--2">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken && Array(25).fill(1).map((e, i) =>
          <Seat
            i={i}
            step={(Number(occasion.maxTickets) - 24)}
            columnStart={22}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={i}
          />
        )}
      </div>
    </div >
  );
}

export default SeatChart;