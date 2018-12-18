import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://udemy-react-cours.firebaseio.com/'
});

export default axiosInstance;
