import React, { useEffect, useState } from 'react'
import '../management.scss'
import AddNewPopup from './components/AddNewPopup'
import QuesDetail from './components/QuesDetail'
import { message, Modal } from 'antd';
import EditPopup from './components/EditPopup';

export default function QuestionsManager() {
    const [questions, setQuestions] = useState([])
    const [pageCount, setPageCount] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [keywords, setKeywords] = useState('')
    const [addNewBoxDisplay, setAddNewBoxDisplay] = useState(false)
    const [detailBoxDisplay, setDetailBoxDisplay] = useState(false)
    const [editBoxDisplay, setEditBoxDisplay] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const pagesSize = 15;

    // Lấy dữ liệu cài đặt dữ liệu render
    const updateData = () => {
        fetch('http://localhost:3000/questions')
            .then(res => res.json())
            .then(data => {
                renderDataFn(data, keywords, currentPage)
            })
    }

    useEffect(() => {
        updateData();
    }, [keywords, currentPage, addNewBoxDisplay, detailBoxDisplay, editBoxDisplay])


    //Hàm render data chính
    const renderDataFn = (data, keywords, currentPage) => {
        const startIndex = (currentPage - 1) * pagesSize;
        const endIndex = startIndex + pagesSize;
        const lowerKeyWords = keywords.toLowerCase();

        // Lọc kết quả tìm kiếm
        const searchResult = data.filter((item) => {
            if (item.ques.toLowerCase().includes(lowerKeyWords) || item.ques.toLowerCase().includes(lowerKeyWords)) {
                return item
            }
        })

        // Cắt data theo trang và render
        let renderData = searchResult.slice(startIndex, endIndex)

        // Nếu phần tử hiển thị của trang = 0 thì render lại trang trước
        if(renderData.length == 0 && currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
        setQuestions(renderData)

        // Tính số trang và render ra button
        const count = Math.ceil(searchResult.length / pagesSize)
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
    }

    // Xóa dữ liệu dựa trên id
    const [modal, contextHolder] = Modal.useModal();
    const handleDelete = (id) => {
        modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn chắc chắn muốn xóa câu hỏi này chứ?',
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => {
                fetch(`http://localhost:3000/questions/${id}`, {
                    method: 'DELETE',
                  })
                  .then(res => {
                    updateData();
                    message.success('Xóa câu hỏi thành công');
                  })
            }
        });
    };

    return (
        <div className='contentBox'>
            {addNewBoxDisplay && <AddNewPopup setAddNewBoxDisplay={setAddNewBoxDisplay} />}
            {detailBoxDisplay && <QuesDetail setDetailBoxDisplay={setDetailBoxDisplay} currentQuestion={currentQuestion} />}
            {editBoxDisplay && <EditPopup setEditBoxDisplay={setEditBoxDisplay} currentQuestion={currentQuestion} />}
            {contextHolder}
            <div className='container'>
                <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered">
                    <caption
                    >QUẢN LÝ CÂU HỎI
                        <button className='add-new-button' onClick={() => { setAddNewBoxDisplay(!addNewBoxDisplay) }}>Thêm mới <span className="material-symbols-outlined">add</span></button>
                        <input id='searching-input' onChange={(e) => { setKeywords(e.target.value) }} type="text" placeholder='Nhập từ khóa tìm kiếm' />
                    </caption>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Câu hỏi</th>
                            <th scope="col">Bloom</th>
                            <th scope="col">Đáp án</th>
                            <th scope="col">Độ khó</th>
                            <th scope="col">Điểm</th>
                            <th scope="col">Chương</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.length === 0 ?
                                <tr>
                                    <td colSpan="8" className="empty-table-message">
                                        No data available.
                                    </td>
                                </tr> :
                                questions.map((item, index) => (
                                    <tr key={Math.random() * Date.now()}>
                                        <th scope="row">{(currentPage - 1) * pagesSize + index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.ques}</td>
                                        <td>{
                                            item.bloom == "1" ? "Nhớ" :
                                            item.bloom == "2" ? "Hiểu" : 
                                            item.bloom == "3" ? "Vận dụng" :
                                            item.bloom == "4" ? "Phân tích" :'Khác'
                                        }</td>
                                        <td>{item.ans.find((ans) => {
                                            if (ans.correct == true) {
                                                return ans
                                            }
                                        }).content}</td>
                                        <td>{item.level}</td>
                                        <td>{item.score}</td>
                                        <td>{`Chương ${item.chapter}`}</td>
                                        <td className='action-box'>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setDetailBoxDisplay(!detailBoxDisplay),
                                                setCurrentQuestion(item)
                                            }}>
                                                info
                                            </span>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setEditBoxDisplay(!editBoxDisplay),
                                                setCurrentQuestion(item)
                                            }}>
                                                edit_square
                                            </span>
                                            <span onClick={()=>{handleDelete(item.id)}} className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </td>
                                    </tr>
                                ))
                        }
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
            </div>
        </div>
    )
}
