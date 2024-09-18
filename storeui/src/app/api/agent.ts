import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/routes";

axios.defaults.baseURL="http://localhost:5000/";
axios.defaults.withCredentials=true;
const sleep=()=>new Promise(resolve=>setTimeout(resolve,500));
axios.interceptors.response.use(async response=>{
    await sleep();
    return response
},(error:AxiosError)=>{
    const{data,status}=error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const validationErrors:string[]=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        validationErrors.push(data.errors[key])
                    }
                }
                throw validationErrors.flat();
            }
            router.navigate('/not-found');
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const ResponseBody=(response:AxiosResponse)=>response.data;
const requests={
    get:(url:string)=>axios.get(url).then(ResponseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(ResponseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(ResponseBody),
    delete:(url:string)=>axios.delete(url).then(ResponseBody),
}
const Catalog={
    list:()=>requests.get('GetProducts'),
    details:(id:number)=>requests.get(`GetProduct/id/${id}`)
}

const TestErrors={
    get400Error:()=>requests.get('Exception/not-found'),
    get401Error:()=>requests.get('Exception/un-authorized'),
    get404Error:()=>requests.get('Exception/bad-request'),
    get500Error:()=>requests.get('Exception/server-error'),
    getValidationError:()=>requests.get('Exception/validation-error')
}

const Basket={
    getBasket:()=>requests.get('/Basket'),
    AddItemstoCart:(productId:number,quantity=1)=>requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    RemoveItemFromCart:(productId:number,quantity=1)=>requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}
const agent={
    Catalog,TestErrors,Basket
}

export default agent;