import { endpoint } from "./config.js";

export const getProduct = async (id) => {
    try {
        const response = await fetch(`${endpoint}/Product/${id}`);

        if(!response || !response.ok) {
            throw new Error(response.title);
        }

        return await response.json();
    } catch (error) {
        console.log("getProduct: " + error);
        return { error: error.message };
    }
}

export const getTrendingProduct = async () => {
    try {
        const response = await fetch(`${endpoint}/Product/trending`);

        if(!response || !response.ok) {
            throw new Error(response.title);
        }

        return await response.json();
    } catch (error) {
        console.log("getProduct: " + error);
        return { error: error.message };
    }
}

export const getNewReleaseProduct = async () => {
    try {
        const response = await fetch(`${endpoint}/Product/newProducts`);

        if(!response || !response.ok) {
            throw new Error(response.title);
        }

        return await response.json();
    } catch (error) {
        console.log("getProduct: " + error);
        return { error: error.message };
    }
}

export const getCategory = async () => {
    try {
        const response = await fetch(`${endpoint}/Category`);

        if(!response || !response.ok) {
            throw new Error(response.title);
        }

        return await response.json();
    } catch (error) {
        console.log("getCategory: " + error);
        return { error: error.message };
    }
}

export const getProducts = async (search = "", category = "", orderBy = "", page = 1) => {
    try {
        const response = await fetch(`${endpoint}/Product?search=${search}&category=${category}&orderBy=${orderBy}&page=${page}`);

        if(!response || !response.ok) {
            throw new Error(response.title);
        }

        return await response.json();
    } catch (error) {
        console.log("getProduct: " + error);
        return { error: error.message };
    }
}

export const signin = async ({ phone, password }) => {
    try {
        const response = await fetch(`${endpoint}/User?phone=${phone}&password=${password}`);

        if(response.status !== 200) {
            throw new Error("Tài khoản hoặc mật khẩu không đúng");
        }

        return await response.json();
    } 
    catch (err) {
        console.log(err);
        return { error: err.message };
    }
};
  
  export const register = async ({ name, phone, password }) => {
    try {
        const response = await fetch(`${endpoint}/User/register?name=${name}&phone=${phone}&password=${password}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        });
    
        if (response.status !== 200) {
                throw new Error("Lỗi");
        }
        return await response.text();
    }
    catch (err) {
        console.log(err);
        return { error: err.message };
    }
};

export const createOrder = async (order) => {
    const response = await fetch(`${endpoint}/Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(order)
    });
    // .then(res => res.text())
    // .then(text => console.log(text))
    // .catch(res => console.log(res));

    return await response.json();
};