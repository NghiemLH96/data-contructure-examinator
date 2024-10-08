import React, { useEffect, useState } from 'react'
import UserDetail from './components/UserDetail';
import ExamsHistory from './components/ExamsHistory';
import { Switch, message, Modal } from 'antd';
import '../management.scss'

export default function UsersManager() {
    const [pageCount, setPageCount] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [keywords, setKeywords] = useState('')
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [detailPopup, setDetailPopup] = useState(false)
    const [examsHisPopup, setExamsHisPopup] = useState(false)

    const pagesSize = 15;
    // Lấy dữ liệu cài đặt dữ liệu render
    const updateData = () => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => {
                renderDataFn(data, keywords, currentPage)
            })
    }

    useEffect(() => {
        updateData();
    }, [keywords, currentPage, detailPopup])

    //Hàm render data chính
    const renderDataFn = (data, keywords, currentPage) => {
        const startIndex = (currentPage - 1) * pagesSize;
        const endIndex = startIndex + pagesSize;
        const lowerKeyWords = keywords.toLowerCase();

        // Lọc kết quả tìm kiếm
        const searchResult = data.filter((item) => {
            if (item.first_name.toLowerCase().includes(lowerKeyWords) || item.last_name.toLowerCase().includes(lowerKeyWords) || item.email.toLowerCase().includes(lowerKeyWords)) {
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
    const handleActiveChange = (id,e) => {
        modal.confirm({
            title: 'Status Change',
            content: e ? 'Are you confirm to active this user?' : 'Are you confirm to inactive this user?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                fetch(`http://localhost:3000/users/${id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ active: e })
                    }
                )
                    .then(res => {
                        updateData();
                        message.success('Thay đổi trạng thái thành công')
                    })
            }
        });
    };

    useEffect(() => {
        updateData();
    }, [])

    return (
        <div className='contentBox'>
            {detailPopup && <UserDetail setDetailPopup={setDetailPopup} currentUser={currentUser} />}
            {examsHisPopup && <ExamsHistory setExamsHisPopup={setExamsHisPopup} currentUser={currentUser} />}
            {contextHolder}
            <div className='container'>
                <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered">
                    <caption
                    >Users Management
                        <input id='searching-input' onChange={(e) => { setKeywords(e.target.value) }} type="text" placeholder='Enter searching keyword' />
                    </caption>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
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
                                        <th scope="row">{(currentPage - 1) * 10 + index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.gender == 0 ? 'Female' : 'Male'}</td>
                                        <td className='action-box'>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setDetailPopup(!detailPopup)
                                                setCurrentUser(item)
                                            }}>
                                                info
                                            </span>
                                            <span className="material-symbols-outlined" onClick={() => {
                                                setExamsHisPopup(!examsHisPopup)
                                                setCurrentUser(item)
                                            }}>
                                                history_edu
                                            </span>
                                            <Switch size='small' className='switch' checked={item.active} onChange={(e) => handleActiveChange(item.id, e)} />
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
