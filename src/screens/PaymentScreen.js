import { getUserInfo, setPayment } from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps.js';

const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();

        const paymentMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        ).value;

        setPayment({ paymentMethod });
        
        document.location.hash = '/placeorder';
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
    <div class="shipping__container">
            <div class="container__child method__thumbnail">
                <img src="images/shipping.png">
            </div>
            <div class="container__child payment__form">
                <form id="payment-form">
                    <h2>Phương Thức Thanh Toán</h2>
                    <div class="method-container">
                        <label for="momo" >
                            <input type="radio" name="payment-method" id="momo" value="MoMo" checked />
                            <span>MoMo</span>
                        </label>
                        <label for="cod" >
                            <input type="radio" name="payment-method" id="cod" value="cod" />
                            <span>Thanh toán khi nhận hàng</span>
                        </label>
                    </div>
                    <a href="/#/shipping"><button type="button" class="btn cancel--shipping">Quay lại</button></a>
                    <input class="btn btn--shipping" type="submit" value="Tiếp tục" style="float:right"/>
                </form>
            </div>
        </div>
    `;
  },
};
export default PaymentScreen;
