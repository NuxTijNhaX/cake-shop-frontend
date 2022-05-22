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

        return await response.json();
    } 
    catch (err) {
        console.log(err);
        return { error: err.message };
    }
};
  
  export const register = async ({ name, email, password }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/users/register`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          name,
          email,
          password,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};