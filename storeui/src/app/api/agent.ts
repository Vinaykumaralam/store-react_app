import axios, { AxiosResponse } from "axios";
import { get } from "http";

axios.defaults.baseURL="http://localhost:5000/";

const ResponseBody=(response:AxiosResponse)=>response.data;
const requests={
    get:(url:string)=>axios.get(url).then(ResponseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(ResponseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(ResponseBody),
    delete:(url:string)=>axios.delete(url).then(ResponseBody),
}
const Catalog={
    list:()=>requests.get('products'),
    details:(id:number)=>requests.get(`products/${id}`)
}