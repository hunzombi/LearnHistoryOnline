const express = require('express');
const { register, login, deleteUser, getUser, addCompleted } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/', deleteUser);
router.get('/getUser', getUser);
router.post('/completed', addCompleted);

module.exports = router;