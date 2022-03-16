import {useEffect} from 'react';
import { timeMorethanHour } from '../utils/utils';


//Api
const API = "https://front-test-api.herokuapp.com/api/product";

const useGetList = ( setList )=> {
    useEffect(()=> {
        let listFetch = async ()=> {
            try {
                let res = await fetch(API)
                let data = await res.json()
                setList(data)
                localStorage.setItem("list", JSON.stringify(data))
            } catch (error) {
                console.error(error)
            }
        }

        //elimina la persistencia de datos despues de 1 hora
        if(!localStorage.getItem("time")) {
            listFetch()
            localStorage.setItem("time", Date.now())
        }else {
            if(timeMorethanHour(localStorage.getItem("time"))) {
                localStorage.clear()
                listFetch()  
                localStorage.setItem("time", Date.now())
            }else {
                setList(JSON.parse(localStorage.getItem("list")))
            }
        }

    }, [setList]);
}

export default useGetList;