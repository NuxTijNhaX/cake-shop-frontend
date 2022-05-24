import { getUserInfo, clearUser } from "../localStorage.js";

const ProfileScreen = {
    render: async () => {
        const { name, phoneNumber, email } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        // const orders = await getMyOrders();
        return `
        <div class="login-container">
                <h1 class="label-login">Thông tin cá nhân</h1>
                <form id="profile-form">
                    <div class="form-container">
                        <label for="name">Tên người dùng</label>
                        <input type="name" name="name" id="name" value="${name}" />
                        <label for="email">Số điện thoại</label>
                        <input type="number" name="phone" id="phone" value="${phoneNumber}" />
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}" />
                        <label for="password">Mật khẩu</label>
                        <input type="password" name="password" id="password" placeholder="Nhập mật khẩu . . . . . " />
                        <button type="submit" class="primary">Cập nhập</button>
                    </div>
                    <div class="form-container" style="background-color:#f1f1f1">
                        <a href="/#/"><button type="button" class="cancelbtn">Thoát</button></a>
                        <a href="/#/" style="float:right"><button class="logoutbtn" type="button" id="signout-button" >Đăng xuất</button></a>
                    </div>
                </form>
            </div>
        `;
    },
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/';
          });
          
          document
            .getElementById('profile-form')
            .addEventListener('submit', async (e) => {
              e.preventDefault();
              showLoading();
              const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
              });
              hideLoading();
              if (data.error) {
                showMessage(data.error);
              } else {
                setUserInfo(data);
                document.location.hash = '/';
              }
            });
    }
}

export default ProfileScreen;