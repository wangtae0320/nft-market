import React from 'react'

//contract에 값을 갖고 와서 만들어보는 함수
const CollectionContext = React.createContext({
  contract: null,
  totalSupply: null,
  collection: [],
  nftIsLoading: true,
  loadContract: () => {},
  loadTotalSupply: () => {},
  loadCollection: () => {},
  setNftIsLoading: () => {},
})

export default CollectionContext
