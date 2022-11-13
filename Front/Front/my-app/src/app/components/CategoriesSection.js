import React, { useEffect } from 'react'
import { OutlineButton } from '../Styles/Globalstyles';
import { selectCategories, getCategoriesAsync } from '../pages/CategoriesSlice'
import { useSelector, useDispatch } from 'react-redux';

import {
    CategoryTitle,
    CategoryTabContainer,
    CategoryBtn,
} from '../Styles/CategoryStyles'

import MyCard from './MyCard';

const CategoriesSection = () => {
    const StatusCategs = useSelector(selectCategories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoriesAsync())
    }, [])
    return (
        // this section displays all the available categories for filtering the products
        <div style={{ padding: "2px" }}>
                    <CategoryTitle style={{
                        mixBlendMode: "screen",
                        fontSize: "80px",
                        textAlign: "center",
                        backgroundColor: "white",
                        width: "800px",
                        margin: "20px auto"
                    }}>Choose Category</CategoryTitle>
                        <CategoryTabContainer >
                            {StatusCategs.map((item) => (
                                <div className='animate__animated animate__lightSpeedInRight animate__slower'>
                                    <CategoryBtn to={`/categories/${item.catg_id}`}>
                                        <OutlineButton  big bigFont bigRadius>{item.cat_desc} </OutlineButton>
                                    </CategoryBtn>
                                    &nbsp;&nbsp;
                                </div>
                            ))}
                        </CategoryTabContainer>
                        {/* here the card is shown already filtered by category id  */}
            <MyCard ></MyCard>
        </div>
    )
}

export default CategoriesSection