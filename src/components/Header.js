import { getCategory } from "../api.js";
import { getUserInfo } from "../localStorage.js";

const Header = {
    render: async () => {
        const { name } = getUserInfo();
        const catetory = await getCategory();

        return `
        <div class="navbar">
            <div class="logo">
                <a href="/#/"><img src="images/logo.png" width="250px"></a>
            </div>  
            <form id="search-bar" style="background: white;">
                <input id="search-string" type="search" class="search-data" placeholder="Tìm sản phẩm mong muốn..." style="color: black;">
                <button id="search-btn" type="submit" class="fa fa-search"></button>
            </form>
            <nav>
                <ul class="menu" id="MenuItems">
                    <li><a href="/#/">Trang chủ</a></li>
                    <li class="dropdown">
                        <a class="dropbtn" href="/#/products/1/default">Sản phẩm</a>
                        <div class="dropdown-content">
                            ${catetory ? 
                                catetory.map(cate => (`<a href="/#/category/${cate.name.split(' ')[0].toLowerCase()}/1/default">${cate.name}</a>`)).join('') : ``}
                        </div>  
                    </li>
                    <li>${name ? `<a href="/#/profile">Xin chào, </br>${name}</a>` : `<a href="/#/login">Đăng nhập</a></li>`}
                </ul>
            </nav>
            <img id="search-toggle" src="images/search.png" class="search-icon">
            <a class="cart-btn" href="/#/cart"><img src="images/cart.png" width="30px" height="30px"></a>
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