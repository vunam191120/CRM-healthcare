import axiosClient from '../axios.config';

const articleAPI = {
  getAll() {
    const url = `/article`;
    return axiosClient.get(url);
  },
  getOne(article_id) {
    const url = `/article/${article_id}`;
    return axiosClient.get(url);
  },
  getAuthor(author_id) {
    const url = `/article/author/${author_id}`;
    return axiosClient.get(url);
  },
  create(article) {
    const url = `/article/`;
    return axiosClient.post(url, article);
  },
  update(article) {
    const url = `/article`;
    return axiosClient.put(url, article);
  },
  delete(article_id) {
    const url = `/article/${article_id}`;
    return axiosClient.delete(url);
  },
};

export default articleAPI;
