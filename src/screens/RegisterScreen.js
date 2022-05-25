import { register } from "../api.js";
import { setUserInfo } from "../localStorage.js";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils.js";

const RegisterScreen = {
    render: () => {

        return `
        <div class="login-container">
                <h1 class="label-login">Đăng ký</h1>
                <form id="register-form">
                    <div class="form-container">
                        <label for="name">Tên người dùng</label>
                        <input type="name" name="name" id="name" placeholder="Nhập tên . . . . . " required/>
                        <label for="phone">Số điện thoại</label>
                        <input type="number" name="phone" id="phone" placeholder="Nhập Số điện thoại . . . . . " required/>
                        <label for="password">Mật khẩu</label>
                        <input type="password" name="password" id="password" placeholder="Nhập mật khẩu . . . . . " required/> 
                        <label for="repassword">Xác nhận mật khẩu</label>
                        <input type="password" name="repassword" id="repassword" placeholder="Nhập lại mật khẩu . . . . . " required/>
                        <button type="submit" class="primary">Đăng ký</button>
                        <label>
                            <div style="font-size:14px">
                                Bạn đã có tài khoản? &nbsp;
                                <a href="/#/login">Đăng Nhập</a>
                            </div>
                        </label>
                    </div>
                    <div class="form-container" style="background-color:#f1f1f1" >
                        <a href="/#/"><button type="submit" class="cancelbtn">Thoát</button></a>
                        <span class="psw"><a href="/#/register">Quên mật khẩu?</a></span>
                    </div>                 
                </form>
            </div>
        `;
    },
    after_render: () => {
        document.getElementById('register-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const phoneNumber = document.getElementById('phone').value;
                const password = document.getElementById('password').value;
                const repassword = document.getElementById('repassword').value;

                if(password !== repassword) {
                    showMessage("Mật khẩu và xác nhận mật khẩu không trùng khớp.");
                    return;
                }

                const data = await register({ name, phoneNumber, password });
                if (data.error) {
                    showMessage(data.error);
                } else {
                    if(data == "Đăng ký thành công") {
                        setUserInfo({ name, phoneNumber, password });
                        redirectUser();
                        
                    }
                    showMessage(data);
                }
        });
    }
}

export default RegisterScreen;