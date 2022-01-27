import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../img/logo2.png'
import web3 from '../connection/web3'
import Web3Context from '../store/web3-context'

const Navigation = () => {
  const web3Ctx = useContext(Web3Context)
  const connectWalletHandler = async () => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } catch (error) {
      console.error(error)
    }
    // Load accounts
    web3Ctx.loadAccount(web3)
    console.log(web3Ctx.account)
  }
  // // Metamask Event Subscription - Account changed
  // window.ethereum.on('accountsChanged', (accounts) => {
  //   web3Ctx.loadAccount(web3)
  // })

  // // Metamask Event Subscription - Network changed
  // window.ethereum.on('chainChanged', (chainId) => {
  //   window.location.reload()
  // })

  let etherscanUrl

  if (web3Ctx.networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io'
  } else if (web3Ctx.networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io'
  } else if (web3Ctx.networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io'
  } else {
    etherscanUrl = 'https://etherscan.io'
  }
  useEffect(() => {
    // Check if the user has Metamask active
    if (!web3) {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
      return
    }

    // Function to fetch all the blockchain data
    const loadBlockchainData = async () => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error) {
        console.error(error)
      }

      // Load account
      // const accounts = await web3Ctx.loadAccount(web3)
      // Load Network ID
      // const networkId = await web3Ctx.loadNetworkId(web3)

      // const fundingContract = fundingCtx.loadContract(
      //   web3,
      //   MyNFT.abi,
      //   nftAddress,
      // )

      // //mint 버튼이 떠야함 -> main.js에서 MintForm이 떠야하는데 그러려면 아래 작업을 해주어야함
      // if (fundingContract) {
      //   console.log('Funding contract deployed to ropsten detwork')

      //   console.log('fundingContract address', fundingContract) //address 어떻게 찍나?
      //   let totalSupply = await fundingCtx.loadTotalSupply(fundingContract)
      //   fundingCtx.setNftIsLoading(false) // 이렇게 호출하는게 맞나?
      //   fundingCtx.loadCollection(fundingContract, totalSupply)
      // } else {
      //   window.alert(
      //     'NFTMarketplace contract not deployed to detected network.',
      //   )
      // }

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3)
      })

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
    }

    loadBlockchainData()
  }, [])

  return (
    <NavigationStyled>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-items">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">CreateNFT</a>
        </li>
        <li>
          <a href="#">FAQs</a>
        </li>
        <li>
          <a href="#">Activity</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li className="nav-item">
          {web3Ctx.account && (
            <a
              className="nav-link small"
              href={`${etherscanUrl}/address/${web3Ctx.account}`}
              target="blank"
              rel="noopener noreferrer"
            >
              {web3Ctx.account}
            </a>
          )}
          {!web3Ctx.account && (
            <div className="primary-btn" onClick={connectWalletHandler}>
              MetaMask Connect
            </div>
          )}
        </li>
      </ul>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-items {
    display: flex;
    align-items: center;
    li {
      margin: 0 1rem;
    }
    .primary-btn {
      margin-left: 3rem;
      background-color: rgba(57, 95, 246, 0.3);
      padding: 0.6rem 1.3rem;
      border-radius: 70px;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: rgba(57, 95, 246, 1);
      }
    }
  }
  .logo {
    img {
      width: 60px;
    }
  }
`

export default Navigation
