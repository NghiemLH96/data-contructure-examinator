import '../../popup.scss'
export default function QuesDetail({ setDetailBoxDisplay, currentQuestion }) {
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <span class="material-symbols-outlined close-icon" onClick={() => { setDetailBoxDisplay(false) }}>
                    close
                </span>
                <section className='popup-box-content'>
                    <h3>Chi tiết câu hỏi</h3>
                    <div className='popup-box-content-info'>
                        <p><span>ID:</span> {currentQuestion.id}</p>
                        <p><span>Chương:</span> {currentQuestion.chapter}</p>
                    </div>
                    <p><span>Câu hỏi:</span> {currentQuestion.ques}</p>
                    <div className='popup-box-content-info'>
                        <p><span>Đáp án A:</span> {currentQuestion.ans[0].content}{currentQuestion.ans[0].correct ? <span class="material-symbols-outlined correct-icon">check</span> : ''}</p>
                        <p><span>Đáp án B:</span> {currentQuestion.ans[1].content}{currentQuestion.ans[1].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                        <p><span>Đáp án C:</span> {currentQuestion.ans[2].content}{currentQuestion.ans[2].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                        <p><span>Đáp án D:</span> {currentQuestion.ans[3].content}{currentQuestion.ans[3].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                    </div>
                    <div className='popup-box-content-info'>
                        <p><span>Bloom:</span> {
                                                currentQuestion.bloom == "2" ? "Remember" :
                                                currentQuestion.bloom == "1" ? "Understand" : 'Other'
                                            }</p>
                        <p><span>Độ khó:</span> {currentQuestion.level}</p>
                        <p><span>Điểm:</span> {currentQuestion.score}</p>
                    </div>
                </section>
            </section>
        </section>
    )
}
