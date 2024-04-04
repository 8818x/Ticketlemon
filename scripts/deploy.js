const { ethers } = require('hardhat')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
    // Setup accounts & variables
    const [deployer] = await ethers.getSigners()
    const NAME = "Ticketlemon"
    const SYMBOL = "TL"

    // Deploy contract
    const Ticketlemon = await ethers.getContractFactory("Ticketlemon")
    const lemon = await Ticketlemon.deploy(NAME, SYMBOL)
    await lemon.deployed()

    console.log(`Deployed Ticketlemon Contract at: ${lemon.address}\n`)

    const occasions = [
        {
            "name": "Spirited Away",
            "cost": tokens(3),
            "tickets": 0,
            "date": "October 26, 2024",
            "time": "3PM JST",
            "location": "Ghibli Museum, Mitaka, Tokyo, Japan",
            "image": "https://gateway.pinata.cloud/ipfs/QmRdqxSoof5PYe8cirBGrYVAGqcUFWu7py66gFxMi7iFJ7",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmajLNNTp9izpf3KJuv9MHr4im9A34mLiRoyu9VjWaGaHb/1.json"
        },
        {
            "name": "The Shawshank Redemption",
            "cost": tokens(2),
            "tickets": 50,
            "date": "March 10, 2024",
            "time": "10PM PST",
            "location": "AMC DINE-IN Dolby Atmos at Universal CityWalk Hollywood, CA",
            "image": "https://gateway.pinata.cloud/ipfs/QmThRneGxXsQHzw2i4whMc17knuw5fTN2BsYUSgxEbdzVh",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmajLNNTp9izpf3KJuv9MHr4im9A34mLiRoyu9VjWaGaHb/2.json"
        },
        {
            "name": "The Godfather",
            "cost": tokens(3),
            "tickets": 80,
            "date": "April 15, 2024",
            "time": "7PM CET",
            "location": "Kino International, Berlin, Germany",
            "image": "https://gateway.pinata.cloud/ipfs/QmY2dHcefBss32vre7zhARb5aTbmoRZws5j17zUFG1Cf9W",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmajLNNTp9izpf3KJuv9MHr4im9A34mLiRoyu9VjWaGaHb/3.json"
        },
        {
            "name": "PQueen Extravaganza",
            "cost": tokens(2),
            "tickets": 75,
            "date": "May 10, 2024",
            "time": "9PM PST",
            "location": "Madison Square Garden, New York, USA",
            "image": "https://gateway.pinata.cloud/ipfs/QmRfmHsir19x1FnwiHJJoNnTv9LHgCvm8cfRhH5eCAAWAp",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmajLNNTp9izpf3KJuv9MHr4im9A34mLiRoyu9VjWaGaHb/4.json"
        },
        {
            "name": "Moonlit Serenade Under the Stars",
            "cost": tokens(3),
            "tickets": 150,
            "date": "April 15, 2024",
            "time": "7PM CET",
            "location": "Kino International, Berlin, Germany",
            "image": "https://gateway.pinata.cloud/ipfs/QmbbdchoJksmwMSDeXkC5LKHt3Va58eTAhfQVbeagCkNTA",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmajLNNTp9izpf3KJuv9MHr4im9A34mLiRoyu9VjWaGaHb/5.json"
        }
    ]

  
    for (var i = 0; i < occasions.length; i++) {
        const transaction = await lemon.connect(deployer).list(
            occasions[i].name,
            occasions[i].cost,
            occasions[i].tickets,
            occasions[i].date,
            occasions[i].time,
            occasions[i].location,
            occasions[i].image,
            occasions[i].ipfsuri
        )

        await transaction.wait()


        console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)

    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

