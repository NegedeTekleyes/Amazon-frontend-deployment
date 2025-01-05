import React from 'react'
import {categoryInfo} from './catagoryFullInfo'
import CategoryCard from './CategoryCard'
import Styles from './catagory.module.css'
const Category = () => {
  return (
      <section className={Styles.catagory_container}>
          {
              categoryInfo.map((infos, index) => {
             return   <CategoryCard key={index} data={infos} />
              })
        }  


   </section>
  )
}

export default Category
