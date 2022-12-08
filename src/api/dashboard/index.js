import axiosClient from '../axios.config';

const DashboardAPI = {
  getCount(role) {
    const url = `patient/dashboard/count/${role}`;
    return axiosClient.get(url);
  },
  getAdminChart() {
    const url = `patient/dashboard/chart/admin`;
    return axiosClient.get(url);
  },
  getBOChart() {
    const url = `patient/dashboard/chart/bo`;
    return axiosClient.get(url);
  },
  getMarketingChart() {
    const url = `patient/dashboard/chart/marketing`;
    return axiosClient.get(url);
  },
  getSaleChart() {
    const url = `patient/dashboard/chart/sale`;
    return axiosClient.get(url);
  },
  getSalePie() {
    const url = `patient/dashboard/pie/sale`;
    return axiosClient.get(url);
  },
  getSupportPie() {
    const url = `patient/dashboard/pie/support`;
    return axiosClient.get(url);
  },
};

export default DashboardAPI;
