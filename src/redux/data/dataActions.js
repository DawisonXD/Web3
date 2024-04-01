// log
import store from '../store';

const fetchDataRequest = () => {
	return {
		type: 'CHECK_DATA_REQUEST',
	};
};

const fetchDataSuccess = (payload) => {
	return {
		type: 'CHECK_DATA_SUCCESS',
		payload: payload,
	};
};

const fetchDataFailed = (payload) => {
	return {
		type: 'CHECK_DATA_FAILED',
		payload: payload,
	};
};

export const fetchData = (account) => {
	return async (dispatch) => {
		dispatch(fetchDataRequest());
		try {
			let allSwords = await store
				.getState()
				.blockchain.swordToken.methods.getSwords()
				.call();
			let allOwnerSwords = await store
				.getState()
				.blockchain.swordToken.methods.getOwnerSwords(account)
				.call();

			dispatch(
				fetchDataSuccess({
					allSwords,
					allOwnerSwords,
				})
			);
		} catch (err) {
			console.log(err);
			dispatch(fetchDataFailed('Could not lado data from contract.'));
		}
	};
};
