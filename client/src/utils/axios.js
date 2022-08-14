import axios from 'axios';

const instance = axios.create({ baseURL: process.env.API });

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance;
