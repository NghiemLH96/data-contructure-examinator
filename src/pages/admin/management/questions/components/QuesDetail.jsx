import '../../popup.scss'
export default function QuesDetail({ setDetailBoxDisplay, currentQuestion }) {
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <span class="material-symbols-outlined close-icon" onClick={() => { setDetailBoxDisplay(false) }}>
                    close
                </span>
                <section className='popup-box-content'>
                    <h3>Question Detail</h3>
                    <div className='popup-box-content-info'>
                        <p><span>ID:</span> {currentQuestion.id}</p>
                        <p><span>Chapter:</span> {currentQuestion.chapter}</p>
                    </div>
                    <p><span>Question:</span> {currentQuestion.ques}</p>
                    <div className='popup-box-content-info'>
                        <p><span>Answer A:</span> {currentQuestion.ans[0].content}{currentQuestion.ans[0].correct ? <span class="material-symbols-outlined correct-icon">check</span> : ''}</p>
                        <p><span>Answer B:</span> {currentQuestion.ans[1].content}{currentQuestion.ans[1].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                        <p><span>Answer C:</span> {currentQuestion.ans[2].content}{currentQuestion.ans[2].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                        <p><span>Answer D:</span> {currentQuestion.ans[3].content}{currentQuestion.ans[3].correct ? <span class="material-symbols-outlined  correct-icon">check</span> : ''}</p>
                    </div>
                    <div className='popup-box-content-info'>
                        <p><span>Bloom:</span> {
                                                currentQuestion.bloom == "2" ? "Remember" :
                                                currentQuestion.bloom == "1" ? "Understand" : 'Other'
                                            }</p>
                        <p><span>Level:</span> {currentQuestion.level}</p>
                    </div>
                </section>
            </section>
        </section>
    )
}
