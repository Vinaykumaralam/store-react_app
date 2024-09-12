import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL="http://localhost:5000/";
axios.interceptors.response.use(response=>{
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
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
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

const agent={
    Catalog,TestErrors
}

export default agent;