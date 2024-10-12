import React from 'react'
import './footer.scss'

export default function Footer() {
    return (
        <footer>
            <section className="section1__container">
                <section className="section1__content">
                    <h6>Về chúng tôi</h6>
                    <hr />
                    <ul className="aboutUs">
                        <li>HIU EDU</li>
                        <li>Policy</li>
                        <li>Extend Policy</li>
                        <li>Term of use</li>
                        <li>Privacy Policy</li>
                        <li>Recruitment</li>
                    </ul>
                </section>
                <section className="section1__content">
                    <h6>Liên hệ</h6>
                    <hr />
                    <ul>
                        <li>Địa chỉ : 215 Điện Biên Phủ, Quận Bình Thạnh, tp.Hồ Chí Minh</li>
                        <li>(+84) 123 456 789</li>
                        <li>Giờ làm việc : T2-T6 7h00 - 21h00</li>
                        <li>Email:cskh@kusaedu.com</li>
                    </ul>
                </section>
                <section className="section1__content">
                    <h6>Social</h6>
                    <hr />
                    <ul className="social">
                        <li><i className="fa fa-facebook-official"></i></li>
                        <li><i className="fa fa-youtube-square"></i></li>
                        <li><i className="fa fa-instagram"></i></li>
                        <li><i className="fa fa-twitter"></i></li>
                    </ul>
                    <section className="supportBox">
                        <button>Đăng ký tư vấn</button>
                        <input type="text" placeholder="Nhập email của bạn" />
                    </section>
                </section>
            </section>
            <hr />
            <section className="section2__container">
                <p>Copyright &copy; 2024 HIUEDUCATION</p>
                <p>Mã số thuế 0123456, do Sở Kế hoạch và Đầu tư TP.Hồ Chí Minh cấp ngày 09/09/2024</p>
            </section>
        </footer>
    )
}
