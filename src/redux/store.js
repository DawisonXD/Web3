import { applyMiddleware, compose, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import blockchainReducer from './blockchain/blockchainReducer';
import dataReducer from './data/dataReducer';

//concatinate everything with this function
//our first bit of state is blockchain
const rootReducer = combineReducers({
	blockchain: blockchainReducer,
	data: dataReducer,
});

//add middleware
const middleware = [thunk];
//compose
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers);
};

//configure store and export
const store = configureStore();

export default store;
