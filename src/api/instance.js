import axios from 'axios';
import { applyInterceptors } from './interceptor';

//.env로 숨긴 url 주소 (backend 주소 <-> front 주소)

// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
console.log('✅ BASE_URL:', BASE_URL);
const defaultInstance = axios.create({
  baseURL: BASE_URL,
});
applyInterceptors(defaultInstance);

const companyInstance = axios.create(defaultInstance.defaults);
companyInstance.defaults.baseURL += '/company';
// applyInterceptors(companyInstance);

const memberInstance = axios.create(defaultInstance.defaults);
memberInstance.defaults.baseURL += '/members';
// applyInterceptors(memberInstance);

const planInstance = axios.create(defaultInstance.defaults);
planInstance.defaults.baseURL += '/plans';
// applyInterceptors(planInstance);

const commentInstance = axios.create(defaultInstance.defaults);
commentInstance.defaults.baseURL += '/comments';
// applyInterceptors(commentInstance);

export { defaultInstance, companyInstance, memberInstance, planInstance, commentInstance };