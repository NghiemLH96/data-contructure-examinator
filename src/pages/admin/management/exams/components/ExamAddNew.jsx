import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import $ from 'jquery'
import '../../popup.scss'

export default function ExamAddNew({ setAddNewExam }) {
    const [questions, setQuestions] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState(0);
    const [selectedQues, setSelectedQues] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data)
            })
    }, [])

    const [checkQuestion, setCheckQuestion] = useState([]);
    const handleQuestionCheck = (checked, quesId) => {
        let updateChecked = [];
        if (checked) {
            if (checkQuestion.find(item => item == quesId)) {
                return;
            }
            updateChecked = [...checkQuestion, quesId];
            setSelectedQues(selectedQues + 1);
        } else {
            if (!checkQuestion.find(item => item == quesId)) {
                return;
            }
            updateChecked = checkQuestion.filter(item => item != quesId);
            setSelectedQues(selectedQues - 1);
        }
        setCheckQuestion(updateChecked);
    }

    //Validate Fields
    const [titleFieldVali, setTitleFieldVali] = useState(false);
    const [maxScoreFieldVali, setMaxScoreFieldVali] = useState(false);
    const [passScoreFieldVali, setPassScoreFieldVali] = useState(false);
    const [quesCountFieldVali, setQuesCountFieldVali] = useState(false);

    useEffect(() => {
        let sumScores = 0;
        checkQuestion.map(quesId => {
            sumScores += questions.find(ques => ques.id == quesId).score
        })
        setSelectedPoints(sumScores);
    }, [checkQuestion])

    useEffect(() => {
        if (selectedPoints > Number($("#maxscores").val())) {
            message.error("Điểm chọn lớn hơn điểm tối đa")
            $("#selectedPoints").css("color", "red");
            setMaxScoreFieldVali(false);
        } else if (selectedPoints == Number($("#maxscores").val())) {
            $("#selectedPoints").css("color", "green");
            setMaxScoreFieldVali(true);
        } else {
            $("#selectedPoints").css("color", "#000");
            setMaxScoreFieldVali(false);
        }
    }, [selectedPoints])

    useEffect(() => {
        if (selectedQues > Number($("#quesCount").val())) {
            message.error("Số lượng câu hỏi chọn lớn hơn số lượng câu hỏi tối đa")
            $("#selectedQues").css("color", "red");
            setQuesCountFieldVali(false);
        } else if (selectedQues == Number($("#quesCount").val())) {
            $("#selectedQues").css("color", "green");
            setQuesCountFieldVali(true)
        } else {
            $("#selectedQues").css("color", "#000");
            setQuesCountFieldVali(false);
        }
    }, [selectedQues])

    const handleTitleChange = () => {
        if ($("#examTitle").val() == "") {
            $("#examTitle").addClass("error");
            setTitleFieldVali(false)
            message.error("Vui lòng nhập tên bài thi");
        } else {
            $("#examTitle").removeClass("error");
            setTitleFieldVali(true)
        }
    }

    const handlePassScoreChange = () => {
        if (Number($("#passscores").val()) > Number($("#maxscores").val())) {
            $("#passscores").addClass("error");
            message.error("Điểm qua lớn hơn điểm tối đa");
            setPassScoreFieldVali(false);
        } else {
            $("#passscores").removeClass("error");
            setPassScoreFieldVali(true);
        }
    }

    const handleMaxScoreChange = () => {
        if (Number($("#passscores").val()) > Number($("#maxscores").val())) {
            $("#maxscores").addClass("error");
            message.error("Điểm qua lớn hơn điểm tối đa");
            setMaxScoreFieldVali(false);
        } else {
            $("#maxscores").removeClass("error");
            setMaxScoreFieldVali(true);
        }
    }

    const handleQuestionCountChange = () => {
        if (Number($("#quesCount").val()) > 40) {
            $("#quesCount").addClass("error");
            message.error("Tối đa 40 câu hỏi");
            setQuesCountFieldVali(false);
        } else {
            $("#quesCount").removeClass("error");
            setQuesCountFieldVali(true);
        }
    }

    useEffect(() => {
        if (titleFieldVali && maxScoreFieldVali && passScoreFieldVali && quesCountFieldVali) {
            setSubmitStatus(false);
        } else {
            setSubmitStatus(true);
        }

    }, [ maxScoreFieldVali, passScoreFieldVali, quesCountFieldVali, titleFieldVali])

    const addNewHandle = (event) => {
        event.preventDefault();
        const exam = {
            id:String(Math.ceil(Math.random()*1000000)),
            title: $("#examTitle").val(),
            maximumScore: Number($("#maxscores").val()),
            passScore: Number($("#passscores").val()),
            testingDuration: Number($("#examDuration").val()),
            questions:checkQuestion,
            status:false,
            createAt:Date.now(),
            updateAt:Date.now(),
        }
        console.log(exam);
        fetch("http://localhost:3000/exams", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exam)
          })
          .then(res => {
            if (res.status == 200 || 201) {
                message.success("Thêm mới thành công");
                setAddNewExam(false)
            }else{
                message.error("Thêm mới chưa thành công");
            }
          })
          .catch(err => {
            message.error("Thêm mới thất bại");
          })
    }
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <form action="" className='popup-box-content' onSubmit={(event) => { addNewHandle(event) }}>
                    <h3>Add New</h3>
                    <div className='input-group'>
                        <label htmlFor="title">Title :<sup>*</sup></label>
                        <input id='examTitle' name='title' type="text" maxLength={30} placeholder='Max 30 characters' onChange={() => { handleTitleChange() }} />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="duration">Duration (mins) :<sup>*</sup></label>
                        <input id='examDuration' name='duration' type="number" min={45} max={120} defaultValue={45} placeholder='45mins - 120mins'/>
                    </div>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="maxscore">Max Score :<sup>*</sup></label>
                                <input id='maxscores' defaultValue={0} name='maxscore' type="number" max={100} placeholder='Max 100' className={/* error.question ? 'error' :  */''} onChange={() => { handleMaxScoreChange() }} />
                            </div>
                            <div>
                                <label htmlFor="passscore">Pass Score :<sup>*</sup></label>
                                <input id='passscores' defaultValue={0} name='passscore' type="number" max={100} placeholder='Max 100' className={/* error.question ? 'error' :  */''} onChange={() => { handlePassScoreChange() }} />
                            </div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="quesCount">Questions Count :<sup>*</sup></label>
                                <input id='quesCount' defaultValue={0} name='quesCount' type="number" maxLength={40} placeholder='Max 40 questions' className={/* error.question ? 'error' :  */''} onChange={() => { handleQuestionCountChange() }} />
                            </div>
                            <div className='countBox'>
                                <b id='selectedPoints'>Checked point:{selectedPoints}</b>
                                <b id='selectedQues'>Checked Ques:{selectedQues}</b>
                            </div>
                        </div>
                    </div>
                    <div className='table-container'>
                        <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered choiceQuesTable">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">Check</th>
                                    <th scope="col">#</th>
                                    <th scope="col">Question ID</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Bloom</th>
                                    <th scope="col">Correct answer</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questions.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" onChange={(e) => {
                                                    handleQuestionCheck(e.target.checked, item.id)
                                                }} />
                                            </td>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.id}</td>
                                            <td>{item.ques}</td>
                                            <td>{item.bloom == "2" ? "Remember" :
                                                item.bloom == "1" ? "Understand" : 'Other'}</td>
                                            <td>{item.ans.find((ans) => {
                                                ans.correct == true
                                                return ans
                                            }).content}</td>
                                            <td>{item.score}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='input-group'>
                        <div className='btn-box'>
                            <button type="submit" disabled={submitStatus} className="btn btn-dark">Submit</button>
                            <button className="btn btn-danger" onClick={() => { setAddNewExam(false) }}>Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}
