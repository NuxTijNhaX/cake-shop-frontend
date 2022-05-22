import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import { parseRequestUrl } from "./utils.js";
import AllProductScreen from "./screens/AllProductsScreen.js";
import CartScreen from "./screens/CartScreen.js";
import CategoryScreen from "./screens/CategoryScreen.js";

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/products': AllProductScreen,
    '/products/:id': AllProductScreen,
    '/category/:name': CategoryScreen,
    '/cart': CartScreen,
    '/cart/:id': CartScreen,
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') + 
        (request.verb ? `/${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();

    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    await screen.after_render();

    const footer = document.getElementById("footer-container");
    footer.innerHTML = await Footer.render();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);