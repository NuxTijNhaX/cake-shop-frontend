import { getCartItems, getShipping, getPayment, cleanCart, getUserInfo } from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { showLoading, hideLoading, showMessage, formatCurrency } from '../utils.js';
import { createOrder } from '../api.js';

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = '/cart';
  }
  const shipping = getShipping();
  if (!shipping.soNha) {
    document.location.hash = '/shipping';
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }

  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const totalPrice = itemsPrice;

  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    totalPrice,
  };
};

const convertCartToPlaceOrderData = (payment) => {
  const userId = getUserInfo().id;
  const orderLines = getCartItems().map(item => {
    return {
      productId: item.id,
      quantity: item.quantity,
      size: item.size
    }
  });

  return {
    userId: userId,
    orderLines: orderLines,
    paymentMethod: getPayment().paymentMethod,
    totalCost: payment,
  };
};

const PlaceOrderScreen = {
  after_render: async () => {
    const total = document.getElementById("total");
    const discount = document.getElementById("discount");
    const toPay = document.getElementById("to-pay");
    const payment = parseFloat(total.textContent.replaceAll('.','').replace('₫', '')) - 
        parseFloat(discount.textContent.replaceAll('.','').replace('₫', ''));
    toPay.textContent = formatCurrency(payment > 0 ? payment : 0);

    document.getElementById('placeorder-button')
      .addEventListener('click', async () => {
        const order = convertCartToPlaceOrderData(payment);
        showLoading();
        const paymentUrl = await createOrder(order);
        hideLoading();
        console.log(paymentUrl.paymentLink);
        if (paymentUrl) {
          if(paymentUrl.paymentLink) {
            window.open(paymentUrl.paymentLink, "_blank");
          }
          showMessage("Đặt hàng thành công!");
          cleanCart();
          document.location.hash = `/cart`;
        } else {
          showMessage("Đặt hàng không thành công!");
        }
      });

    // console.log(JSON.stringify(convertCartToPlaceOrderData(payment)));
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
    <div class="small-container cart-page">
      ${CheckoutSteps.render({step1: true,step2: true,step3: true,step4: true})}
      <div class="order">
        <div class="order-info">

          <div class="center border-card">
            <h2>Vận chuyển</h2>
            <div> Địa chỉ: ${shipping.soNha}, ${shipping.xa}, ${shipping.huyen}, ${shipping.tinh}
            </div>
          </div>

          <div class="center border-card">
            <h2>Thanh toán</h2>
            <div>
              Phương thức thanh toán: ${payment.paymentMethod.toUpperCase()}
            </div>
          </div>

          <div >
            <table>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Kích cỡ</th>
                    <th>Số lượng</th>
                    <th>Tổng cộng</th>
                </tr>
                    ${orderItems.map(item => `
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
                                    </div>
                                </div>
                            </td>
                            <td>
                                <select disabled >
                                    <option value="small">Nhỏ</option>
                                    <option value="medium">Vừa</option>
                                    <option value="large">Lớn</option>
                                </select>
                            </td>
                            <td><input class="quantity-selecter" id="${item.id}" type="number" value=${item.quantity} min="1" disabled></td>
                            <td>${formatCurrency(item.price * item.quantity)}</td>                
                        </tr>
                    `).join("")}

            </table>

            <div class="total-price">
                <table>
                    <tr>
                        <td>Tổng cộng (${orderItems.reduce((a, c) => a + c.quantity, 0)} món)</td>
                        <td id="total">${formatCurrency(orderItems.reduce((a, c) => a + c.price * c.quantity, 0))}</td>
                    </tr>
                    <tr>
                        <td>Giảm giá</td>
                        <td id="discount">${formatCurrency(0)}</td>
                    </tr>
                    <tr>
                        <td>Thành tiền</td>
                        <td id="to-pay"></td>
                    </tr>
                </table>
            </div>

            <div class="center">
                <a id="placeorder-button" style="cursor: pointer" class="btn">Đặt Hàng</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    `;
  },
};

export default PlaceOrderScreen;
