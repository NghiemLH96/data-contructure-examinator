import { useState } from 'react'
import '../../popup.scss'
import { message } from 'antd'

export default function AddNewPopup({ setAddNewBoxDisplay }) {
    const [error, setError] = useState({
        chapter: null,
        bloom: null,
        question: null,
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        score: null,
        level: null,
        correct: null
    })

    const validate = (e) => {
        let result = true;
        let initError = { ...error }
        if (e.target.chapter.value == '') {
            initError.chapter = 'Chapter is required';
            result = false;
        }
        if (e.target.bloom.value == '') {
            initError.bloom = 'Bloom is required';
            result = false;
        }
        if (e.target.question.value == '') {
            initError.question = "Question can't be empty";
            result = false;
        }
        if (e.target.answer1.value == '') {
            initError.answer1 = "Answer 1 can't be empty";
            result = false;
        }
        if (e.target.answer2.value == '') {
            initError.answer2 = "Answer 2 can't be empty";
            result = false;
        }
        if (e.target.answer3.value == '') {
            initError.answer3 = "Answer 3 can't be empty";
            result = false;
        }
        if (e.target.answer4.value == '') {
            initError.answer4 = "Answer 4 can't be empty";
            result = false;
        }
        if (e.target.score.value == '') {
            initError.score = "Score is required";
            result = false;
        }
        if (e.target.level.value == '') {
            initError.level = "Level is required";
            result = false;
        }
        if (e.target.correct.value == '') {
            initError.correct = "Please choose the correct answer";
            result = false;
        }
        if (!result) {
            setError(initError)
        }
        return result;
    };

    const addNewHandle = (e) => {
        e.preventDefault();
        if(!validate(e)){
            return;
        }
        
        const newQuestion = {
            id:String(Math.ceil(Math.random()*1000000)),
            ques: e.target.question.value,
            ans:[
                {
                    correct: e.target.correct.value == "1" ? true : false,
                    content: e.target.answer1.value,
                },{
                    correct: e.target.correct.value == "2" ? true : false,
                    content: e.target.answer2.value,
                },{
                    correct: e.target.correct.value == "3" ? true : false,
                    content: e.target.answer3.value,
                },{
                    correct: e.target.correct.value == "4" ? true : false,
                    content: e.target.answer4.value,
                },
            ],
            score: Number(e.target.score.value),
            bloom: Number(e.target.bloom.value),
            chapter: Number(e.target.chapter.value),
            level: Number(e.target.level.value),
        }
        fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuestion)
          })
          .then(res => {
            message.success('Thêm mới câu hỏi thành công')
            console.log(res);
            
            setAddNewBoxDisplay(false)
          })
          .catch(err => {
            message.error('Thêm mới câu hỏi thất bại')
            console.log(err);
            
          })
    }
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <form action="" className='popup-box-content' onSubmit={(event) => { addNewHandle(event) }}>
                    <h3>Thêm mới câu hỏi</h3>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="chapter">Chương : <sup>*</sup></label>
                                <select name="chapter" id="" defaultValue={""} className={error.chapter ? 'error' : ''} onChange={() => { setError({ ...error, chapter: null }) }}>
                                    <option value='' disabled>Chọn chương</option>
                                    <option value='1'>Chương 1 :Tổng quan</option>
                                    <option value='2'>Chương 2 :Sắp xếp và tìm kiếm</option>
                                    <option value='3'>Chương 3 :Danh sách liên kết</option>
                                    <option value='4'>Chương 4 :Ngăn xếp và hàng đợi</option>
                                    <option value='5'>Chương 5 :Cây</option>
                                    <option value='6'>Chương 6 :Bảng băm</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bloom">Bloom :<sup>*</sup></label>
                                <select name="bloom" id="" defaultValue={""} className={error.bloom ? 'error' : ''} onChange={() => { setError({ ...error, bloom: null }) }}>
                                    <option value="" disabled>Bloom</option>
                                    <option value='1'>Hiểu</option>
                                    <option value='2'>Nhớ</option>
                                    <option value='3'>Vận dụng</option>
                                    <option value='4'>Phân tích</option>
                                    <option value='5'>Khác</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="question">Câu hỏi :<sup>*</sup></label>
                            <input name='question' type="text" maxLength={300} placeholder='Tối đa 300 ký tự' className={error.question ? 'error' : ''} onChange={() => { setError({ ...error, question: null }) }} />
                        </div>
                        <div className='input-group-box'>
                            <div className='ans-box'>
                                <label htmlFor="answer">Đáp án A :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer1' type="text" placeholder='Nhập đáp án' className={error.answer1 ? 'error' : ''} onChange={() => { setError({ ...error, answer1: null }) }} />
                                    <input name='correct' type="radio" value={1} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} /></div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Đáp án B :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer2' type="text" placeholder='Nhập đáp án' className={error.answer2 ? 'error' : ''} onChange={() => { setError({ ...error, answer2: null }) }} />
                                    <input name='correct' type="radio" value={2} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Đáp án C :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer3' type="text" placeholder='Nhập đáp án' className={error.answer3 ? 'error' : ''} onChange={() => { setError({ ...error, answer3: null }) }} />
                                    <input name='correct' type="radio" value={4} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Đáp án D :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer4' type="text" placeholder='Nhập đáp án' className={error.answer4 ? 'error' : ''} onChange={() => { setError({ ...error, answer4: null }) }} />
                                    <input name='correct' type="radio" value={4} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="score">Điểm :<sup>*</sup></label>
                            <input type="number" name='score' min={0} max={4} placeholder='Tối đa 4 điểm' className={error.score ? 'error' : ''} onChange={() => { setError({ ...error, score: null }) }} />
                        </div>
                        <div>
                            <label htmlFor="level">Độ khó :<sup>*</sup></label>
                            <input type="number" name='level' min={0} max={4} placeholder='Tối đa 4 mức' className={error.level ? 'error' : ''} onChange={() => { setError({ ...error, level: null }) }} />
                        </div>
                        <div className='error-msg-box'>
                        {error.chapter && <p className='error-msg'>{error.chapter}</p>}
                        {error.bloom && <p className='error-msg'>{error.bloom}</p>}
                        {error.question && <p className='error-msg'>{error.question}</p>}
                        {(error.answer1 || error.answer2 || error.answer3 || error.answer4) && <p className='error-msg'>Answer is required</p>}
                        {error.score && <p className='error-msg'>{error.score}</p>}
                        {error.level && <p className='error-msg'>{error.level}</p>}
                        {error.correct && <p className='error-msg'>{error.correct}</p>}
                        </div>
                        <div className='btn-box'>
                            <button type="submit" className="btn btn-dark">Thêm</button>
                            <button className="btn btn-danger" onClick={() => { setAddNewBoxDisplay(false) }}>Hủy</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}
