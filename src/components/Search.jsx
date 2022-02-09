import React, { useRef } from 'react';

const Search = ({setSearch})=> {

    //useRef
    const searchInput = useRef(null);

    //
    const handleSearch = ()=> {
        setSearch(searchInput.current.value)
    };

    return (
        <input type="text" ref={searchInput} placeholder='Buscar' onChange={handleSearch}></input>
    )
};

export default Search;