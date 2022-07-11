import React from "react";
import { useNavigate } from 'react-router';
import { NavLink } from "react-router-dom";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { useAuth } from '../../../services/hooks/use-auth';
import ExitIcon from '../../../assets/images/icons/header/exit_icon.svg'
import "./style.scss"



export default function ProfileMenu() {

  const navigate = useNavigate()
  const { logout, user, uploadAvatar } = useAuth()
  const { first_name, last_name } = user || null
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList: ImageListType) => setImages(imageList as never[]);

  const handleUploadAvatar = async () => {
    await uploadAvatar(images[0].dataURL)
    setImages([])
  }

  const logoutHandler = () => logout(() => navigate('/'))

  const menuItems = [
    { name: 'Account', className: 'account-settings-profile-menu__item-link', path: '/account-settings' },
    { name: 'Security & privacy', className: 'account-settings-profile-menu__item-link', path: '/' },
    { name: 'Settings', className: 'account-settings-profile-menu__item-link', path: '/' },
    { name: 'About Hooli', className: 'account-settings-profile-menu__item-link', path: '/' },
  ]

  const getLinkClass = (navData, element) => {
    return navData.isActive ? `${element.className} ${element.className}--active` : element.className
  }
  
  return (
    <>
      <div className="account-settings-profile">
        <div className="account-settings-profile-user">
          <div className="account-settings-profile-user__avatar" style={{backgroundImage: `url(${user.avatar_url})`}}>
            <div className="account-settings-profile-user__avatar__image">
            <ReactImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                isDragging,
                dragProps
              }) => (
                // write your building UI
                <div className="account-settings-profile-user-select-image-wrapper">
                  <button
                    className="account-settings-profile-user-select-image__button"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                  </button>
                  { 
                    images.length > 0 && (
                      <span 
                        className="account-settings-profile-user-select-image__button account-settings-profile-user-select-image__button--accept"
                        onClick={handleUploadAvatar}
                        ></span>
                      )
                  }
                  {imageList.map((image, index) => (
                    <div key={index}>
                      <img src={image.dataURL} alt="avatar preview" className="account-settings-profile-user-select-image__preview" />
                      <div className="image-item__btn-wrapper">
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ReactImageUploading>
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
            <p className="account-settings-profile-menu__item-link account-settings-profile-menu__item-link--exit-link">Log out</p>
            <img src={ExitIcon} alt='Exit from account' className='account-settings-profile-menu__item-link__icon' />  
          </div>
        </div>
      </div>
    </>
  )
}