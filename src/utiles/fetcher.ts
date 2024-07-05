import Axios, { AxiosRequestConfig } from "axios";
 import { useContext } from "react";
 import { getAccessToken } from "./helpers";
import { AuthContext } from "./authContext";


export const fetcher = async (config: AxiosRequestConfig) => {
  // const authContext:any = useContext(AuthContext);
  // console.log( 'cauthin fetcher',authContext )

  const { url, method, data, headers } = config;

  let token = '';
  try {
    const fetchToken = JSON.parse(await getAccessToken('authState')); // Retrieve and parse the token
    console.log(fetchToken.accessToken, 'fetchToken');
    if (fetchToken?.accessToken) {
      token = fetchToken.accessToken;
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
  }


  return await Axios.request({
    baseURL: `https://crud-opration-client.onrender.com/`,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: token ? `${token}` : '',
      // Authorization: `Bearer ${token}`,
      ...config?.headers,
      ...headers,
    },
  });
};