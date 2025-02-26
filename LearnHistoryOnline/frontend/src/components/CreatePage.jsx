import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../css/CreatePage.module.css'

function CreatePage() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [prompt, setPrompt] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const { user } = useContext(AuthContext);

    const addQuestion = (prompt, answers, correctAnswer, type) => {
        const newQuestion = {
            id: questions.length + 1,
            prompt: prompt,
            answers: answers,
            correctAnswer: correctAnswer,
            type: type
        }
        setQuestions([...questions, newQuestion]);
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(question => question.id != id));
    }

    const changeAnswer = (index, newValue) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            if (newAnswers[index] !== undefined) {
                newAnswers[index] = newValue;
            }
            return newAnswers;
        });
    }

    const handleAddQuestion = (e) => {
        e.preventDefault();
        addQuestion(prompt, answers, correctAnswer, 'choice');
    }

    const uploadLesson = async (e) => {
        e.preventDefault();
        let res = await fetch(`${process.env.REACT_APP_API_URL}/api/lesson/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content: text, author: (user === null) ? 'Anonymous' : user }),
            credentials: "include"
        });
        let data = await res.json();
        const lessonId = data.lesson.id;

        res = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lessonId, questions }),
            credentials: "include"
        });
        data = await res.json();
        console.log(data);
    }

    return (
        <div className={styles.createPage}>
            <div className={styles.createForm}>
                <h1>Create</h1>
                <form>
                    <h2>Lesson</h2>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required />
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Content' required />
                    <h2>Quiz</h2>
                    <div className={styles.quizForm}>
                        <h3>New Question</h3>
                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Question prompt' required />
                        <div className={styles.answersForm}>
                            {answers.map((answer, index) => (
                                <div
                                    key={index}
                                    className={correctAnswer === String(index + 1) ? styles.selectedValue : ""}
                                >
                                    <span>Answer {index + 1}</span>
                                    <input type="text" value={answer} onChange={(e) => changeAnswer(index, e.target.value)} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <span>Correct answer: </span>
                            <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                                <option value="" disabled>Select...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <button onClick={(e) => handleAddQuestion(e)}>Add Question</button>
                    </div>
                    <div className={styles.questionsTable}>
                        <div className={styles.row}>
                            <div className={styles.col1}>prompt</div>
                            <div className={styles.col2}>answers</div>
                            <div className={styles.col3}>correct answer</div>
                            <div className={styles.col4}></div>
                        </div>
                        {questions.map((question, index) => (
                            <div className={styles.row}>
                                <div className={styles.col1}>{question.prompt}</div>
                                <div className={styles.col2}>{question.answers[0]}, {question.answers[1]}, {question.answers[2]}, {question.answers[3]}</div>
                                <div className={styles.col3}>{question.answers[parseInt(question.correctAnswer) - 1]}</div>
                                <div onClick={() => deleteQuestion(index+1)} className={styles.col4}><i className='fa-solid fa-x'></i></div>
                            </div>
                        ))}
                        { (questions.length === 0) ? (
                            <div className={styles.row}>
                                <div className={styles.col1}></div>
                                <div className={styles.col2}></div>
                                <div className={styles.col3}></div>
                                <div className={styles.col4}></div>
                            </div>
                        ) : ""}
                    </div>
                </form>
                <button onClick={(e) => uploadLesson(e)}>Create Lesson</button>
            </div>
            <div className={styles.preview}>
                <h1>Preview</h1>
                <h2>{(title !== '' ? title : 'Title')}</h2>
                <div>
                    <p className={(text === '') ? styles.myPlaceholder : ''} >{(text !== '' ? text : 'This is where the text will start appearing when you begin typing in the textbox on the left. Now get to work! Here is some filler text until then: Just kidding! Get to work! Are you seriously gonna leave me empty?!?!?')}</p>
                    <div className={styles.authorName}>Author: {(user !== null ? user.username : 'Anonymous')}</div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;