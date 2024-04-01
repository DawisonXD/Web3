import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
import * as s from './styles/globalStyles';
/* import { v4 } from uuid; */

function App() {
	const dispatch = useDispatch();
	//grabbing the blockchain state
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);

	//blockchain.swordToken.methods.createRandomSword(blockchain.account, "");
	//blockchain.swordToken.methods.createRandomSword("david");
	console.log(blockchain.swordToken);

	console.log(data);

	const mintNFT = (_account, _name) => {
		blockchain.swordToken.methods
			.createRandomSword(_name)
			.send({
				from: _account,
				value: blockchain.web3.utils.toWei('0.01', 'ether'),
			})
			.once('error', (err) => {
				console.log(err);
			})
			.then((receipt) => {
				console.log(receipt);
				dispatch(fetchData(blockchain.account));
			});
	};

	useEffect(() => {
		if (blockchain.account != '' && blockchain.swordToken != null) {
			dispatch(fetchData(blockchain.account));
		}
	}, [blockchain.swordToken, blockchain.account, dispatch]);

	//console.table(blockchain.swordToken.methods);

	//dispatch using our connect function(from blockchainAction)
	//useEffect(() => {}, [dispatch]);

	//using globalStyles.js
	//look for abreviations
	return (
		<s.Screen>
			{blockchain.account === '' || blockchain.swordToken === null ? (
				<s.Container flex={1} ai={'center'} jc={'center'}>
					<s.TextTitle>Connect to the Game</s.TextTitle>
					<s.SpacerSmall />
					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(connect());
						}}
					>
						CONNECT
					</button>
				</s.Container>
			) : (
				<s.Container ai={'center'} style={{ padding: '24px' }}>
					<s.TextTitle>Welcome to the Game</s.TextTitle>
					<s.SpacerSmall />
					<button
						onClick={(e) => {
							e.preventDefault();
							mintNFT(blockchain.account, 'Unknown'); //--add input box to let people give the name
						}}
					>
						CREATE NFT SWORD
					</button>
					<s.SpacerSmall />
					<s.Container
						jc={'space-between'}
						fd={'row'}
						style={{ flexWrap: 'wrap' }}
					>
						{data.allSwords.map((item) => {
							return (
								<>
									<s.Container>
										<s.TextDescription key={''}>
											ID: {item.id}
										</s.TextDescription>
										<s.TextDescription key={''}>
											DNA: {item.dna}
										</s.TextDescription>
										<s.TextDescription key={''}>
											LEVEL: {item.level}
										</s.TextDescription>
										<s.TextDescription key={''}>
											RARITY: {item.rarity}
										</s.TextDescription>
									</s.Container>
									<s.SpacerSmall />
								</>
							);
						})}
					</s.Container>
				</s.Container>
			)}
		</s.Screen>
	);
}

export default App;
