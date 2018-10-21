import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SendFactoidForm from './SendFactoidForm.js';
import ConvertECForm from './ConvertECForm.js';
import AddressInfo from './AddressInfo';

class WalletTabContent extends React.Component {
	state = {
		tabValue: 0,
	};

	handleChange = (event, tabValue) => {
		this.setState({ tabValue });
	};

	render() {
		const { classes, type } = this.props;

		const { tabValue } = this.state;
		return (
			<div className={classes.root}>
				{type === 'fct' && (
					<div>
						<Tabs
							value={tabValue}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab label="Send Factoids" />
							<Tab label="Address Info" />
							<Tab label="Convert FCT to EC" />
						</Tabs>
						{tabValue === 0 && (
							<TabContainer classes={classes}>
								<SendFactoidForm />
							</TabContainer>
						)}
						{tabValue === 1 && (
							<TabContainer classes={classes}>
								<AddressInfo />
							</TabContainer>
						)}
						{tabValue === 2 && (
							<TabContainer classes={classes}>
								<ConvertECForm />
							</TabContainer>
						)}
					</div>
				)}
				{type === 'ec' && (
					<div>
						<Tabs
							value={tabValue}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab label="Address Info" />
						</Tabs>

						{tabValue === 0 && (
							<TabContainer classes={classes}>
								<AddressInfo />
							</TabContainer>
						)}
					</div>
				)}
			</div>
		);
	}
}
WalletTabContent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function TabContainer(props) {
	return (
		<Typography component="div" className={props.classes.tabContainer}>
			{props.children}
		</Typography>
	);
}
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = {
	root: { textAlign: 'center' },
	tabContainer: {
		paddingLeft: 55,
		paddingRight: 55,
		paddingTop: 18,
		paddingBottom: 10,
	},
};

export default withStyles(styles)(WalletTabContent);
