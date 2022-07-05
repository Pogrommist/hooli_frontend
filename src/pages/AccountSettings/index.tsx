import React from "react";
import ProfileMenu from "../../components/shared/ProfileMenu";
import Header from "../../components/shared/Header";
import EditIcon  from '../../assets/images/icons/home/edit_icon.svg'

import "./style.scss"
import { useAuth } from "../../services/hooks/use-auth";

interface UserInfoField {
  name: string;
  value: string;
}
const AccountSettings = () => {

  const { user } = useAuth()

  const userInfoFields:Array<UserInfoField> = [
    { name: 'First name', value: user.first_name },
    { name: 'Last name', value: user.last_name },
    { name: '*Email', value: user.email },
    { name: '*Phone number', value: '+*(***)***-**-90' },
  ]
  return (
    <>
    <Header />
    <div className="account-settings">
      <ProfileMenu />
      <div className="account-settings-content">
        <div className="account-settings-content-title-block">
          <h1 className="account-settings-content__title">Account settings</h1>
          <img src={EditIcon} className="account-settings-content__icon" alt="Edit profile info"/>
        </div>
        <div className="account-settings-content-user-info">
          {
            userInfoFields.map((item, index) => {
              return (
                <div className="account-settings-content-user-info__item" key={index}>
                  <p className="account-settings-content-user-info__item__name">{item.name}</p>
                  <p className="account-settings-content-user-info__item__value">{item.value}</p>
                </div>
              )
            })
          }
          <p className="account-settings-content-user-info__delimeter"></p>
          <div className="account-settings-content-user-info-details">
            <p className="account-settings-content-user-info-details__text">*Change email and phone number</p>
            <p className="account-settings-content-user-info-details__text">You can contact to support service to change your email.</p>
            <p className="account-settings-content-user-info-details__text">You can change your phone number in your profile on Binance or other stocks profile that you use.</p>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default AccountSettings