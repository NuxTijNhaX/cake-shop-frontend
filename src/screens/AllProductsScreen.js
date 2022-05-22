import ProductCard from "../components/ProductCard.js";
import { getProducts } from "../api.js";
import { parseRequestUrl } from "../utils.js";

const AllProductScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const products = await getProducts(request.id);

        return `
            <div class="small-container">

            <div class="row row-2">
                <h1>Tất cả bánh</h1>
                <select>
                    <option selected hidden disabled >Mặc định</option>
                    <option>Theo giá</option>
                    <option>Theo giá giảm</option>
                    <option>Theo đánh giá</option>
                    <option>Theo đánh giá giảm</option>
                    <option>Theo lượt mua</option>
                    <option>Theo lượt mua giảm</option>
                </select>
            </div>

            <div class="row all-products-list">
                ${products.map(product => ProductCard.render(product)).join('')}
            </div>

            <div class="page-btn">
                <span>&#8592;</span>
                <a class="pagination active-pagination" href="/#/products/1" value=1><span>1</span></a>
                <a class="pagination" href="/#/products/2" value=2><span>2</span></a>
                <a class="pagination" href="/#/products/3" value=3><span>3</span></a>
                <a class="pagination" href="/#/products/4" value=4><span>4</span></a>
                <a class="pagination" href="/#/products/5" value=5><span>5</span></a>
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
        })
    }
}

export default AllProductScreen;