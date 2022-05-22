import ProductCard from "../components/ProductCard.js";
import { getProducts } from "../api.js";
import { parseRequestUrl } from "../utils.js";

const SearchingScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const products = await getProducts(request.id, "", request.sub, request.verb);

        return `
            <div class="small-container">

            <div class="row row-2">
                <h2>Kết quả tìm kiếm cho "${request.id.replaceAll('%20', ' ')}"</h2>
                <select id="order-by">
                    <option selected value="default">Mặc định</option>
                    <option value="price_asc">Theo giá tăng</option>
                    <option value="price_desc">Theo giá giảm</option>
                    <option value="rating_asc">Theo đánh giá tăng</option>
                    <option value="rating_desc">Theo đánh giá giảm</option>
                    <option value="numOfPur_asc">Theo lượt mua tăng</option>
                    <option value="numOfPur_desc">Theo lượt mua giảm</option>
                </select>
            </div>

            <div class="row all-products-list">
                ${products.map(product => ProductCard.render(product)).join('')}
            </div>

            <div class="page-btn">
                <span>&#8592;</span>
                ${products.length > 0 ? Pagination.render(window.location.hash, products[0].totalPage) : ''}
                <span>&#8594;</span>
            </div>
        </div>
        `
    },
    after_render: () => {
        const request = parseRequestUrl();
        const paginations = document.getElementsByClassName("pagination");
        Array.from(paginations).forEach(pagination => {
            if(pagination.getAttribute("value") === request.id) {
                pagination.classList.add("active-pagination");
            } 
            else {
                pagination.classList.remove("active-pagination");
            }
        });

        const orderBy = document.getElementById("order-by");
        orderBy.addEventListener('change', () => {
            window.location.hash = '/' + [request.resource, request.id, request.verb, orderBy.value].join('/');
        });
        orderBy.value = request.sub;
    }
};

const Pagination = {
    render: (href, range) => {
        let script = "";
        let hrefArr = href.split("/");
        for (let index = 1; index <= range; index++) {
            let link = [hrefArr[0], hrefArr[1], hrefArr[2], index, hrefArr[4]].join("/");
            script += `<a class="pagination" href="/${link}" value=${index}><span>${index}</span></a>`;
        }

        return script;
    }
}

export default SearchingScreen;