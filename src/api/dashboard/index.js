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
};

export default DashboardAPI;
