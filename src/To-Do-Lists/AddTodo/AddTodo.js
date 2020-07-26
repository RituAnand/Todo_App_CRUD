import React, { useState } from 'react';
import './addTodo.css'

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', isSelected: false,color:'' }
	const [ user, setUser ] = useState(initialFormState)
	const handleInputChange = event => {
		props.setEditing(false)

		const { name, value} = event.target

		setUser({ ...user, [name]: value})
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!(user.name).trim()) return;

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
		<input type="text" name="name" value={user.name} onChange={handleInputChange} />
		</form>
	)
}

export default AddUserForm
