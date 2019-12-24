import { HashRouter as Router, Route } from 'react-router-dom';
import _flowRight from 'lodash/flowRight';
import React, { Component } from 'react';
import { withWalletContext } from './context/WalletContext';
import WalletManager from './walletManager/WalletManager';
import AddInitialWallet from './addWallet/AddInitialWallet';

class AppRouter extends Component {
	render() {
		const {
			walletController: {
				readyToManageWallet,
				isWalletEmpty,
				setReadyToManageWallet,
			},
		} = this.props;

		return (
			<Router>
				<React.Fragment>
					<Route
						exact
						path="/"
						render={() =>
							readyToManageWallet && !isWalletEmpty() ? (
								<WalletManager />
							) : (
								<AddInitialWallet
									setReadyToManageWallet={setReadyToManageWallet}
								/>
							)
						}
					/>
				</React.Fragment>
			</Router>
		);
	}
}

const enhancer = _flowRight(withWalletContext);

export default enhancer(AppRouter);
