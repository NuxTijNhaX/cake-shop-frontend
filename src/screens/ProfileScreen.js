import { getUserInfo, clearUser } from "../localStorage.js";

const ProfileScreen = {
    render: async () => {
        const { name, phoneNumber, email } = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        // const orders = await getMyOrders();
        return `
        <div class="content profile">
        <div class="profile-info">
        <div class="form-container">
        <form id="profile-form">
          <ul class="form-items">
            <li>
              <h1>User Profile</h1>
            </li>
            <li>
              <label for="name">Tên</label>
              <input type="name" name="name" id="name" value="${name}" />
            </li>
            <li>
              <label for="email">Số điện thoại</label>
              <input type="number" name="phone" id="phoneNumber" value="${phoneNumber}" />
            </li>
            <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${email}" />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
            <li>
              <button type="submit" class="primary">Update</button>
            </li>
            <li>
            <button type="button" id="signout-button" >Sign Out</button>
          </li>        
          </ul>
        </form>
      </div>
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