// constants
import Web3 from 'web3';
import SwordToken from '../../contracts/SwordToken.json';
// log
import { fetchData } from '../data/dataActions';

const connectRequest = () => {
	return {
		type: 'CONNECTION_REQUEST',
	};
};

//we send payload to the Reducer
//to fill in the states
const connectSuccess = (payload) => {
	return {
		type: 'CONNECTION_SUCCESS',
		payload: payload,
	};
};

//same
const connectFailed = (payload) => {
	return {
		type: 'CONNECTION_FAILED',
		payload: payload,
	};
};

//same
const updateAccountRequest = (payload) => {
	return {
		type: 'UPDATE_ACCOUNT',
		payload: payload,
	};
};

//entry point of the application
export const connect = () => {
	//we dispatch the actions that we declared above(connectSucces..)
	return async (dispatch) => {
		dispatch(connectRequest());
		//check if the windows has etherium capabilities
		//checks if your web is connceted to the blockchain(with Metamask)
		if (window.ethereum) {
			//initialise a web3 instance and pass it a provider
			let web3 = new Web3(window.ethereum);
			try {
				//request from the window etherium object
				//return an array of accounts connected to this app
				const accounts = await window.ethereum.request({
					method: 'eth_accounts', //--check
				});
				console.log('Account', accounts[0]); //--check
				//networkID: 1337
				const networkId = await window.ethereum.request({
					method: 'net_version',
				});
				console.log('NetworkId', networkId); //--check
				//check if we can connect to the network
				//const swordTokenNetworkData = await SwordToken.networks[networkId];
				if (networkId) {
					//if (SwordTokenNetworkData) {
					//create instance of our swordToken
					const swordToken = new web3.eth.Contract(
						SwordToken.abi,
						'0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7',
					);
					dispatch(
						connectSuccess({
							account: accounts[0],
							swordToken: swordToken,
							web3: web3,
						})
					);
					// Add listeners start
					window.ethereum.on('accountsChanged', (accounts) => {
						dispatch(updateAccount(accounts[0]));
					});
					window.ethereum.on('chainChanged', () => {
						window.location.reload();
					});
					// Add listeners end
				} else {
					dispatch(connectFailed('Change network to Polygon.'));
				}
			} catch (err) {
				dispatch(connectFailed('Something went wrong.'));
			}
			//if you are not connected to the blockchain(Metamask)
			//payload = error msg
		} else {
			dispatch(connectFailed('Install Metamask.'));
		}
	};
};

//export function
export const updateAccount = (account) => {
	return async (dispatch) => {
		dispatch(updateAccountRequest({ account: account }));
		dispatch(fetchData(account));
	};
};
