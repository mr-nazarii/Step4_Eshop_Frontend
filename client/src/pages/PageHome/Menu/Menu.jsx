import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const Menu = () => {
  return (
    <div className={styles.menu}>
      <NavLink to='/catalog'>New lingerie</NavLink>
      <NavLink to='/catalog'>Sales</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/catalog'>Catalogue</NavLink>
      <NavLink to='#contact'>Contact</NavLink>
    </div>
  )
}

export default Menu
