import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Search from '../components/Search';
import '../assets/styles/listView.css';

const ListView = ()=> {

    //Api
    const API = "https://front-test-api.herokuapp.com/api/product";

    //state
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("")

    //context
    const { setItemId } = useContext(AppContext);

    //navigate
    let navigate = useNavigate();

    //useEffect
    useEffect(()=> {
        let listFetch = async ()=> {
            try {
                let res = await fetch(API)
                let data = await res.json()
                setList(data)
            } catch (error) {
                console.error(error)
            }
        }
        listFetch()
    }, []);
    //filter items
    const filterItems = list.filter( item => {
            return item.brand.toLowerCase().includes(search.toLowerCase()) || item.model.toLowerCase().includes(search.toLowerCase())
    });

    return(
        <>
        <main className='container_list'>
            <div className='container_list_head'>
                <h5>List View</h5>
                <Search className="container_list_input" setSearch={setSearch} />
            </div>
            <section className='container_list_item'>
                <ul>
                    {
                    filterItems.map((item, id) => {
                        return (
                            <li key={id}>
                                <div className="card" 
                                     onClick={()=> {
                                        navigate('/details')
                                        setItemId(item.id)
                                        localStorage.clear("itemId")
                                        localStorage.setItem("itemId", item.id)
                                     }}>
                                    <img src={item.imgUrl} className="card-img-top" alt="imagen" />
                                    <div className="card-body">
                                        <ul className='container_list_details'>
                                            {item.brand && <li>{item.brand}</li>}
                                            {item.model && <li>{item.model}</li>}
                                            {item.price && <li>€ {item.price}</li>}
                                        </ul>
                                    </div>
                                </div>
                            </li> 
                        )
                    })
                    }
                </ul>
            </section>
        </main>
        </>
    )
};

export default ListView;