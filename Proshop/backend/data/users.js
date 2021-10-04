import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@test.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Sid',
		email: 'sid@test.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'leex',
		email: 'lee@test.com',
		password: bcrypt.hashSync('123456', 10)
	}
]

export default users
