import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { selectToken, selectStaff } from './LoginSlice';
import CategoriesSection from '../components/CategoriesSection'
import { addCategoryAsync, getCategoriesAsync, selectCategories,deleteCategoryAsync } from './CategoriesSlice'
import { useSelector, useDispatch } from 'react-redux';
import '../Styles/CategoryStyles'

const Categories = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isStaff = useSelector(selectStaff)
  const myCategories = useSelector(selectCategories)
  const [categDesc, setCategDesc] = useState("")
  const clean = (state) => {
    setCategDesc("")
  }
  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [myCategories.length])

  return (
    <div>
      {/* IF USER IS NOT STAFF */}
      {isStaff === false ?
        <div className='mainContainer'>
          <div className='catImgAnim' style={{
            backgroundImage: `url("https://hips.hearstapps.com/del.h-cdn.co/assets/16/29/1468949845-gettyimages-513626475.jpg")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
            <CategoriesSection ></CategoriesSection>
          </div>
        </div>

        // IF USER IS STAFF
        :
        
        <div>
          <nav className="bg-dark navbar-dark navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
              <h3>Add Category</h3>
            </div>
          </nav>

          <div className="form">
            <div className="form-body">
              <div className="desc">
                <label className="form__label" htmlFor='categDesc'>Category Description </label>
                <input type="text" placeholder="name" value={categDesc} onChange={(e) => setCategDesc(e.target.value)} required />
              </div>
              <div className="footer">
                <Link to="#"><button onClick={() => dispatch(addCategoryAsync({ token: token, categDesc: categDesc }), clean())}>add</button></Link>
              </div>
            </div>
          </div>
          <div >
            <nav className="bg-dark navbar-dark navbar">
              <div className="row col-12 d-flex justify-content-center text-white">
                <h3>Delete Category</h3>
              </div>
            </nav>
            <div className='form'>
              {/* list of categories to delete */}
              {myCategories.map(cat => <div>{cat.cat_desc}&nbsp;&nbsp;
              <button onClick={() => dispatch(deleteCategoryAsync({ catID: cat.catg_id, token: token }))}  >Delete</button> </div>)}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Categories