
export const getCartItems = () => {
    const cartItems = localStorage.getItem("cartItems") ? 
        JSON.parse(localStorage.getItem("cartItems")) :
        [];
    
        return cartItems;
}

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const setUserInfo = ({
    id = '',
    name = '',
    address = '',
    email = '',
    phoneNumber = '',
    isAdmin = false,
    password = '',
    }) => {
    localStorage.setItem(
        'userInfo',
        JSON.stringify({
        id,
        name,
        address,
        email,
        phoneNumber,
        isAdmin,
        password,
        })
    );
};

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : { name: '', phoneNumber: '', email: '', password: '' };
};

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping')
      ? JSON.parse(localStorage.getItem('shipping'))
      : {
          soNha: '',
          xa: '',
          huyen: '',
          tinh: '',
        };
    return shipping;
};

export const setShipping = ({soNha = '',xa = '',huyen = '',tinh = '',}) => {
    localStorage.setItem(
        'shipping',
        JSON.stringify({ soNha, xa, huyen, tinh })
    );
};
  
export const getPayment = () => {
    const payment = localStorage.getItem('payment')
      ? JSON.parse(localStorage.getItem('payment'))
      : {
          paymentMethod: 'momo',
        };
    return payment;
};

export const setPayment = ({ paymentMethod = 'momo' }) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
};