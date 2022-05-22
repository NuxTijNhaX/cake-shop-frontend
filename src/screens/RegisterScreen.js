
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
                <label for="name">Name</label>
                <input type="name" name="name" id="name" />
            </li>
            <li>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </li>
            <li>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </li>
            <li>
                <label for="repassword">Re-Enter Password</label>
                <input type="password" name="repassword" id="repassword" />
            </li>
            <li>
                <button type="submit" class="primary">Register</button>
            </li>
            <li>
                <div>
                Already have an account?
                <a href="/#/login">Sign-In </a>
                </div>
            </li>
            </ul>
        </form>
        </div>
        `;
    },
    after_render: () => {
        
    }
}

export default RegisterScreen;