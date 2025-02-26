require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./config/db');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/question', questionRoutes);

app.get('/test', (req, res) => {
    res.send('Server is running!');
});

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB synced!');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}!`);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();