import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { FormatBalance } from '../WalletManager/Shared/BalanceFormatter.js';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/**
 * Constants
 */
const addressesPath = 'addresses';

class GenerateAddressTable extends React.Component {
	addGeneratedAddress = _debounce((value, address_o, arrayHelpers) => {
		if (value) {
			const addr_o = this.props.newAddress(
				address_o.address,
				value.trim(),
				address_o.index
			);
			arrayHelpers.replace(address_o.index, addr_o);
		} else {
			arrayHelpers.replace(address_o.index, null);
		}
	}, 150);

	validateNickname = (value) => {
		let error;
		if (!value) {
			error = 'Required';
		}
		return error;
	};

	render() {
		const {
			classes,
			generatedAddressList,
			userAddressList, // existing addresses
			getNextFive,
			values,
			errors,
			touched,
			setFieldValue,
			handleChange,
		} = this.props;

		const userAddresses = userAddressList.map((addr_o) => addr_o.address);

		return (
			<React.Fragment>
				<Typography variant="title">{this.props.title}</Typography>
				<ErrorMessage
					name={addressesPath}
					render={(msg) => (
						<span className={classes.errorText}>
							<br />
							{msg}
						</span>
					)}
				/>
				<Paper className={classes.root}>
					<Table>
						<TableHead>
							<TableRow>
								<CustomCell />
								<CustomCell>Address</CustomCell>
								<CustomCell>Balance</CustomCell>
								<CustomCell>Nickname</CustomCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!_isEmpty(generatedAddressList) &&
								generatedAddressList.map((address_o) => {
									const checkboxPath = 'checkbox_' + address_o.index;
									const nicknamePath = 'nickname_' + address_o.index;
									const duplicate =
										userAddresses.indexOf(address_o.address) === -1
											? false
											: true;
									return (
										<TableRow key={address_o.index}>
											<FieldArray
												name={addressesPath}
												render={(arrayHelpers) => (
													<React.Fragment>
														<CustomCell>
															{duplicate ? (
																<Tooltip title="Address already added">
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked
																				disabled
																				name={checkboxPath}
																				color="primary"
																			/>
																		}
																		label={address_o.index + 1}
																		labelPlacement="start"
																	/>
																</Tooltip>
															) : (
																<Field
																	name={checkboxPath}
																	render={({ field, form }) => (
																		<FormControlLabel
																			control={
																				<Checkbox
																					name={checkboxPath}
																					color="primary"
																					onChange={(e) => {
																						arrayHelpers.replace(
																							address_o.index,
																							null
																						);
																						setFieldValue(nicknamePath, '');
																						handleChange(e);
																					}}
																				/>
																			}
																			label={address_o.index + 1}
																			labelPlacement="start"
																		/>
																	)}
																/>
															)}
														</CustomCell>
														<CustomCell>{address_o.address}</CustomCell>
														<CustomCell>
															<FormatBalance
																balance={address_o.balance}
																type={this.props.type}
															/>
														</CustomCell>
														<CustomCell>
															{duplicate ? (
																userAddressList.find((addr_o) => {
																	return addr_o.address === address_o.address;
																}).nickname
															) : (
																<React.Fragment>
																	{_get(values, checkboxPath) && (
																		<React.Fragment>
																			<Field
																				name={nicknamePath}
																				validate={this.validateNickname}
																			>
																				{({ field }) => (
																					<TextField
																						{...field}
																						onChange={(e) => {
																							handleChange(e);
																							this.addGeneratedAddress(
																								e.target.value,
																								address_o,
																								arrayHelpers
																							);
																						}}
																						margin="dense"
																						fullWidth
																						multiline
																						error={
																							errors[nicknamePath] &&
																							touched[nicknamePath]
																								? true
																								: false
																						}
																					/>
																				)}
																			</Field>
																			<ErrorMessage
																				name={nicknamePath}
																				render={(msg) => (
																					<span
																						className={classes.errorTextSmall}
																					>
																						{msg}
																					</span>
																				)}
																			/>
																		</React.Fragment>
																	)}
																</React.Fragment>
															)}
														</CustomCell>
													</React.Fragment>
												)}
											/>
										</TableRow>
									);
								})}
						</TableBody>
						<TableFooter />
					</Table>
				</Paper>
				<br />
				<Button
					type="button"
					onClick={() => getNextFive(generatedAddressList.length)}
					variant="outlined"
					color="primary"
				>
					Load Five More
				</Button>
			</React.Fragment>
		);
	}
}
const CustomCell = withStyles((theme) => ({
	head: {
		color: 'black',
		fontSize: '13px',
		paddingLeft: 5,
		paddingRight: 5,
	},
	body: {
		paddingLeft: 5,
		paddingRight: 5,
	},
}))(TableCell);

const styles = (theme) => ({
	root: {
		width: '800px',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		maxHeight: 405,
	},
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	errorText: {
		color: 'red',
		fontSize: '20px',
	},
	errorTextSmall: {
		color: 'red',
		fontSize: '12px',
	},
});

export default withStyles(styles)(GenerateAddressTable);
