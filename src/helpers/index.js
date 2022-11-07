export function validateRegistration(fields, changed) {
	if (changed) {
		let { firstName, lastName, email, password } = fields
		if (!firstName) {
			return 'First Name is required.'
		} else if (firstName && firstName.length < 3) {
			return 'First Name must be at least 3 characters.'
		} else if (!lastName) {
			return 'Last Name is required.'
		} else if (lastName && lastName.length < 3) {
			return 'Last Name must be at least 3 characters.'
		} else if (!email) {
			return 'Email is required.'
		} else if (email && email.match(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)) {
			return 'Enter a valid email address'
		} else if (!password) {
			return 'Password is required.'
		} else if (password && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6}$/)) {
			return 'Password must be minimum 6 characters, at least one letter, one number and one special character'
		} else {
			return 'ok'
		}
	}
}
export function validateLogin(fields, changed) {
	if (changed) {
		let { email, password } = fields
		if (!email) {
			return 'Email is required.'
		} else if (email && email.match(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)) {
			return 'Enter a valid email address'
		} else if (!password) {
			return 'Password is required.'
		} else if (password && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6}$/)) {
			return 'Password must be minimum 6 characters, at least one letter, one number and one special character'
		} else {
			return 'ok'
		}
	}
}
