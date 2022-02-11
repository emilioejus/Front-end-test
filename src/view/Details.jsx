import React, {useState, useEffect, useContext, useRef} from 'react';
import { AppContext } from '../context/AppContext';
import '../assets/styles/details.css'

const Details = ()=> {
    
    //Api
    const API = 'https://front-test-api.herokuapp.com/api/product';
    const API_ADD_ITEM = 'https://front-test-api.herokuapp.com/api/cart';

    //useState
    const [itemDetails, setItemDetails] = useState("");
    const [colors, setColors] = useState([]);
    const [storages, setStorages] = useState([]);

    //context
    const { itemId, count, setCount } = useContext(AppContext);

    //useRef
    const colorCode = useRef(null); //devuelve el codigo del color
    const storagesCode = useRef(null); //devuelve el codigo del storages

    //devuelve un array con todos los valores deseados de los detalles
    const description = Object.entries(itemDetails).filter(([key, value]) => {
        let details = ['brand', 'model', 'price', 'cpu', 'ram', 'os','displayResolution', 'battery', 'primaryCamera', 'secondaryCmera', 'dimentions', 'weight']
        return details.includes(key)
    });

    //agregar item
    let add = async ()=> {
        try {
            let res = await fetch(API_ADD_ITEM, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: itemId, 
                    colorCode: colorCode.current.value, 
                    storageCode: storagesCode.current.value
                })
            })
            let data = await res.json()
            localStorage.removeItem("count")
            setCount(parseInt(count) + parseInt(data.count))
            localStorage.setItem("count", (parseInt(count) + parseInt(data.count)) )
            
        } catch (error) {
            console.error(error)
        }
    };

    //useEffet 
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
        itemDetailsFetch();
    }, [itemId])
    // console.log(itemDetails)

    return (
        <main className='container_details'>
            <div className='container_datails_head'>
                <h3>DETAILS VIEW</h3>
            </div>
            <div className='container_details_main'>
                <section className='container_details_img'>
                    <img src={itemDetails.imgUrl} alt="" />
                </section>
                <aside className='container_details_aside'>
                    {/* *****Aqui se despliega la lista de description del item***** */}
                    <section className='container_details_description'>
                        <h6>Description</h6>
                        <ul>
                            {
                             description.map((array, id) => (<li key={id}>{`${array[0]}: ${array[1]}`}</li>))
                            }
                        </ul>
                    </section>
                    <section className='container_details_actions'>
                    <select ref={colorCode} className="form-select">
                        <option >Select the color</option>
                        {
                         colors.map(obj => (<option key={obj.name} value={obj.code}>{obj.name}</option>))  
                        }
                    </select>
                    <select ref={storagesCode} className="form-select">
                        <option >Select storage</option>
                        {
                         storages.map(obj => (<option key={obj.name} value={obj.code}>{obj.name}</option>))  
                        }
                    </select>
                    <button 
                        type="button" 
                        className="btn btn-dark"
                        onClick={add}>add</button>
                    </section>
                </aside>
            </div>
        </main>
    )
};

export default Details;