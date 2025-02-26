const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.addCompleted = async (req, res) => {
    try {
        const token = req.cookies.token;
        const newValue = req.body.value;

        if (!token) {
            return res.json({username: null});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let completedArray = Array.isArray(user.completed) ? user.completed : [];

        if (!completedArray.includes(newValue)) {
            completedArray.push(newValue);
        }

        console.log(newValue);

        user.completed = completedArray;
        
        await user.save();

        res.status(201).json({ res: true });
    } catch (err) {
        res.status(500).json({ res: false, message: "Internal Server Error" });
        console.error(err);
    }
}

exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({username: null});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.json({username: null});
        }

        res.json({ completed: user.completed, username: user.username });
    } catch (err) {
        res.status(500).json({ user: null, message: "Internal Server Error" });
        console.error(err);
    }
}

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(username);
        console.log(email);
        console.log(password);

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(201).json({ message: 'Email already registered' });

        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', res: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message, res: false, message: 'Email already in use!' });
    }
};

exports.login = async (req, res) => {
    try{
        const { email, password,  } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(201).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(201).json({ res: false });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prouduction',
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        req.json({ res: true });
    } catch (err){
        res.status(500).json({ error: "Internal Server Error" });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = User.findByPk(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found'});
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};