import { phoneNumberRegex } from "../../../constants"

export type Form<T extends string> = Record<
	T,
	{ errorMessage: string | null; touched: boolean; text: string }
>

type ParamWithKnownEntity<
	FormInputs extends string,
	KnownEntity extends string
> = Form<FormInputs> &
	Record<KnownEntity, { errorMessage: string | null; touched: boolean; text: string }>

export function getPasswordError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "password">
) {
	if (!formInfo.password.text) {
		return "Password is required."
	} else if (formInfo.password.text.length < 8) {
		return "Password must be at least 8 characters."
	} else {
		return null
	}
}

export function getCodeError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "code">
) {
	if (!formInfo.code.text) {
		return "Code is required."
	} else {
		return null
	}
}

export function getFirstNameError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "firstName">
) {
	if (!formInfo.firstName.text) {
		return "First name is required."
	} else {
		return null
	}
}

export function getLastNameError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "lastName">
) {
	if (!formInfo.lastName.text) {
		return "Last name is required."
	} else {
		return null
	}
}

export function getPhoneNumberError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "phoneNumber">
) {
	if (!formInfo.phoneNumber.text) {
		return "Phone number is required."
	} else if (phoneNumberRegex.test(formInfo.phoneNumber.text) === false) {
		return "Phone number is invalid."
	} else {
		return null
	}
}

export function isFieldTouched<FormInputs extends string>(
	formInfo: Form<FormInputs>,
	fieldName: FormInputs
): boolean {
	const field = formInfo[fieldName]
	return field ? field.touched && field.touched : false
}
