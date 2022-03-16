import { useEffect } from "react";

const useGetDetails = ( itemId, setItemDetails, setColors, setStorages )=> {
    //Api
    const API = 'https://front-test-api.herokuapp.com/api/product';

    useEffect(()=> {
        let itemDetailsFetch = async ()=> {
            try {
                let res = await fetch(`${API}/${itemId}`)
                let data = await res.json()
                setItemDetails(data)
                setColors(data.options.colors)
                setStorages(data.options.storages)
                // console.log(data.options.colors)
            } catch (error) {
                console.error(error)
            }
        };
        if(itemId && setItemDetails && setColors && setStorages) {
            itemDetailsFetch();
        }
    }, [itemId])

}

export default useGetDetails;