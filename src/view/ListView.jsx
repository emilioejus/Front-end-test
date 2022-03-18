import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import useGetList from '../hooks/useGetList';

const ListView = ()=> {

    //state
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("")

    //navigate
    let navigate = useNavigate();

    useGetList(setList)

    const filterItems = list.filter( item => {
            return item.brand.toLowerCase().includes(search.toLowerCase()) || 
                   item.model.toLowerCase().includes(search.toLowerCase())
    });

    return(
        <>
        <main className='container'>
            <div className='row mt-3 me-2 ms-2'>
                <h5 className='cols'>List View</h5>
                <div className=" cols d-flex justify-content-end pt-2 pb-2 mb-2">
                    <Search setSearch={setSearch} />
                </div>
            </div>
            <div className='container'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-xl-4'>
                    {
                        filterItems.map(item => {
                            return (
                                <div className='col p-4 mt-3' key={item.id}>
                                    <div  
                                         onClick={()=> {
                                            navigate(`/details/${item.id}`)
                                         }}>
                                        <img src={item.imgUrl} className="card-img-top" alt="imagen" role="button" />
                                        <div className="card-body">
                                            <ul className='list-group list-group-flush'>
                                                {item.brand && <li className='list-group-item'>{`Brand: ${item.brand}`}</li>}
                                                {item.model && <li className='list-group-item'>{`Model: ${item.model}`}</li>}
                                                {item.price && <li className='list-group-item'>{`Price: €${item.price}`}</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
        </>
    )
};

export default ListView;