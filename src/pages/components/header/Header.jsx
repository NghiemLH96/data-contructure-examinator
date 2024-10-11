import { useEffect, useState } from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import { Modal } from 'antd';
import { jwtVerify } from 'jose';

export default function Header() {
    const secretKey = new TextEncoder().encode('don tShare');
    const navigator = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const checkLogin = async () => {
        const token = localStorage.getItem('token-user');
        if (token) {
            try {
                const { payload } = await jwtVerify(token, secretKey);
                if (payload.result) {
                    setUserInfo(payload.result);
                    return true;
                }
            } catch (err) {
                console.error("Token verification failed:", err);
            }
        }
        setUserInfo(null);
        return false;
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const handleLogout = () => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn đăng xuất?',
            onOk: () => {
                localStorage.removeItem('token-user');
                setUserInfo(null);
            },
        });
    };

    return (
        <header>
            <nav className="header-nav">
                <img onClick={()=>{navigator("/")}} id='logo' src={Logo} alt="Logo" />
                <ul className="header-nav-account">
                    <li>
                        <a id="admin-nav-link" className="nav-btn" onClick={() => { navigator("/admin-auth") }}>For administrator</a>
                    </li>
                    {
                        userInfo ? 
                            <div className='accInfoBox'>
                                <img src={userInfo.avatar} alt="" />
                                <li><a className="nav-btn" onClick={handleLogout}>Log out</a></li>
                            </div>
                         :
                            <div  className='accInfoBox'>
                                <li><a className="nav-btn" onClick={() => { navigator("/auth") }}>Log in</a></li>
                                <li>
                                    <a id="signup-nav-link" className="nav-btn" onClick={() => { navigator("/enroll") }}>Sign up</a>
                                </li>
                            </div>
                    }

                </ul>
            </nav>
        </header>
    );
}
