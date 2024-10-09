import { useEffect, useState } from 'react'
import { Column } from '@ant-design/charts';

export default function GeneralChart() {
    const [chapter1Count, setChapter1Count] = useState([])
    const [chapter2Count, setChapter2Count] = useState([])
    const [chapter3Count, setChapter3Count] = useState([])
    const [chapter4Count, setChapter4Count] = useState([])
    const [chapter5Count, setChapter5Count] = useState([])
    const [chapter6Count, setChapter6Count] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/questions")
            .then((res) => res.json())
            .then((data) => {
                setChapter1Count(data.filter((question) => question.chapter === 1).length)
                setChapter2Count(data.filter((question) => question.chapter === 2).length)
                setChapter3Count(data.filter((question) => question.chapter === 3).length)
                setChapter4Count(data.filter((question) => question.chapter === 4).length)
                setChapter5Count(data.filter((question) => question.chapter === 5).length)
                setChapter6Count(data.filter((question) => question.chapter === 6).length)
            })
    }, [])

    const data = [
        { chapter: 'Chương 1', questions: chapter1Count },
        { chapter: 'Chương 2', questions: chapter2Count },
        { chapter: 'Chương 3', questions: chapter3Count },
        { chapter: 'Chương 4', questions: chapter4Count },
        { chapter: 'Chương 5', questions: chapter5Count },
        { chapter: 'Chương 6', questions: chapter6Count },
    ];

    const config = {
        data,
        xField: 'chapter',
        yField: 'questions',
        style: {
            maxWidth: 50,
        },
        title:{
            title: 'CÂU HỎI THEO CHƯƠNG',
            style: {
                fontSize: 50,
                fontWeight: 'bold',
            }
        },
        colorField: 'chapter',
        scale: { color: { palette: "viridis" } },
    };
    return (
        <Column {...config} />
    )
}
