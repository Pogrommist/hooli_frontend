import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

import Logo from '../../../assets/images/logo.svg'
import ProfileIcon from '../../../assets/images/icons/header/profile_icon.svg'
import BellIcon from '../../../assets/images/icons/header/bell_icon.svg'
import WalletIcon from '../../../assets/images/icons/header/wallet_icon.svg'
import GearIcon from '../../../assets/images/icons/header/gear_icon.svg'
import ExitIcon from '../../../assets/images/icons/header/exit_icon.svg'
import { useAuth } from '../../../services/hooks/use-auth';

import './style.scss'



export default function() {
  const navigate = useNavigate()
  const { logout, user, setUserLocal } = useAuth()
  const [profileMenuOpened, setHandleProfileClick] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (typeof localUser !== null) setUserLocal(JSON.parse(localUser))
  }, []);


  const logoutHandler = () => logout(() => navigate('/'))

  const goToSettings = () => navigate('/account-settings')

  const dropdownItems = [
    { icon: ProfileIcon, alt: 'profile icon', description: 'My profile', className: 'header-profile-dropdown__item__icon' },
    { icon: BellIcon, alt: 'bell icon', description: 'Notification', className: 'header-profile-dropdown__item__icon' },
    { icon: WalletIcon, alt: 'wallet icon', description: 'Wallets', className: 'header-profile-dropdown__item__icon' },
    { icon: GearIcon, alt: 'settings icon', description: 'Settings', className: 'header-profile-dropdown__item__icon', clickHandler: goToSettings },
    { icon: ExitIcon, alt: 'exit icon', description: 'Exit', className: 'header-profile-dropdown__item__icon', clickHandler: logoutHandler }
  ]

  const { first_name, last_name } = user || null

  return(
    <header className="header">
        <div className="header__container">
          <div className="header__left-block">
          <img src={Logo} className="header__logo" alt="logo" />
          <div className="header__links">
            <p className="header__links__link header__links__link--dropdown">Stocks</p>
            <p className="header__links__link header__links__link--active">My Strategies</p>
            <p className="header__links__link header__links__link">FAQ</p>
          </div>
          </div>

          <div className="header-profile" onClick={() => setHandleProfileClick(!profileMenuOpened)}>
            <p className="header-profile__name">{`${first_name} ${last_name}`}</p>
            <p className="header-profile__avatar"></p>
            { profileMenuOpened && (
              <div className="header-profile-dropdown">
                { dropdownItems.map((item, i) => (
                <div className="header-profile-dropdown__item" key={i} onClick={item.clickHandler}>
                  <img src={item.icon} alt={item.alt} className={item.className} />
                  <p>{item.description}</p>
                </div>
                ))}
              </div>
              )
            }
          </div>
        </div>
    </header>
  )
}