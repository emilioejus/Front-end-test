import React, {useState, useContext, useRef} from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import useGetDetails from '../hooks/useGetDetails';

const Details = ()=> {
    
    //Api
    const API_ADD_ITEM = 'https://front-test-api.herokuapp.com/api/cart';

    //useState
    const [itemDetails, setItemDetails] = useState("");
    const [colors, setColors] = useState([]);
    const [storages, setStorages] = useState([]);

    //context
    const { count, setCount } = useContext(AppContext);
    const itemId = useParams().id;

    //useRef
    const colorCode = useRef(null); //devuelve el codigo del color
    const storagesCode = useRef(null); //devuelve el codigo del storages

    //devuelve un array con todos los valores deseados de los detalles
    const description = Object.entries(itemDetails).filter(([key, value]) => {
        let details = ['brand', 'model', 'price', 'cpu', 'ram', 'os','displayResolution', 'battery', 'primaryCamera', 'secondaryCmera', 'dimentions', 'weight']
        return details.includes(key)
    });

    //cargador de imagen
    const imgUpLoader = ()=> {
        if(itemDetails.imgUrl) {
            return ( <img src={itemDetails.imgUrl} alt="cell phone"/> )
        }else {
            return (
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )
        }
    };

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
    useGetDetails(itemId, setItemDetails, setColors, setStorages)

    return (
        <main className='d-flex flex-column p-4 flex-xl-row justify-content-evenly'>
            <Link className='pb-3' to="/">Back to details</Link>
            <section className='pb-3 d-flex justify-content-center col-xl-3 mt-5'>
                {imgUpLoader()}
            </section>
            <aside className=''>
                {/* *****Aqui se despliega la lista de description del item***** */}
                <section className='pb-3 mt-5'>
                    <h6>Description</h6>
                    <ul className='list-group'>
                        {
                         description.map((array, id) => (<li className='list-group-item' key={id}>{`${array[0]}: ${array[1]}`}</li>))
                        }
                    </ul>
                </section>
                <section className=''>
                    <select ref={colorCode} className='form-select mb-3'>
                        <option >Select the color</option>
                        {
                         colors.map(obj => (<option key={obj.name} value={obj.code}>{obj.name}</option>))  
                        }
                    </select>
                    <select ref={storagesCode} className='form-select mb-3'>
                        <option >Select storage</option>
                        {
                         storages.map(obj => (<option key={obj.name} value={obj.code}>{obj.name}</option>))  
                        }
                    </select>
                    <button 
                        type='button' 
                        className='btn btn-dark'
                        onClick={add}>add</button>
                </section>
            </aside>
        </main>
    )
};

export default Details;