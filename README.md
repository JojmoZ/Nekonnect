![Project Logo](https://github.com/JojmoZ/Nekonnect/blob/main/src/assets/nekonect.png)

### Introduction
``Nekonnect``, a peer-to-peer lending platform designed to bridge financial opportunity and trust. By leveraging blockchain technology and real-world assets, we provide a secure, transparent, and decentralized environment where lenders and borrowers can connect seamlessly. Built on ICP technology, Nekonnect utilizes smart contracts to ensure flexibility, supporting features such as Internet Identity, ICP tokens, DFX, and Motoko. To enhance security, our platform integrates AI-powered face verification, ensuring a safe and reliable lending experience for all users.

## Website Demo
![Landing Page](https://github.com/JojmoZ/Nekonnect/blob/main/src/assets/landing-demo.gif)

### Features
- Supply and borrow money
- Manage your own profile
- Contact the person you want to lend through chat
- Loan Repayment Tracking (Easily monitor repayment schedules and due dates)

### Requirements and Pre-requisites
- WSL (v2.4.11)
- Ubuntu (v24.04.1 LTS)
- Node.js (v20.15.0)
- DFX (v0.24.0)
- NPM (v10.9.2)
- NVM (v0.40.1)

## How to Run
```sh
wsl --install -d Ubuntu
git clone https://github.com/JojmoZ/Nekonnect.git
cd Nekonnect/
npm run setup

npm start

```

Note:
<br />
``npm run setup`` is a command that executes all the necessary steps to set up the project. It includes starting the WebSocket gateway, running the Flask server for face recognition, and initializing the website. The website itself consists of a Motoko backend and a React + TypeScript frontend.

## Future Development
- Improve the accuracy and precision of AI-powered face recognition to ensure that borrowers' identities match their registered profiles more accurately.
- Offer more flexible loan types, such as long-term loans, short-term loans, microloans, and other types of loans.
