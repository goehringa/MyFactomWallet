import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Field, FastField, ErrorMessage } from 'formik';

const FormTextField = ({
	accept,
	autoComplete = false,
	autoFocus,
	classes,
	disabled = false,
	displayError = true,
	error = false,
	fullWidth = false,
	isNotFast,
	label,
	maxLength,
	multiline,
	name,
	onChange,
	onBlur,
	onKeyPress,
	margin,
	placeholder,
	shrink = false,
	spellCheck = false,
	step = false,
	type = 'text',
	validate,
	width,
	dataCy = 'formTextField',
}) => {
	const FieldType = isNotFast ? Field : FastField;
	return (
		<>
			<FieldType name={name} {...(validate ? { validate } : {})}>
				{({ field }) => (
					<TextField
						{...field}
						{...(onChange ? { onChange } : {})}
						{...(onBlur ? { onBlur } : {})}
						{...{
							autoFocus,
							error,
							disabled,
							fullWidth,
							label,
							placeholder,
							type,
							multiline,
							onKeyPress,
							margin,
						}}
						inputProps={{
							autoComplete: autoComplete ? 'on' : 'off',
							maxLength,
							spellCheck,
							...(accept ? { accept } : {}),
							...(step ? { step } : {}),
						}}
						style={{ width }}
						InputLabelProps={{
							...(shrink ? { shrink } : {}),
						}}
						data-cy={dataCy}
					/>
				)}
			</FieldType>
			{displayError && (
				<ErrorMessage
					name={name}
					render={(msg) => <div className={classes.errorText}>{msg}</div>}
				/>
			)}
		</>
	);
};

const styles = (theme) => ({
	errorText: { color: 'red', fontSize: '13px', textAlign: 'left' },
});

export default withStyles(styles)(FormTextField);
