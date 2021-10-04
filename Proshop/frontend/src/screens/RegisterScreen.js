import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'

const RegisterScreen = ({ location, history }) => {
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ messages, setMessages ] = useState('')

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect)
			}
		},
		[ history, redirect, userInfo ]
	)

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessages('Password doesnt match')
		}
		else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{messages && <Message variant='danger'>{messages}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Enter Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter you name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confrim Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an account ?
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
