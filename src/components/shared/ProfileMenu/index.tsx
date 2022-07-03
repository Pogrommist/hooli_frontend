import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
// import { useForm } from "react-hook-form";
import Header from "../Header"
import { useAuth } from '../../../services/hooks/use-auth';
import ExitIcon from '../../../assets/images/icons/header/exit_icon.svg'
import "./style.scss"


export default function ProfileMenu() {

  const navigate = useNavigate()
  const { logout, user, setUserLocal } = useAuth()
  // const { register, handleSubmit, formState: { errors } } = useForm()
  const { first_name, last_name } = user || null

  function logoutHandler() {
    return logout(() => navigate('/home'))
  }

  const menuItems = [
    { description: 'Account', className: 'accountsettings-profile-menu__item' },
    { description: 'Security & privacy', className: 'accountsettings-profile-menu__item' },
    { description: 'Settings', className: 'accountsettings-profile-menu__item' },
    { description: 'About Hooli', className: 'accountsettings-profile-menu__item' },
    { icon: ExitIcon, alt: 'exit icon', description: 'Exit', className: 'accountsettings-profile-menu__item__icon', clickHandler: logoutHandler }
  ]

  return (
    <>
      <Header/>
      <div className="accountsettings">
        <div className="accountsettings-profile">
          <div className="accountsettings-profile-user">
            <div className="accountsettings-profile-user__avatar"></div>
            <p className="accountsettings-profile-user__name">{`${first_name} ${last_name}`}</p>
          </div>
          <hr/>
          <div className="accountsettings-profile-menu">
            {
              menuItems.map((item, i) => (
                <div className="accountsettings-profile-menu__item" key={i} onClick={item.clickHandler}>
                  <p>{item.description}</p>
                  <img src={item.icon} alt={item.alt} className={item.className} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}