const hre = require("hardhat")
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
            "date": "October 26",
            "time": "3PM JST",
            "location": "Ghibli Museum, Mitaka, Tokyo, Japan"
        },
        {
            "name": "The Shawshank Redemption",
            "cost": tokens(2),
            "tickets": 50,
            "date": "March 10",
            "time": "10PM PST",
            "location": "AMC DINE-IN Dolby Atmos at Universal CityWalk Hollywood, CA"
        },
        {
            "name": "The Godfather",
            "cost": tokens(3),
            "tickets": 20,
            "date": "April 15",
            "time": "7PM CET",
            "location": "Kino International, Berlin, Germany"
        },
        {
            "name": "The Dark Knight",
            "cost": tokens(1),
            "tickets": 150,
            "date": "June 1",
            "time": "12PM AEST",
            "location": "Melbourne Central, VIC, Australia"
        },
        {
            "name": "Pulp Fiction",
            "cost": tokens(2),
            "tickets": 75,
            "date": "July 20",
            "time": "5PM BST",
            "location": "The Prince Charles Cinema, London, UK"
        },
        {
            "name": "Parasite",
            "cost": tokens(1),
            "tickets": 80,
            "date": "August 12",
            "time": "9PM KST",
            "location": "CGV Yongsan I'Park Mall, Seoul, South Korea"
        }
    ]

    for (var i = 0; i < 5; i++) {
        const transaction = await lemon.connect(deployer).list(
            occasions[i].name,
            occasions[i].cost,
            occasions[i].tickets,
            occasions[i].date,
            occasions[i].time,
            occasions[i].location,
        )

        await transaction.wait()

        console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

