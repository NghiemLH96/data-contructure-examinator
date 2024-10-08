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
            message.success('Add new question successfully')
            console.log(res);
            
            setAddNewBoxDisplay(false)
          })
          .catch(err => {
            message.error('Add new question failed')
            console.log(err);
            
          })
    }
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <form action="" className='popup-box-content' onSubmit={(event) => { addNewHandle(event) }}>
                    <h3>Add New</h3>
                    <div className='input-group'>
                        <div className='input-group-box'>
                            <div>
                                <label htmlFor="chapter">Chapter : <sup>*</sup></label>
                                <select name="chapter" id="" defaultValue={""} className={error.chapter ? 'error' : ''} onChange={() => { setError({ ...error, chapter: null }) }}>
                                    <option value='' disabled>Select chapter</option>
                                    <option value='1'>Chapter 1 :....</option>
                                    <option value='2'>Chapter 2 :....</option>
                                    <option value='3'>Chapter 3 :....</option>
                                    <option value='4'>Chapter 4 :....</option>
                                    <option value='5'>Chapter 5 :....</option>
                                    <option value='6'>Chapter 6 :....</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bloom">Bloom :<sup>*</sup></label>
                                <select name="bloom" id="" defaultValue={""} className={error.bloom ? 'error' : ''} onChange={() => { setError({ ...error, bloom: null }) }}>
                                    <option value="" disabled>Select Bloom</option>
                                    <option value='1'>Understand</option>
                                    <option value='2'>Remember</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="question">Question :<sup>*</sup></label>
                            <input name='question' type="text" maxLength={300} placeholder='Max 300 characters' className={error.question ? 'error' : ''} onChange={() => { setError({ ...error, question: null }) }} />
                        </div>
                        <div className='input-group-box'>
                            <div className='ans-box'>
                                <label htmlFor="answer">Answer 1 :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer1' type="text" maxLength={50} placeholder='Max 50 characters' className={error.answer1 ? 'error' : ''} onChange={() => { setError({ ...error, answer1: null }) }} />
                                    <input name='correct' type="radio" value={1} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} /></div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Answer 2 :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer2' type="text" maxLength={50} placeholder='Max 50 characters' className={error.answer2 ? 'error' : ''} onChange={() => { setError({ ...error, answer2: null }) }} />
                                    <input name='correct' type="radio" value={2} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Answer 3 :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer3' type="text" maxLength={50} placeholder='Max 50 characters' className={error.answer3 ? 'error' : ''} onChange={() => { setError({ ...error, answer3: null }) }} />
                                    <input name='correct' type="radio" value={4} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                            <div className='ans-box'>
                                <label htmlFor="answer">Answer 4 :<sup>*</sup></label>
                                <div className='ans-input-box'>
                                    <input name='answer4' type="text" maxLength={50} placeholder='Max 50 characters' className={error.answer4 ? 'error' : ''} onChange={() => { setError({ ...error, answer4: null }) }} />
                                    <input name='correct' type="radio" value={4} className={error.correct ? 'add-ans-radio error' : 'add-ans-radio'} onChange={() => { setError({ ...error, correct: null }) }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="score">Score :<sup>*</sup></label>
                            <input type="number" name='score' min={0} max={4} placeholder='Max 4 points' className={error.score ? 'error' : ''} onChange={() => { setError({ ...error, score: null }) }} />
                        </div>
                        <div>
                            <label htmlFor="level">Level :<sup>*</sup></label>
                            <input type="number" name='level' min={0} max={4} placeholder='Max 4 level' className={error.level ? 'error' : ''} onChange={() => { setError({ ...error, level: null }) }} />
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
                            <button type="submit" className="btn btn-dark">Submit</button>
                            <button className="btn btn-danger" onClick={() => { setAddNewBoxDisplay(false) }}>Cancel</button>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}
