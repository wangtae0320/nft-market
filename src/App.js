import React, { useContext, useEffect } from 'react'

import BodyContent from './components/BodyContent'
import MainArea from './components/MainArea'
import { ethers } from 'ethers'

import web3 from './connection/web3'
import Web3Context from './store/web3-context'
import CollectionContext from './store/collection-context'
import contractABI from './abis/Funding.json'
import { fundingAddress } from './constants/address'
// const contractABI = require('./abis/Funding.json')
// import MyNFT from './Abis/MyNFT'
// import MADTOKEN from './Abis/MADTOKEN'
// const MyNFT = require('./Abis/MyNFT.json')
const App = () => {
  const web3Ctx = useContext(Web3Context)
  const collectionCtx = useContext(CollectionContext)

  //내가 만든 Contract 추가
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
      const accounts = await web3Ctx.loadAccount(web3)
      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3)
      console.log('accounts!!' + accounts)
      console.log('network ID!!' + networkId)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = collectionCtx.loadContract(
        fundingAddress,
        contractABI.abi,
        provider,
      )
      console.log('contract address!!' + contract.address)

      //mint 버튼이 떠야함 -> main.js에서 MintForm이 떠야하는데 그러려면 아래 작업을 해주어야함
      if (contract) {
        console.log('Collection contract deployed to ropsten detwork')

        console.log('collectionContract address', contract) //address 어떻게 찍나?
        let totalSupply = await collectionCtx.loadTotalSupply(contract)
        collectionCtx.setNftIsLoading(false) // 이렇게 호출하는게 맞나?
        collectionCtx.loadCollection(contract, totalSupply)
      } else {
        window.alert(
          'NFTMarketplace contract not deployed to detected network.',
        )
      }

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3)
      })

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (networkId) => {
        window.location.reload()
      })
    }

    loadBlockchainData()
  }, [])

  console.log(web3)
  console.log(collectionCtx.contract)
  console.log(web3Ctx.account)

  const showContent = web3 && collectionCtx.contract && web3Ctx.account

  return (
    <React.Fragment>
      {showContent && <MainArea />}
      {/* <MainArea /> */}
      <BodyContent />
    </React.Fragment>
  )
}

export default App
