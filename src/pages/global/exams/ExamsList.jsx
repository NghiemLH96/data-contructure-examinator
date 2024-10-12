import React from 'react'
import TimeStamp from '../../../functions/TimeStamp'
import { useEffect, useState } from 'react'
import { message, Modal } from 'antd'
import './examlist.scss'
import { useNavigate } from 'react-router-dom'
import { jwtVerify } from 'jose'
import ExamsPageBanner from '../../components/banner/ExamsPageBanner'
export default function ExamsList() {
    const secretKey = new TextEncoder().encode('don tShare')
    const navigator = useNavigate();
    const checkLogin = async () => {
        const token = localStorage.getItem('token-user');
        if (token) {
            try {
                const checking = await jwtVerify(token, secretKey);
                if (checking.payload) {
                    if (checking.payload.result.active) {
                        return true
                    } else {
                        message.error('Tài khoản của bạn đã bị khóa')
                        return false
                    }
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
            .then(data => {
                const activeData = data.filter(item => item.status == true)
                setExams(activeData)
            })
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
            <ExamsPageBanner/>
            <div className='pageContainer'>
                <section className='pageSection table-responsive'>
                    <h4>Lựa chọn bài thi</h4>
                    <table className="table table-striped align-middle table-hover table-responsive">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tiêu đề</th>
                                <th scope="col">Điểm tối đa</th>
                                <th scope="col">Điểm đạt</th>
                                <th scope="col">Thời lượng (phút)</th>
                                <th scope="col">Câu hỏi</th>
                                <th scope="col" className='dp-none-768'>Thời gian phát hành</th>
                                <th scope="col" className='dp-none-768'>Thời gian cập nhật</th>
                                <th scope="col">Bắt đầu thi</th>
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
