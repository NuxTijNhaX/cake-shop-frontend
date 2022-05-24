import ProductCard from '../components/ProductCard.js';
import { getTrendingProduct, getNewReleaseProduct } from '../api.js'

const HomeScreen = {
    render: async () => {
        const trendingProducts = await getTrendingProduct();
        const newProducts = await getNewReleaseProduct();

        return `
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <h1>Chào mừng đến với<br>Tiệm bánh 101!</h1>
                        <p>Chúng tôi mang đến những chiếc bánh kem ngon nhất với giá tốt nhất<br>Hãy đặt hàng ngay hôm
                            nay...</p>
                        <a href="/#/products/1/default" class="btn">Khám phá ngay &#8594;</a>
                    </div>
                    <div class="col-2">
                        <img src="images/banner.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="small-container">
            <h2 class="title">Mẫu bánh đang HOT</h2>
            <div class="row" id="products-trending">
                ${trendingProducts.map(product => ProductCard.render(product)).join('')}
            </div>

            <h2 class="title">Mẫu mới ra mắt</h2>
            <div class="row" id="new-release">
                ${newProducts.map(product => ProductCard.render(product)).join('')}
            </div>
        </div>
        `
    },
    after_render: () => {
        
    }
};

export default HomeScreen;