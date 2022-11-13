import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import { selectProducts, getProductsAsync } from './ProductsSlice'
import '../Styles/CardStyle.css'
import SearchProd from './SearchProd';


const AllDrinks = () => {
    const dispatch = useDispatch();
    let params = useParams();
    let id = params.id;
    const allProds = useSelector(selectProducts);
    useEffect(() => {
        dispatch(getProductsAsync([]))
    }, [allProds.length])
    return (
        <div>
            <SearchProd></SearchProd>
            
        </div>
    )
}

export default AllDrinks