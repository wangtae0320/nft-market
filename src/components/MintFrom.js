import React, { useState, useContext } from 'react'
import Buffer from 'buffer'

import { MADTOKEN_ADDRESS } from '../constants/address'
import MADNFTContext from '../contractconnect/MADNFT-context.js'
const contractABI = require('../abis/MADTOKEN.json')

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})
