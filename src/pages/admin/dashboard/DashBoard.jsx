import { useEffect , useState } from 'react'
import './dashboard.scss'
import GeneralChart from './components/GeneralChart'
import DataSumary from './components/DataSumary'
import { jwtVerify } from 'jose'

export default function DashBoard() {
    const [adminInfo, setAdminInfo] = useState({})
    const secretKey = new TextEncoder().encode('don tShare')
    useEffect(()=>{
        async function fetchAdminInfo(){
            if (localStorage.getItem('token')) {
                const { payload } = await jwtVerify(localStorage.getItem('token'), secretKey)
                setAdminInfo(payload.result)
            }
        }
        fetchAdminInfo()
    },[])
    return (
        <section className='dashboar-container'>
            <div className='dashboard-welcome'>
                <h1>Xin Chào, {adminInfo.first_name} {adminInfo.last_name}!</h1>
                <span>Hãy xem dữ liệu tổng quan đã cập nhật nhé!</span>
            </div>
            <div className='dashboard-content'>
                <div className='chart-content'>
                    <GeneralChart/>
                </div>
                <DataSumary/>
            </div>
        </section>

    )
}
