import React, { useState, useEffect } from 'react'
import TimeStamp from '../../../../../functions/TimeStamp';

export default function ExamsHistory({ setExamsHisPopup, currentUser }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState([])
    const [examsData, setExamsData] = useState([])
    const pagesSize = 5;
    useEffect(() =>{
        const examHistory = currentUser?.exams
        const startIndex = (currentPage - 1) * pagesSize;
        const endIndex = startIndex + pagesSize;

        // Cắt data theo trang và render
        let renderData = examHistory.slice(startIndex, endIndex)

        // Nếu phần tử hiển thị của trang = 0 thì render lại trang trước
        if (renderData.length == 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }

        // Tính số trang và render ra button
        const count = Math.ceil(examHistory.length / pagesSize)
        const pageElements = [];
        for (let i = 0; i < count; i++) {
            pageElements.push(
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                ><a onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1)
                }} className="page-link" href="#">{i + 1}</a></li>)
        }
        setPageCount(pageElements)
        setExamsData(renderData)
    },[currentPage])

    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <span className="material-symbols-outlined close-icon" onClick={() => { setExamsHisPopup(false) }}>
                    close
                </span>
                <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Exam ID</th>
                            <th scope="col">Testing Time</th>
                            <th scope="col">Candidate</th>
                            <th scope="col">email</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examsData?.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.id}</td>
                                <td><TimeStamp timestamp={item.createAt} /></td>
                                <td>{currentUser.first_name}</td>
                                <td>{currentUser.email}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end pagination-sm">
                        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true" onClick={() => { setCurrentPage(currentPage - 1) }}>Previous</a>
                        </li>
                        {
                            pageCount
                        }
                        <li className={currentPage === pageCount.length ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={() => { setCurrentPage(currentPage + 1) }}>Next</a>
                        </li>
                    </ul>
                </nav>
            </section>
        </section>
    )
}
