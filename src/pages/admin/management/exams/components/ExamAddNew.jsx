import React, { useEffect, useState } from 'react'
import '../../popup.scss'
import { message } from 'antd'

export default function ExamAddNew({ setAddNewExam }) {
    const [questions, setQuestions] = useState([])

    const updateData = () => {
        fetch('http://localhost:3000/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data)
            })
    }

    useEffect(() => {
        updateData();
    }, [])

    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <form action="" className='popup-box-content' onSubmit={(event) => { addNewHandle(event) }}>
                    <h3>Add New</h3>
                    <div className='input-group'>
                        <label htmlFor="title">Title :<sup>*</sup></label>
                        <input name='title' type="text" maxLength={30} placeholder='Max 30 characters' className={/* error.question ? 'error' :  */''} onChange={() => {/*  setError({ ...error, question: null }) */ }} />
                    </div>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="maxscore">Max Score :<sup>*</sup></label>
                                <input name='maxscore' type="number" maxLength={100} placeholder='Max 100' className={/* error.question ? 'error' :  */''} onChange={() => {/*  setError({ ...error, question: null }) */ }} />
                            </div>
                            <div>
                                <label htmlFor="passscore">Pass Score :<sup>*</sup></label>
                                <input name='passscore' type="number" maxLength={100} placeholder='Max 100' className={/* error.question ? 'error' :  */''} onChange={() => {/*  setError({ ...error, question: null }) */ }} />
                            </div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="quesCount">Questions Count :<sup>*</sup></label>
                                <input name='quesCount' type="number" maxLength={40} placeholder='Max 40 questions' className={/* error.question ? 'error' :  */''} onChange={() => {/*  setError({ ...error, question: null }) */ }} />
                            </div>
                            <div>
                                <span>Checked point:</span>
                            </div>
                        </div>
                    </div>
                    <div className='table-container'>
                        <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered choiceQuesTable">
                            <thead className='table-dark'>
                                <tr>
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
                                                <input type="checkbox" onChange={()=>{
                                                    
                                                }}/>
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
                            <button type="submit" className="btn btn-dark">Submit</button>
                            <button className="btn btn-danger" onClick={() => { setAddNewExam(false) }}>Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}
