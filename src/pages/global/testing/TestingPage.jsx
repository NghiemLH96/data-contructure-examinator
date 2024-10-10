import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './testingPage.scss';
import { Modal } from 'antd'; // Nhớ import Modal nếu bạn sử dụng

export default function TestingPage() {
    const { id } = useParams();
    const [exam, setExam] = useState({});
    const [questionsList, setQuestionsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [choosingQuesIndex, setChoosingQuesIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0); // State để lưu thời gian còn lại
    const [timerActive, setTimerActive] = useState(false); // Trạng thái của đồng hồ

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await fetch(`http://localhost:3000/exams/${id}`);
                const data = await response.json();
                setExam(data);
                const durationInMinutes = 1/* data.testingDuration */ || 0; // Lấy thời gian từ dữ liệu, mặc định là 0 nếu không có
                setTimeLeft(durationInMinutes * 60); // Giả sử duration là thời gian theo phút
                setTimerActive(true); // Bắt đầu đồng hồ
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
        const isCorrect = selectedAnswer.correct; // Lưu trạng thái đúng/sai
        const points = currentQuestion.score; // Số điểm cho câu trả lời

        setAnswers(prev => ({
            ...prev,
            [questionId]: { selectedInd: answerIndex, correct: isCorrect, points: points }, // Lưu ID, trạng thái đúng/sai và số điểm cho câu hỏi hiện tại
        }));
    };

    const handleSubmit = () => {
        let totalPoints = 0;

        for (const questionId in answers) {
            const answerInfo = answers[questionId];
            if (answerInfo.correct) {
                totalPoints += answerInfo.points; // Cộng điểm cho câu trả lời đúng
            }
        }
        console.log('Tổng điểm:', totalPoints);
        setTimerActive(false); // Dừng đồng hồ khi nộp bài
    };

    useEffect(() => {
        if (timeLeft > 0 && timerActive) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleSubmit(); // Tự động nộp bài khi hết thời gian
        }
    }, [timeLeft, timerActive]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds / 60)-hours*60;
        const secs = seconds % 60;
        return `${hours}:${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Định dạng phút:giây
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='page-container'>
            <section className='page-container-item'>
                <h2>Testing</h2>
                <div id='count-down-clock'>{formatTime(timeLeft)}</div> {/* Hiển thị đồng hồ đếm ngược */}
            </section>
            <section className='page-container-item'>
                <section id='question-content-container' className='page-section-container'>
                    <p><span>{`Question ${choosingQuesIndex + 1}`}</span> : {currentQuestion?.ques}</p>
                </section>
                <section id='answer-container' className='page-section-container'>
                    {
                        currentQuestion?.ans.map((answer, index) => {
                            const questionId = exam.questions[choosingQuesIndex];
                            const selectedAnswer = answers[questionId]; // Lấy thông tin câu trả lời của câu hỏi hiện tại

                            return (
                                <div key={index} className='answer-item'>
                                    <input
                                        type='radio'
                                        name={`answer-${questionId}`} // Đảm bảo mỗi câu hỏi có tên riêng
                                        value={answer.content}
                                        checked={selectedAnswer?.selectedInd === index} // Kiểm tra câu trả lời đã chọn
                                        onChange={() => handleAnswerChange(answer, index)} // Gọi hàm khi thay đổi câu trả lời
                                    />
                                    <label>{answer.content}</label>
                                </div>
                            );
                        })
                    }
                </section>
                <section id='question-nav-container' className='page-section-container'>
                    <div id='question-nav-buttons'>
                        {exam.questions?.map((question, index) => (
                            <button
                                key={index}
                                className='question-nav-button'
                                onClick={() => setChoosingQuesIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div id='end-test-buttons'>
                        <button onClick={() => {
                            Modal.confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc chắn muốn nộp bài không?',
                                onOk: () => {
                                    handleSubmit();
                                }
                            });
                        }}>Nộp bài</button>
                        <button>Leave</button>
                    </div>
                </section>
            </section>
        </div>
    );
}
