import { register } from "../api.js";
import { setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const RegisterScreen = {
    render: () => {

        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Create Account</h1>
                    </li>
                    <li>
                        <label for="name">Tên</label>
                        <input type="name" name="name" id="name" />
                    </li>
                    <li>
                    <label for="phone">Số Điện Thoại</label>
                    <input type="number" name="phone" id="phone" />
                    </li>
                    <li>
                        <label for="password">Mật khẩu</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <label for="repassword">Nhập lại mật khẩu</label>
                        <input type="password" name="repassword" id="repassword" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Đăng ký</button>
                    </li>
                    <li>
                        <div>
                        Bạn đã có tài khoản?
                        <a href="/#/login">Đăng Nhập</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
    after_render: () => {
        document.getElementById('register-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                // const data = await register({
                //     name: document.getElementById('name').value,
                //     phone: document.getElementById('phone').value,
                //     password: document.getElementById('password').value,
                // });
                // if (data.error) {
                //     showMessage(data.error);
                // } else {
                //     setUserInfo(data);
                //     redirectUser();
                // }
                alert("Chức năng đang được fix\nChưa sử dụng được\n :(((")
        });
    }
}

export default RegisterScreen;