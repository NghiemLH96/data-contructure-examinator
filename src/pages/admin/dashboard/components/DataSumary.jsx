import { useState , useEffect } from 'react'

export default function DataSumary() {
    const [usersSumary, setUsersSumary] = useState(0)
    const [examsSumary, setExamsSumary] = useState(0)
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => {
                setUsersSumary(data.length)
            })

            fetch("http://localhost:3000/exams")
            .then((res) => res.json())
            .then((data) => {
                setExamsSumary(data.length)
            })
    }, [])
    return (
        <div className='data-content'>
            <div className='data-content-item user'>
                <b>Users</b><br />
                <span className='data-content-item-number'>{usersSumary} <i>Pads</i></span>
            </div>
            <div className='data-content-item exam'>
                <b>Exams</b><br />
                <span className='data-content-item-number'>{examsSumary} <i>Tests</i></span>
            </div>
        </div>
    )
}
