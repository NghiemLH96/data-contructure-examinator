import React from 'react'
import TimeStamp from '../../../functions/TimeStamp'
import { useEffect, useState } from 'react'
import { message, Modal } from 'antd'
import './examlist.scss'
import { useNavigate } from 'react-router-dom'
import { jwtVerify } from 'jose'
import FnPageBanner from '../../components/banner/FnPageBanner'
export default function ExamsList() {
    const secretKey = new TextEncoder().encode('don tShare')
    const navigator = useNavigate();
    const checkLogin = async () => {
        const token = localStorage.getItem('token-user');
        if (token) {
            try {
                const checking = await jwtVerify(token, secretKey);
                if (checking.payload) {
                    return true
                }else{
                    return false
                }
            } catch (err) {
                return false
            }
        }
    };

    const [exams, setExams] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/exams')
            .then(res => res.json())
            .then(data => setExams(data))
            .catch(err => message.error("Get data failure"))
    }, [])

    const handleStartTest = async (id) => {
        const status = await checkLogin();
        if (status) {
            navigator(`/exams/${id}`)
        }else{
            Modal.confirm({
                title: 'You should to login first , do you want to login now?',
                onOk() {
                    navigator('/auth')
                }
              });
        }
    }

    return (
        <div>
            <FnPageBanner/>
            <div className='pageContainer'>
                <section className='pageSection table-responsive'>
                    <h4>Choice Exams</h4>
                    <table className="table table-striped align-middle table-hover">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Maximum Scores</th>
                                <th scope="col">Pass Scores</th>
                                <th scope="col">Duration (mins)</th>
                                <th scope="col">questions</th>
                                <th scope="col">Distribute At</th>
                                <th scope="col">Updata At</th>
                                <th scope="col">Test</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exams.map((exam, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{exam.title}</td>
                                        <td>{exam.maximumScore}</td>
                                        <td>{exam.passScore}</td>
                                        <td>{exam.testingDuration}</td>
                                        <td>{exam.questions.length}</td>
                                        <td>{<TimeStamp timestamp={exam.createAt} />}</td>
                                        <td>{<TimeStamp timestamp={exam.updateAt} />}</td>
                                        <td>
                                            <span className="material-symbols-outlined testIcon" onClick={()=>{handleStartTest(exam.id)}}>
                                                play_arrow
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </section>

            </div>
        </div>
    )
}
