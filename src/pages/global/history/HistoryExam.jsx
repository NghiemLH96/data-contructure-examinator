import {useState , useEffect} from 'react'
import './historyExam.scss'
import HistoryExamBanner from '../../components/banner/HistoryExamBanner'
import { jwtVerify } from 'jose'
import TimeStamp from '../../../functions/TimeStamp'

export default function HistoryExam() {
    const [exams, setExams] = useState([])
    const secretKey = new TextEncoder().encode('don tShare');

    const checkLogin = async () => {
        const token = localStorage.getItem('token-user');
        if (token) {
            try {
                const { payload } = await jwtVerify(token, secretKey);
                if (payload.result) {
                    const userDetail = await fetch(`http://localhost:3000/users/${payload.result.id}`)
                    .then(res => {return res.json()})
                    .catch(err => {
                        console.log("Lấy thông tin người dùng thất bại")
                        return null
                    })
                    console.log(userDetail.exams);
                    
                    userDetail ? setExams(userDetail.exams) : setExams(null)
                }
            } catch (err) {
                console.error("Token verification failed:", err);
            }
        }
    };

    useEffect(() => {
        checkLogin()
    }, [])
    
  return (
    <div>
            <HistoryExamBanner/>
            <div className='pageContainer'>
                <section className='pageSection table-responsive'>
                    <h4>Lựa chọn bài thi</h4>
                    <table className="table table-striped align-middle table-hover table-responsive">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID bài thi</th>
                                <th scope="col">Tiêu đề</th>
                                <th scope="col">Điểm</th>
                                <th scope="col">Thời gian đã dùng</th>
                                <th scope="col">Kết quả</th>
                                <th scope="col">Thời gian phát hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exams.map((exam, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{exam.id}</td>
                                        <td>{exam.examTitle}</td>
                                        <td>{exam.score} /{exam.maximumScore}</td>
                                        <td>{exam.duration} /{exam.testingDuration} Phút</td>
                                        <td>{exam.passed ? 'Đạt' : 'Không đạt'}</td>
                                        <td>{<TimeStamp timestamp={exam.createAt} />}</td>
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
