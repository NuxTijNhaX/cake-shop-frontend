import { getUserInfo, getShipping, setShipping } from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps.js';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
          soNha: document.getElementById('soNha').value,
          xa: document.getElementById('xa').value,
          huyen: document.getElementById('huyen').value,
          tinh: document.getElementById('tinh').value,
        });
        document.location.hash = '/payment';
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { soNha, xa, huyen, tinh } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="shipping__container">
            <div class="container__child shipping__thumbnail">
                <img src="images/shipping.png">
            </div>
            <div class="container__child shipping__form">
                <form id="shipping-form">
                    <h2>Thông Tin Vận Chuyển</h2>
                    <div class="form-group">
                        <label for="soNha">Số nhà</label>
                        <input class="form-control" type="text" name="soNha" id="soNha" value="${soNha}" placeholder="279 Nguyễn Tri Phương" />
                    </div>
                    <div class="form-group">
                        <label for="xa">Xã/Phường</label>
                        <input class="form-control" type="text" name="xa" id="xa" value="${xa}" placeholder="Phường 5" />
                    </div>
                    <div class="form-group">
                        <label for="huyen">Huyện/Quận</label>
                        <input class="form-control" type="text" name="huyen" id="huyen" value="${huyen}" placeholder="Quận 10" />
                    </div>
                    <div class="form-group">
                        <label for="tinh">Tỉnh/Thành Phố</label>
                        <input class="form-control" type="text" name="tinh" id="tinh" value="${tinh}" placeholder="Thành phố Hồ Chí Minh" />
                    </div>
                    <a href="/#/cart"><button type="button" class="btn cancel--shipping">Quay lại</button></a>
                    <input class="btn btn--shipping" type="submit" value="Tiếp tục" style="float:right"/>
                </form>  
            </div>
        </div>
    `;
  },
};
export default ShippingScreen;
