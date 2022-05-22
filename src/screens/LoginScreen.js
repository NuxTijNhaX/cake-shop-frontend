import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { redirectUser } from "../utils.js";

const LoginScreen = {
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `
            <div class="form-container">
                <form id="signin-form">
                    <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
                    </li>
                    <li>
                        <label for="phone">Số Điện Thoại</label>
                        <input type="number" name="phone" id="phone" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Signin</button>
                    </li>
                    <li>
                        <div>
                        New User?
                        <a href="/#/register">Create your account </a>
                        </div>
                    </li>
                    </ul>
                </form>
            </div>
        `;
    },
    after_render: async () => {
        document.getElementById('signin-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                // showLoading();
                const data = await signin({
                    phone: document.getElementById('phone').value,
                    password: document.getElementById('password').value,
                });
                // hideLoading();
                if (data.error) {
                    // showMessage(data.error);
                } else {
                    setUserInfo(data);
                    //redirectUser();
                    document.location.hash = '/';
                }
            });
    }
}

export default LoginScreen;