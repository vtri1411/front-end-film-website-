import React from 'react'

import './input.scss'

const Input = (props) => {
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange ? props.onChange : null}
			value={props.value}
		/>
	)
}

export default Input
