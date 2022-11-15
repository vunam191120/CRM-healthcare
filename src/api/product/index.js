import axiosClient from '../axios.config';

const ProductAPI = {
  getAll() {
    const url = `/patient/product`;
    return axiosClient.get(url);
  },
  getOne(product_id) {
    const url = `/patient/product/${product_id}`;
    return axiosClient.get(url);
  },
  getSupplier() {
    const url = `/patient/supplier`;
    return axiosClient.get(url);
  },
  add(newProduct) {
    const url = `/patient/product`;
    return axiosClient.post(url, newProduct);
  },
  update(newProduct) {
    const url = `/patient/product`;
    return axiosClient.put(url, newProduct);
  },
  delete(product_id) {
    const url = `/patient/product/${product_id}`;
    return axiosClient.delete(url);
  },
};

export default ProductAPI;
