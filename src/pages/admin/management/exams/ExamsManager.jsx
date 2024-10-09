import React, { useEffect, useState } from 'react'
import ExamDetail from './components/ExamDetail';
import { Switch, message, Modal } from 'antd';
import '../management.scss'
import ExamAddNew from './components/ExamAddNew';
import TimeStamp from '../../../../functions/TimeStamp';
import ExamEdit from './components/ExamEdit';

export default function ExamsManager() {
    const [pageCount, setPageCount] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [keywords, setKeywords] = useState('')
    const [users, setUsers] = useState([])
    const [currentExam, setCurrentExam] = useState({})
    const [detailPopup, setDetailPopup] = useState(false)
    const [addNewExam, setAddNewExam] = useState(false)
    const [editExam, setEditExam] = useState(false)

    const pagesSize = 15;

    // Lấy dữ liệu cài đặt dữ liệu render
    const updateData = () => {
        fetch('http://localhost:3000/exams')
            .then(res => res.json())
            .then(data => {
                renderDataFn(data, keywords, currentPage)
            })
    }

    useEffect(() => {
        updateData();
    }, [keywords, currentPage, detailPopup, addNewExam,editExam])

    //Hàm render data chính
    const renderDataFn = (data, keywords, currentPage) => {
        const startIndex = (currentPage - 1) * pagesSize;
        const endIndex = startIndex + pagesSize;
        const lowerKeyWords = keywords.toLowerCase();

        // Lọc kết quả tìm kiếm
        const searchResult = data.filter((item) => {
            if (item.title.toLowerCase().includes(lowerKeyWords)) {
                return item
            }
        })
        // Cắt data theo trang và render
        let renderData = searchResult.slice(startIndex, endIndex)

        // Nếu phần tử hiển thị của trang = 0 thì render lại trang trước
        if (renderData.length == 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
        setUsers(renderData)

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

    const [modal, contextHolder] = Modal.useModal();
    const handleActiveChange = (id, e) => {
        modal.confirm({
            title: 'Status Change',
            content: e ? 'Are you confirm to active this exam?' : 'Are you confirm to inactive this exam?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                fetch(`http://localhost:3000/exams/${id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            status: e,
                            updateAt: Date.now()
                         })
                    }
                )
                    .then(res => {
                        updateData();
                        console.log(res);

                        message.success('Thay đổi trạng thái thành công')
                    })
            }
        });
    };

    const handleDelete = (id) => {
        modal.confirm({
            title: 'Xác Nhận',
            content: 'Bạn có chắc chắn muốn xóa bài thi này không?',
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => {
                fetch(`http://localhost:3000/exams/${id}`,{
                    method: 'DELETE'
                })
                .then(res => {
                    if (res.status === 200 || res.status === 200) {
                        updateData();
                        message.success('Xóa thành công')
                    }else{
                        message.error('Lỗi!')
                    }
                })
                .catch(err => {
                    message.error('Xóa thất bại!')
                })
            }
        });
        
    }

    return (
        <div className='contentBox'>
            {detailPopup && <ExamDetail setDetailPopup={setDetailPopup} currentExam={currentExam} />}
            {addNewExam && <ExamAddNew setAddNewExam={setAddNewExam} />}
            {editExam && <ExamEdit setEditExam={setEditExam} currentExam={currentExam} />}
            {contextHolder}
            <div className='container'>
                <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered">
                    <caption
                    >Exams Management
                        <button className='add-new-button' onClick={() => { setAddNewExam(!addNewExam) }}>Add new <span className="material-symbols-outlined">add</span></button>
                        <input id='searching-input' onChange={(e) => { setKeywords(e.target.value) }} type="text" placeholder='Enter searching keyword' />
                    </caption>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Question Count</th>
                            <th scope="col">Maximum Score</th>
                            <th scope="col">Pass Score</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length === 0 ?
                                <tr>
                                    <td colSpan="7" className="empty-table-message">
                                        No data available.
                                    </td>
                                </tr> :
                                users.map((item, index) => (
                                    <tr key={Math.random() * Date.now()}>
                                        <th scope="row">{(currentPage - 1) * pagesSize + index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.questions.length}</td>
                                        <td>{item.maximumScore}</td>
                                        <td>{item.passScore}</td>
                                        <td><TimeStamp timestamp={item.createAt} /></td>
                                        <td><TimeStamp timestamp={item.updateAt} /></td>
                                        <td className='action-box'>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setDetailPopup(!detailPopup)
                                                setCurrentExam(item)
                                            }}>
                                                info
                                            </span>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setEditExam(true)
                                                setCurrentExam(item)
                                            }}>
                                                edit_square
                                            </span>
                                            <Switch size='small' className='switch' checked={item.status} onChange={(e) => handleActiveChange(item.id, e)} />
                                            <span class="material-symbols-outlined" onClick={()=>{ handleDelete(item.id) }}>
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
