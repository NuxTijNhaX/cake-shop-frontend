import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import AllProductScreen from "./screens/AllProductsScreen.js";
import CartScreen from "./screens/CartScreen.js";
import CategoryScreen from "./screens/CategoryScreen.js";
import SearchingScreen from "./screens/SearchingScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/products/:id/:verb': AllProductScreen,
    '/searching/:id/:verb/:sub': SearchingScreen,
    '/category/:id/:verb/:sub': CategoryScreen,
    '/cart': CartScreen,
    '/cart/:id': CartScreen,
    '/login': LoginScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
}

const router = async () => {
    scrollToTop();
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') + 
        (request.verb ? `/:verb` : '') + 
        (request.sub ? `/:sub` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();
    await Header.after_render();

    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    await screen.after_render();

    const footer = document.getElementById("footer-container");
    footer.innerHTML = await Footer.render();

    hideLoading();
}

const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);