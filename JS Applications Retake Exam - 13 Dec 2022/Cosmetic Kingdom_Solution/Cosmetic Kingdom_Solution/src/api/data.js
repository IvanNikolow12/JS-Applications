import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

const baseUrl = `https://cosmeticsbuisness-9fc65-default-rtdb.europe-west1.firebasedatabase.app`

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllProducts() {
  const products = await api.get(`${baseUrl}/products.json`);
  return Object.keys(products).map(id => ({id, ...products[id]}));
}

// get listing by id
export async function getProductById(id) {
  const detail = await api.get(`${baseUrl}/products/${id}.json`);
  return {detail, id:id}
}

// create listing
export async function addProduct(product) {
  return await api.post(`${baseUrl}/products.json`, product);
}

// edit listing by id
export async function editProductById(id, product) {
  return await api.put(`${baseUrl}/products/${id}.json`, product);
}

// delete listing by id
export async function deleteProductById(id) {
  return await api.del(`${baseUrl}/products/${id}.json`);
}

export async function buy(productId) {
  return await api.post(`${baseUrl}/products/bought.json`, productId);
}

export async function getTotalBuys(productId) {
  const result = await api.get( `${baseUrl}/products/bought.json`);
  // console.log(result)
  let countBought = []
  try {
    Object.values(result).map(v => {if(v.productId == productId) {
      countBought.push(v.productId)
    }})
    return countBought.length
    // return result
  } catch (err) {
    return result
  }
}

export async function didUserBought(productId, userId) {
  // return await api.get(`${baseUrl}/products/bought${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
