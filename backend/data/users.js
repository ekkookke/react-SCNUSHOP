import bcrypt from 'bcryptjs';

const users = [
  { name: 'Admin', email: 'admin@123.com', password: bcrypt.hashSync('123', 10), isAdmin: true},
  { name: 'test1', email: 'test1@123.com', password: bcrypt.hashSync('123', 10)},
  { name: 'test2', email: 'test2@123.com', password: bcrypt.hashSync('123', 10)},
  { name: 'test3', email: 'test3@123.com', password: bcrypt.hashSync('123', 10)},
  { name: 'test4', email: 'test4@123.com', password: bcrypt.hashSync('123', 10)},
];

export default users;