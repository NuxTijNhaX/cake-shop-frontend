
const Header = {
    render: () => {
        return `
            <div class="navbar">
                <div class="logo">
                    <a href="/#/"><img src="images/logo.png" width="225px"></a>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><a href="/#/">Trang chủ</a></li>
                        <li><a href="/#/products/1">Sản phẩm</a></li>
                        <li><a href="/#/signin">Đăng nhập</a></li>
                    </ul>
                </nav>
                <a href="/#/cart"><img src="images/cart.png" width="30px" height="30px"></a>
                <img src="images/menu.png" class="menu-icon" onclick="menuToggle()">
            </div>
        `;
    }
}

export default Header;