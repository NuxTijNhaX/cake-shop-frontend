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
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
            <h1>Thông Tin Vận Chuyển</h1>
          </li>
          <li>
            <label for="soNha">Số nhà</label>
            <input type="text" name="soNha" id="soNha" value="${soNha}" />
          </li>
          <li>
            <label for="xa">Xã/Phường</label>
            <input type="text" name="xa" id="xa" value="${xa}" />
          </li>
          <li>
            <label for="huyen">Huyện/Quận</label>
            <input type="text" name="huyen" id="huyen" value="${huyen}" />
          </li>
          <li>
            <label for="tinh">Tỉnh/Thành Phố</label>
            <input type="text" name="tinh" id="tinh" value="${tinh}" />
          </li>

          <li>
            <button type="submit" class="primary">Continue</button>
          </li>        
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;
