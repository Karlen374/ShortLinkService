import { useHttp } from 'src/hooks/useHttp';
import { IUserData } from 'src/types/IUserData';

const useShortLinkServices = () => {
  const _apiBase = 'http://79.143.31.216';
  const { request } = useHttp();

  const signInUser = async (data:IUserData) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    const res = await fetch(`${_apiBase}/login`, {
      method: 'POST',
      body: formData,
    });
    const registeredUserData = await res.json();
    return { ...registeredUserData, username: data.username };
  };

  const signUpUser = async (data:IUserData) => {
    const responseLink = `${_apiBase}/register?username=${data.username}&password=${data.password}`;
    const res = await request(responseLink, 'POST');
    return res;
  };
  const createShortUrl = async (token:string, url:string) => {
    const res = await request(`${_apiBase}/squeeze?link=${url}`, 'POST', null, { Authorization: `Bearer ${token}` });
    return res;
  };
  type IOrderTypes = {
    order: 'asc_counter' | 'asc_short' | 'asc_target' | 'desc_short' | 'desc_target' | 'desc_counter';
  }
  const getShortUrls = async (offset:number, limit:number, token:string, order:IOrderTypes | null) => {
    if (!order) {
      const responseLink = `${_apiBase}/statistics?offset=${offset}&limit=${limit}`;
      const res = await request(responseLink, 'GET', null, { Authorization: `Bearer ${token}` });
      return res;
    } else {
      const responseLink = `${_apiBase}/statistics?order=${order}&offset=${offset}&limit=${limit}`;
      const res = await request(responseLink, 'GET', null, { Authorization: `Bearer ${token}` });
      return res;
    }
  };

  return {
    signInUser,
    signUpUser,
    createShortUrl,
    getShortUrls,
  };
};

export default useShortLinkServices;
