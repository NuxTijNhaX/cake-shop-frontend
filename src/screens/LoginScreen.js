import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const LoginScreen = {
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `
        <div class="login-container">
            <h1 class="label-login">Đăng nhập</h1>
            <form id="signin-form">
                <div class="form-container">
                    <label for="phone">Số điện thoại</label>
                    <input type="number" name="phone" id="phone" placeholder="Nhập Số điện thoại . . . . . " required/>
                    <label for="password">Mật khẩu</label>
                    <input type="password" name="password" id="password" placeholder="Nhập mật khẩu . . . . . " required/>            
                    <button type="submit" class="primary">Đăng nhập</button>
                    <label>
                        <div style="font-size:14px">
                            Chưa có tài khoản? &nbsp;
                            <a href="/#/register">Đăng ký</a>
                        </div>
                    </label>
                </div>
                <div class="form-container" style="background-color:#f1f1f1">
                    <a href="/#/"><button type="button" class="cancelbtn">Thoát</button></a>
                    <span class="psw"><a href="/#/register">Quên mật khẩu?</a></span>
                </div>
            </form>
        </div>
        `;
    },
    after_render: async () => {
        document.getElementById('signin-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                showLoading();
                const data = await signin({
                    phone: document.getElementById('phone').value,
                    password: document.getElementById('password').value,
                });
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    setUserInfo(data);
                    redirectUser();
                }
            });
    }
}

export default LoginScreen;