//initial state of the "blockchain"
const initialState = {
	loading: false,
	account: null,
	swordToken: null,
	web3: null,
	errorMsg: '',
};

//kick off an action
//deal with it with switch cases
const blockchainReducer = (state = initialState, action) => {
	switch (action.type) {
		//we clear the state to make sure we have a fresh one
		//for each request
		//and we initiate loading
		case 'CONNECTION_REQUEST':
			return {
				...initialState,
				loading: true,
			};

		//return state as it is(not initial)
		//loading false
		//fill in state
		case 'CONNECTION_SUCCESS':
			return {
				...state,
				loading: false,
				account: action.payload.account,
				swordToken: action.payload.swordToken,
				web3: action.payload.web3,
			};

		//if connection fails
		//we clear the state
		//close loading
		//send error message
		case 'CONNECTION_FAILED':
			return {
				...initialState,
				loading: false,
				errorMsg: action.payload,
			};

		//extra state case
		//when a user changes accounts in metamask
		case 'UPDATE_ACCOUNT':
			return {
				...state,
				account: action.payload.account,
			};
		default:
			return state;
	}
};

export default blockchainReducer;
