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
            "tickets": 60,
            "date": "October 26, 2024",
            "time": "3PM JST",
            "location": "Ghibli Museum, Mitaka, Tokyo, Japan",
            "image": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmXSXQC1BT9GS2WEbGEt54NpAerXbKTmVivm1kRtysq64S/1.jpg",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmVLcVKRvvDbp5UeDg7G1SShFBKbSyyDdkjR3PajPgvZxa/1.json"
        },
        {
            "name": "The Shawshank Redemption",
            "cost": tokens(2),
            "tickets": 0,
            "date": "March 10, 2024",
            "time": "10PM PST",
            "location": "AMC DINE-IN Dolby Atmos at Universal CityWalk Hollywood, CA",
            "image": "https://gateway.pinata.cloud/ipfs/QmThRneGxXsQHzw2i4whMc17knuw5fTN2BsYUSgxEbdzVh",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmVLcVKRvvDbp5UeDg7G1SShFBKbSyyDdkjR3PajPgvZxa/2.json"
        },
        {
            "name": "The Godfather",
            "cost": tokens(3),
            "tickets": 80,
            "date": "April 15, 2024",
            "time": "7PM CET",
            "location": "Kino International, Berlin, Germany",
            "image": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmXSXQC1BT9GS2WEbGEt54NpAerXbKTmVivm1kRtysq64S/3.jpg",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmVLcVKRvvDbp5UeDg7G1SShFBKbSyyDdkjR3PajPgvZxa/3.json"
        },
        {
            "name": "WONDERFUL NIGHT KENNY G",
            "cost": tokens(2),
            "tickets": 75,
            "date": "May 7, 2025",
            "time": "9PM GMT+7",
            "location": "True Arena, Hua Hin, Thailand",
            "image": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmXSXQC1BT9GS2WEbGEt54NpAerXbKTmVivm1kRtysq64S/4.png",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmVLcVKRvvDbp5UeDg7G1SShFBKbSyyDdkjR3PajPgvZxa/4.json"
        },
        {
            "name": "King of Rock n' Roll: ELVIS PRESLEY",
            "cost": tokens(1),
            "tickets": 150,
            "date": "January 21, 2025",
            "time": "8 PM GMT+7",
            "location": "SALA CHALOEMKRUNG, BKK, Thailand",
            "image": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmXSXQC1BT9GS2WEbGEt54NpAerXbKTmVivm1kRtysq64S/5.jpg",
            "ipfsuri": "https://bronze-traditional-sailfish-85.mypinata.cloud/ipfs/QmVLcVKRvvDbp5UeDg7G1SShFBKbSyyDdkjR3PajPgvZxa/5.json"
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

