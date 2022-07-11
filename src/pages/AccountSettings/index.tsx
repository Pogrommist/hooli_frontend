import React, { useState } from "react";
import ProfileMenu from "../../components/shared/ProfileMenu";
import Header from "../../components/shared/Header";
import { useAuth } from "../../services/hooks/use-auth";
import { useForm } from "react-hook-form";
import { UserUpdateParams } from "../../models/user.model";
import FormInput from '../../components/shared/BaseForm/FormInput';
import BaseModal from "../../components/shared/BaseModal";
import EditIcon  from '../../assets/images/icons/home/edit_icon.svg'
import Logo from '../../assets/images/logo.svg'


import "./style.scss"


interface UserInfoField {
  name: string;
  value: string;
}
const AccountSettings = () => {

  const { user, updateUserSettings } = useAuth()
  const [ modalOpened, setModalOpened ] = useState(false)
  const handleOpen = () => setModalOpened(true)
  const handleClose = () => setModalOpened(false)
  const handleFormSubmit = async (userData: UserUpdateParams) => {
    await updateUserSettings(userData)
    setModalOpened(false)
  }

  const { register, handleSubmit, formState: { errors } } = useForm()

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
          <img src={EditIcon} className="account-settings-content__icon" alt="Edit profile info" onClick={handleOpen} />
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
          <BaseModal isOpened={modalOpened} handleClose={handleClose}>
            <>
              <div className="base-modal-root-content__header">
                <img src={Logo} alt="hooli logo"/>
              </div>
              <div className="base-modal-root-content-body">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="account-settings-content-user-info-form">
                  <FormInput name="first_name" register={register} placeholder='First name' hasError={errors.first_name} type="text" defaultValue={user.first_name} />
                  <FormInput name="last_name" register={register} placeholder='Last name' hasError={errors.last_name} type="text" defaultValue={user.last_name} />
                  <div className="base-form-input-field account-settings-content-user-info-form__submit-button">
                    <button className="base-form__action_item__button">Update</button>
                  </div>
                </form>
              </div>
            </>
          </BaseModal>
        </div>
      </div>
    </div>
    </>

  )
}

export default AccountSettings