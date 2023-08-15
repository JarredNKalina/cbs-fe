import { emailRegex } from "../../../constants"

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
	} else if (formInfo.password.text.length < 6) {
		return "Password must be at least 6 characters."
	} else {
		return null
	}
}

export function getEmailError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "email">
) {
	if (!formInfo.email.text) {
		return "Email is required."
	} else if (emailRegex.test(formInfo.email.text) === false) {
		return "Email is invalid."
	} else {
		return null
	}
}

export function getFullNameError<FormInputs extends string>(
	formInfo: ParamWithKnownEntity<FormInputs, "fullName">
) {
	if (!formInfo.fullName.text) {
		return "Full name is required."
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
