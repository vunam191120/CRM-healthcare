import axiosClient from '../axios.config';

const PaymentAPI = {
  getPayments(clinic_id) {
    const url = `/clinic/payment/${clinic_id}`;
    return axiosClient.get(url);
  },
  getPayment(payment_id) {
    const url = `/patient/payment/patient/${payment_id}`;
    return axiosClient.get(url);
  },
  addPayment(newPayment) {
    const url = `/patient/payment/patient`;
    return axiosClient.post(url, newPayment);
  },
  updatePayment(newPayment) {
    const url = `/patient/payment/patient`;
    return axiosClient.put(url, newPayment);
  },
  getDetails(payment_id) {
    const url = `/patient/detail/payment/${payment_id}`;
    return axiosClient.get(url);
  },
  getDetail(detail_id) {
    const url = `/patient/detail/patient/${detail_id}`;
    return axiosClient.get(url);
  },
  addDetail(newDetail) {
    const url = `/patient/detail/patient`;
    return axiosClient.post(url, newDetail);
  },
  updateDetail(detail_id, newDetail) {
    const url = `/patient/detail/patient/${detail_id}`;
    return axiosClient.put(url, newDetail);
  },
  deleteDetail(detail_id) {
    const url = `/patient/detail/patient/${detail_id}`;
    return axiosClient.delete(url);
  },
};

export default PaymentAPI;
