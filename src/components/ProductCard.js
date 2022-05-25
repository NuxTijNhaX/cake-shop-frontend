import { formatCurrency } from "../utils.js";

const ProductCard = {
    render: (product) => {
        if (!product.id) {
            return '<div></div>';
        }

        return `
            <a href="/#/product/${product.id}">
                <div class="col-4">
                    <img src="${product.photos}" alt=${(product.name).replace(' ', '-').toLowerCase().trim()}>
                    <h4>${product.name.length>25?product.name.slice(0,20)+"...":product.name}</h4>
                    <div class="rating">
                        ${generateRatingStar(product.avgRating)}
                    </div>
                    <p>${formatCurrency(product.price)}</p>
                </div>
            </a>
        `;
    }
};

const generateRatingStar = (star) => {
    let script = "";
    const starIcon = `<i class="fa fa-star"></i>`;
    const starHalfIcon = `<i class="fa fa-star-half-o"></i>`;
    const starZeroIcon = `<i class="fa fa-star-o"></i>`;

    let fullStar = Math.floor(star);
    for (let index = 0; index < fullStar; index++) {
        script += starIcon;
    }

    if((star - fullStar) != 0) {
        script += starHalfIcon;
        fullStar++;
    }

    for (let index = 0; index < 5 - fullStar; index++) {
        script += starZeroIcon;
    }

    return script;
};

export default ProductCard;