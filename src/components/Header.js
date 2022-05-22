
const Header = {
    render: () => {
        return `
            <div class="navbar">
                <div class="logo">
                    <a href="/#/"><img src="images/logo.png" width="225px"></a>
                </div>
                <div id="search-bar" style="background: white;">
                    <input id="search-string" type="search" class="search-data" placeholder="Tìm sản phẩm mong muốn..." style="color: black;" required>
                    <button id="search-btn" class="fa fa-search"></button>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><a href="/#/">Trang chủ</a></li>
                        <li><a href="/#/products/1/default">Sản phẩm</a></li>
                        <li><a href="/#/login">Đăng nhập</a></li>
                    </ul>
                </nav>
                <img id="search-toggle" src="images/search.png" class="search-icon">
                <a href="/#/cart"><img src="images/cart.png" width="30px" height="30px"></a>
                <img id="menu-toggle" src="images/menu.png" class="menu-icon">
            </div>
        `;
    },
    after_render: () => {
        const MenuItems = document.getElementById("MenuItems");
        const toggle = document.getElementById("menu-toggle");
        MenuItems.style.maxHeight = "0px";
        toggle.addEventListener('click', () => {
            if (MenuItems.style.maxHeight == "0px") {
                MenuItems.style.maxHeight = "200px";
            }
            else {
                MenuItems.style.maxHeight = "0px";
            }
        });

        const searchToggle = document.getElementById("search-toggle");
        const searchBar = document.getElementById("search-bar");
        searchToggle.addEventListener('click', () => {
            if (searchBar.classList.contains("active")) {
                searchBar.classList.remove("active");
            }
            else {
                searchBar.classList.add("active");
            }
        });

        const searchBtn = document.getElementById("search-btn");
        const searchStr = document.getElementById("search-string");
        searchBtn.addEventListener('click', () => {
            let str = searchStr.value.trim();
            if(str) {
                window.location.hash = `/searching/${str}/1/default`;
            } 
            else {
                alert("Vui lòng nhập dữ liệu!!!")
            }
        });
    }
}

export default Header;