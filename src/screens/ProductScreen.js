import { getProduct, getProducts } from "../api.js";
import { parseRequestUrl, formatCurrency } from "../utils.js";

import ProductCard from '../components/ProductCard.js';

const ProductScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        const otherProducts = await getProducts();
        // if(product.error) {
        //     return `<div>Lỗi: ${product.error}</div>`
        // }
        
        return `
            <div class="small-container single-product">
            <div class="row">
                <div class="col-2">
                    <img src="${product.photos.split(',')[0]}" width="475px" height="475px" id="ProductImg">

                    <div class="small-img-row">
                        <div class="small-img-col">
                            <img src="${product.photos.split(',')[0]}" width="100%" class="small-img">
                        </div>
                        <div class="small-img-col">
                            <img src="${product.photos.split(',')[1] ? product.photos.split(',')[1] : `images/no-image.png`}" width="100%" class="small-img">
                        </div>
                        <div class="small-img-col">
                            <img src="${product.photos.split(',')[2] ? product.photos.split(',')[1] : `images/no-image.png`}" width="100%" class="small-img">
                        </div>
                        <div class="small-img-col">
                            <img src="${product.photos.split(',')[3] ? product.photos.split(',')[1] : `images/no-image.png`}" width="100%" class="small-img">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <h1>${product.name}</h1>
                    <h4>${formatCurrency(product.price)}</h4>
                    <select disabled>
                        <option selected>Nhỏ</option>
                        <option>Vừa</option>
                        <option>Lớn</option>
                    </select>
                    <input type="number" value="1" min="1" disabled>
                    <a class="btn" id="add-cart-button">Thêm vào giỏ hàng</a>
                    <h3>Thông tin chi tiết <i class="fa fa-indent"></i></h3>
                    <br>
                    <p>${product.description}</p>
                </div>
            </div>
        </div>

        <!--------- title --------->

        <div class="small-container">
            <div class="row row-2">
                <h2>Mẫu bánh liên quan</h2>
                <a href="/#/products/1/default">Xem thêm</a>
            </div>
        </div>

        <!--------- other products --------->

        <div class="small-container">
            <div class="row">
                ${otherProducts.map(product => ProductCard.render(product)).join('')}
            </div>
        </div>`;
    },
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-cart-button").addEventListener("click", () => {
            document.location.hash = `/cart/${request.id}`;          
        });
    }
};

export default ProductScreen;