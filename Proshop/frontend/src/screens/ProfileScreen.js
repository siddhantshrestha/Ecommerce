import React, { useState, useEffect } from 'react'

import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { userDetails, updateUserProfile } from '../actions/userAction'

const ProfileScreen = ({ history }) => {
	const dispatch = useDispatch()

	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ messages, setMessages ] = useState('')

	const userDetail = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetail

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const updateProfile = useSelector((state) => state.updateProfile)
	const { success } = updateProfile

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login')
			}
			else {
				if (!user.name) {
					dispatch(userDetails('profile'))
				}
				else {
					setName(user.name)
					setEmail(user.email)
				}
			}
		},
		[ history, user, dispatch, userInfo ]
	)

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessages('Password doesnt match')
		}
		else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message variant='danger'>{error}</Message>}
				{messages && <Message variant='danger'>{messages}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{/* {success && <Message variant='success'>Profile Update</Message>} */}
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
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
