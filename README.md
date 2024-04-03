In order to run the Web3 application you would firstly need to get
MetaMask as a web extension, I observed that it is faster on Microsoft
Edge. After that inside the project you need to first generate a local
blockchain inside a terminal with the command “ganache-cli -d”, after that
you need to run “truffle migrate –reset” inside another terminal to
migrate your contract and make sure that the “contract address”
corresponds with the one inside “blockchainActions”. And after that
everything should be connected and you can start the application with
“yarn start”.

To create a NFT you will need to be connected with MetaMask to the Ganache
local blockchain. After that you will need to add you generated account
and proceed to make the transaction. Note that the transaction could take
several minutes to go through, but you will be able to see that it is
queued inside MetaMask.
