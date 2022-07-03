import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Header from "../Header"
import { useAuth } from '../../../services/hooks/use-auth';
import ExitIcon from '../../../assets/images/icons/header/exit_icon.svg'
import AddIcon from '../../../assets/images/icons/home/add_btn.svg'
import "./style.scss"



export default function ProfileMenu() {

  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { first_name, last_name } = user || null

  const logoutHandler = () => logout(() => navigate('/'))

  const menuItems = [
    { name: 'Account', className: 'account-settings-profile-menu__item-link', path: '/account-settings' },
    { name: 'Security & privacy', className: 'account-settings-profile-menu__item-link', path: '/' },
    { name: 'Settings', className: 'account-settings-profile-menu__item-link', path: '/' },
    { name: 'About Hooli', className: 'account-settings-profile-menu__item-link', path: '/' },

  ]

   const getLinkClass = (navData, element) => {
    console.log('navData', navData)
     return navData.isActive ? `${element.className} ${element.className}--active` : element.className
}
  return (
    <>
      <Header/>
      <div className="account-settings">
        <div className="account-settings-profile">
          <div className="account-settings-profile-user">
            <div className="account-settings-profile-user__avatar">
              <div className="account-settings-profile-user__avatar__image">
                <form>
                  <label htmlFor="actual-btn">
                  <input type="file" name="picture" id="actual-btn" hidden/>
                  <img className="editavatar-image" src={AddIcon} alt="edit" />
                  </label>
                </form>
              </div>
            </div>
            <p className="account-settings-profile-user__name">{`${first_name} ${last_name}`}</p>
          </div>
          <hr/>
          <div className="account-settings-profile-menu">
            {
              menuItems.map((item, i) => (
                <div className="account-settings-profile-menu__item" key={i}>
                  <NavLink to={item.path} className={navData => getLinkClass(navData, item)}>{item.name}</NavLink>
                </div>
              ))
            }
            <div className="account-settings-profile-menu__item account-settings-profile-menu__item--exit-link" onClick={() => logoutHandler()}>
              <p className="account-settings-profile-menu__item-link account-settings-profile-menu__item-link--exit-link">Exit</p>
              <img src={ExitIcon} alt='Exit from account' className='account-settings-profile-menu__item-link__icon' />  
            </div>
          </div>
        </div>
      </div>
    </>
  )
}