import axiosClient from '../axios.config';

const PaymentAPI = {
  getPayments(clinic_id) {
    const url = `/clinic/payment/${clinic_id}`;
    return axiosClient.get(url);
  },
  getPayment(clinic_id, payment_id) {
    const url = `/clinic/payment/${clinic_id}/${payment_id}`;
    return axiosClient.get(url);
  },
};

export default PaymentAPI;
