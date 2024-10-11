import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtVerify } from 'jose';
import './testingPage.scss';
import { Modal, Result, Button } from 'antd';
import { message } from 'antd';

export default function TestingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [exam, setExam] = useState({});
    const [questionsList, setQuestionsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [choosingQuesIndex, setChoosingQuesIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const secretKey = new TextEncoder().encode('don tShare');

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await fetch(`http://localhost:3000/exams/${id}`);
                const data = await response.json();
                setExam(data);
                const durationInMinutes = data.testingDuration || 0;
                setTimeLeft(durationInMinutes * 60);
                setTimerActive(true);
                return data.questions;
            } catch (err) {
                setError(err);
                console.error(err);
            }
        };

        const fetchQuestions = async (questionIds) => {
            try {
                const response = await fetch('http://localhost:3000/questions');
                const allQuestions = await response.json();
                const quesList = allQuestions.filter(question => questionIds.includes(question.id));
                setQuestionsList(quesList);
            } catch (err) {
                setError(err);
                console.error(err);
            }
        };

        const fetchExamData = async () => {
            setLoading(true);
            const questionIds = await fetchExam();
            if (questionIds) {
                await fetchQuestions(questionIds);
            }
            setLoading(false);
        };

        fetchExamData();

    }, [id]);

    useEffect(() => {
        if (exam.questions) {
            const currentQues = questionsList.find(
                question => question.id === exam.questions[choosingQuesIndex]
            );
            setCurrentQuestion(currentQues);
        }
    }, [choosingQuesIndex, questionsList, exam.questions]);

    const handleAnswerChange = (selectedAnswer, answerIndex) => {
        const questionId = exam.questions[choosingQuesIndex];
        const isCorrect = selectedAnswer.correct;
        const points = currentQuestion.score;

        setAnswers(prev => ({
            ...prev,
            [questionId]: { selectedInd: answerIndex, correct: isCorrect, points: points },
        }));
    };

    const showModal = (totalPoints) => {
        if (totalPoints >= exam?.passScore) {
            Modal.success({
                title: 'You passed the test',
                content: (
                    <div>
                        <p>Your Scores : {totalPoints}/{exam?.maximumScore}.</p>
                        <p>Pass Scores : {exam?.passScore}</p>
                    </div>
                ),
                okText: 'Return to exams list',
                onOk: () => {
                    navigate('/exams')
                }
                ,
                style: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                },
            });
        } else {
            Modal.error({
                title: 'You failed the test!',
                content: (
                    <div>
                        <p>Your Scores : {totalPoints}/{exam?.maximumScore}.</p>
                        <p>Pass Scores : {exam?.passScore}</p>
                    </div>
                ),
                okText: 'Return to exams list',
                onOk: () => {
                    navigate('/exams')
                },
                style: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                },
            });
        }
    };

    const handleSubmit = async () => {
        //Tính tổng điểm
        let totalPoints = 0;

        for (const questionId in answers) {
            const answerInfo = answers[questionId];
            if (answerInfo.correct) {
                totalPoints += answerInfo.points;
            }
        }
        console.log('Total Points:', totalPoints);

        //Lấy token về kiểm tra tài khoản người dùng
        const token = localStorage.getItem('token-user');
        if (token) {
            try {
                const { payload } = await jwtVerify(token, secretKey);
                if (payload.result) {
                    console.log(payload.result);
                    //Định hình thông tin bài thi
                    const newExam = {
                        id: String(Math.ceil(Math.random() * 1000000)),
                        examId: Number(exam.id),
                        createAt: Date.now(),
                        score: totalPoints,
                        duration: exam.testingDuration - Math.floor(timeLeft / 60),
                        passed: totalPoints >= exam?.passScore,
                    };
                    const userInfo = await fetch(`http://localhost:3000/users/${payload.result.id}`)
                        .then(res => {
                            if (res.status == 200 || 201) {
                                return res.json();
                            }
                        })
                        if (!userInfo) {
                            message.error("Have problem from getting user")
                            return
                        }
                    fetch(`http://localhost:3000/users/${userInfo.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...userInfo,
                            exams: [...userInfo.exams, newExam], // Thêm bài kiểm tra mới vào cuối
                        }),
                    })
                        .then(res => {
                            if (res.status == 200 || 201) {
                                showModal(totalPoints);
                            } else {
                                throw new Error('Submission failed');
                            }
                        })
                        .catch(err => {
                            message.error('Submit failed');
                        });
                } else {
                    throw ('Token invalid')
                }
            } catch (err) {
                console.error("Token verification failed:", err);
            }
        } else {
            message.error('Please login to take the exam')
        }
        setTimerActive(false);
    };



    useEffect(() => {
        if (timeLeft > 0 && timerActive) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && Object.keys(answers).length > 0) {
            handleSubmit();
        }
    }, [timeLeft, timerActive]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds / 60) - hours * 60;
        const secs = seconds % 60;
        return `${hours}:${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handlePrevQues = () => {
        if (choosingQuesIndex > 0) {
            setChoosingQuesIndex(choosingQuesIndex - 1);
        }
    }

    const handleNextQues = () => {
        if (choosingQuesIndex < exam.questions.length - 1) { // Fixed this line
            setChoosingQuesIndex(choosingQuesIndex + 1);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;




    return (
        <div className='page-container'>
            <section className='page-container-item'>
                <h2>Testing</h2>
            </section>
            <section className='page-container-item'>
                <section id='question-content-container' className='page-section-container'>
                    <p><span>{`Question ${choosingQuesIndex + 1}`}</span> : {currentQuestion?.ques}</p>
                </section>
                <section id='answer-container' className='page-section-container'>
                    {
                        currentQuestion?.ans.map((answer, index) => {
                            const questionId = exam.questions[choosingQuesIndex];
                            const selectedAnswer = answers[questionId];

                            return (
                                <div key={index} className='answer-item'>
                                    <input
                                        type='radio'
                                        name={`answer-${questionId}`}
                                        value={answer.content}
                                        checked={selectedAnswer?.selectedInd === index}
                                        onChange={() => handleAnswerChange(answer, index)}
                                    />
                                    <label>{answer.content}</label>
                                </div>
                            );
                        })
                    }
                </section>
                <section id='question-nav-container' className='page-section-container'>
                    <div id='count-down-clock'>{formatTime(timeLeft)}</div>
                    <div className='question-nav-buttons'>
                        {exam.questions?.map((questionId, index) => (
                            <button
                                key={index}
                                className={answers[questionId] !== undefined ? 'question-nav-button done' : 'question-nav-button'}
                                onClick={() => setChoosingQuesIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div id='end-test-buttons'>
                        <button onClick={handlePrevQues} disabled={choosingQuesIndex === 0}>Prev</button>
                        <button onClick={handleNextQues} disabled={choosingQuesIndex === exam.questions.length - 1}>Next</button>
                    </div>
                    <div className='submit-btn-container'>
                        <button id='submit-test-button' onClick={() => {
                            Modal.confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc chắn muốn nộp bài không?',
                                onOk: () => {
                                    handleSubmit();
                                }
                            });
                        }}>Nộp bài</button>
                    </div>
                </section>
            </section>
        </div>
    );
}
