import { getProduct } from "../api.js";
import { parseRequestUrl, formatCurrency, reRender } from "../utils.js";
import { getCartItems, setCartItems } from "../localStorage.js";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(pro => pro.id === item.id);
    if(existItem) {
        if(forceUpdate) {
            cartItems = cartItems.map(x => x.id === existItem.id ? item : x);
        }
    }
    else {
        cartItems = [...cartItems, item];
    }

    setCartItems(cartItems);

    if(forceUpdate) {
        reRender(CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(item => item.id != id));
    if(id === parseRequestUrl().id) {
        document.location.hash = "/cart";
    }
    else {
        reRender(CartScreen);
    }
}

const CartScreen = {
    render: async () => {
        const request = parseRequestUrl();
        if(request.id) {
            const product = await getProduct(request.id);
            addToCart({
                id: product.id,
                name: product.name,
                img: product.photos.split(",")[0],
                price: product.price,
                quantity: 1,
                size: 'Nhỏ',
            });
        }
        let cartItems = getCartItems();
        return `
            <div class="small-container cart-page">
            <table>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Kích cỡ</th>
                    <th>Số lượng</th>
                    <th>Tổng cộng</th>
                </tr>
                    ${cartItems.length === 0 ? 
                        `<div><strong>Giỏ hàng trống!!!</strong></div></br>` :
                        cartItems.map(item => `
                        <tr>
                            <td>
                            <div class="cart-info">
                                <a href="/#/product/${item.id}">
                                    <img src="${item.img}">
                                </a>
                                    <div>
                                    <a href="/#/product/${item.id}">
                                        <p>${item.name}</p>
                                        <small>Giá: ${formatCurrency(item.price)}</small>
                                    </a>
                                        <button class="delete-btn" id="${item.id}">Xóa</button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <select>
                                    <option selected hidden disabled>Chọn size</option>
                                    <option value="nhỏ">Nhỏ</option>
                                    <option value="vừa">Vừa</option>
                                    <option value="lớn">Lớn</option>
                                </select>
                            </td>
                            <td><input class="quantity-selecter" id="${item.id}" type="number" value="${item.quantity}" min="1"></td>
                            <td>${formatCurrency(item.price * item.quantity)}</td>                
                        </tr>
                    `).join("")}

            </table>

            <div class="total-price">
                <table>
                    <tr>
                        <td>Tổng cộng (${cartItems.reduce((a, c) => a + c.quantity, 0)} món)</td>
                        <td id="total">${formatCurrency(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))}</td>
                    </tr>
                    <tr>
                        <td>Giảm giá</td>
                        <td id="discount">${formatCurrency(0)}</td>
                    </tr>
                    <tr>
                        <td>Thành tiền</td>
                        <td id="to-pay" value=0>920.000 VND</td>
                    </tr>
                </table>
            </div>

            <div class="pay-btn">
                <a href="" class="btn">Thanh toán</a>
            </div>
        </div>
        `
    },
    after_render: () => {
        const quantitySelecter = document.getElementsByClassName("quantity-selecter");
        Array.from(quantitySelecter).forEach(qty => {
            qty.addEventListener('change', (e) => {
                const item = getCartItems().find(x => x.id === qty.id);
                addToCart({...item, quantity: Number(e.target.value)}, true)
            })
        });

        const deleteBtns = document.getElementsByClassName("delete-btn");
        Array.from(deleteBtns).forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.id);
            })
        })

        const total = document.getElementById("total");
        const discount = document.getElementById("discount");
        const toPay = document.getElementById("to-pay");
        const payment = parseFloat(total.textContent.replaceAll('.','').replace('₫', '')) - 
            parseFloat(discount.textContent.replaceAll('.','').replace('₫', ''));
        toPay.textContent = formatCurrency(payment > 0 ? payment : 0);
    }
}

export default CartScreen;