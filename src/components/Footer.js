
const Footer = {
    render: () => {
        return `
            <div class="container">
                <div class="row">
                    <div class="footer-col-1">
                        <img src="images/logo.png" width="100%">
                        <div class="app-logo">
                            <a href="https://www.facebook.com/" target="_blank">
                                <img src="images/logo-fb.png">
                            </a>
                            <a href="https://www.instagram.com/" target="_blank">
                                <img src="images/logo-ins.png">
                            </a>
                        </div>
                    </div>
                    <div class="footer-col-2">
                        <h3>Danh sách thành viên</h3>
                        <ul>
                            <li>Bùi Thúy Anh</li>
                            <li>Nguyễn Phan Trọng Hiếu</li>
                            <li>Nguyễn Thiện Nhã</li>
                            <li>Nguyễn Trương Thị Như Quỳnh</li>
                            <li>Nguyễn Hoàng Yến</li>
                        </ul>
                    </div>
                    <div class="footer-col-3">
                        <div class="row">
                            <img
                                src="https://bizweb.dktcdn.net/100/333/744/themes/839470/assets/fot_icon_1.svg?1650249630446">
                            <div class="detail-content-footer">
                                <span class="title-footer">Hỗ trợ khách hàng</span>
                                <span class="subtitle-footer">Hỗ trợ 24/7</span>
                            </div>
                        </div>
                        <div class="row">
                            <img
                                src="https://bizweb.dktcdn.net/100/333/744/themes/839470/assets/fot_icon_2.svg?1650249630446">
                            <div class="detail-content-footer">
                                <span class="title-footer">Giao hàng miễn phí</span>
                                <span class="subtitle-footer">Tất cả đơn hàng dưới 10KM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Footer;