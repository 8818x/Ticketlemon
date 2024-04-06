# Ticketlemon

Ticketlemon is a decentralized application (DApp) built on the Ethereum blockchain for managing and selling event tickets as non-fungible tokens (NFTs). With Ticketlemon, event organizers can easily create, list, and sell tickets for their occasions while ensuring transparency, security, and immutability through blockchain technology.

## Table of Contents
- [Ticketlemon](#ticketlemon)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Running Tests](#running-tests)
  - [Deployment](#deployment)
  - [Usage](#usage)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Generate](#generate)
  - [Reference](#reference)

## Getting Started

To get started with Ticketlemon, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/8818x/Ticketlemon
```

2. Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

3. Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

## Running Tests

To run tests, execute the following command:
```bash
npx hardhat test
```


## Deployment

To deploy the smart contract, follow these steps:

1. Start the Hardhat node:
```bash
npx hardhat node
```

2. In a separate terminal, execute the deployment script:
```bash
npx hardhat run ./scripts/deploy.js --network localhost
```

## Usage

Once the smart contract is deployed, you can interact with it using web interfaces provided in the frontend and backend.

### Frontend

To start the frontend server, execute the following command:
```bash
cd frontend
npm run start
```

Access the frontend application in your web browser at the specified URL.

### Backend

To start the backend server, execute the following command:
```bash
cd backend
node server.js
```

The backend server should now be running, providing necessary APIs to interact with the smart contract.

## Generate

Generate description by ChatGPT.

## Reference

This project is based on this repository:
```bash
https://github.com/dappuniversity/tokenmaster/
```
