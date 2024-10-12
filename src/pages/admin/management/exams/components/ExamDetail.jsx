import {useState, useEffect} from 'react'

export default function ExamDetail({setDetailPopup,currentExam}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [renderQuestions, setRenderQuestions] = useState([]);
    const pagesSize = 10;
    
    const getQuestionList = () => {
        fetch('http://localhost:3000/questions')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setQuestionList(data);
            })
            .catch(error => console.error('Fetch error:', error));
    };
    
    useEffect(() => {
        getQuestionList();
    }, []);
    
    useEffect(() => {
        const quesList = currentExam?.questions || [];
        const startIndex = (currentPage - 1) * pagesSize;
        const endIndex = startIndex + pagesSize;
    
        const examQuestions = quesList
            .map(item => questionList.find(question => question.id === item))
            .filter(question => question !== undefined);
    
        let renderData = examQuestions.slice(startIndex, endIndex);
    
        if (renderData.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    
        const count = Math.ceil(examQuestions.length / pagesSize);
        const pageElements = Array.from({ length: count }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <a onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                }} className="page-link" href="#">{i + 1}</a>
            </li>
        ));
    
        setRenderQuestions(renderData);
        setPageCount(pageElements);
    }, [currentPage, questionList, currentExam]);

    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <span className="material-symbols-outlined close-icon" onClick={() => { setDetailPopup(false) }}>
                    close
                </span>
                <table className="table table-striped table-hover table-sm caption-top align-middle table-bordered">
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
                            renderQuestions.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{(currentPage - 1) * pagesSize + index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.ques}</td>
                                    <td>{item.bloom == "1" ? "Hiểu" :
                                        item.bloom == "2" ? "Nhớ" :
                                        item.bloom == "3" ? "Vận dụng":
                                        item.bloom == "4" ? "Phân tích": 'Other'}</td>
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
