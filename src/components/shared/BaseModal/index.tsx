import React, { ReactNode } from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import './style.scss';

interface BaseModalType {
  isOpened: boolean;
  handleClose: Function;
  children: ReactNode
}

const BaseModal = ({ children, isOpened,  handleClose }: BaseModalType) => {
  return (
    <ModalUnstyled aria-labelledby="modal-title" aria-describedby="modal-description" open={isOpened} onClose={() => handleClose()} classes={{ root: 'base-modal-root'}} disableAutoFocus>
    <div className='base-modal-root-content'>
      <button onClick={() => handleClose()} className="base-modal-root-content__close_button">X</button>
      <div className="base-modal-root-content-body">{ children }</div>
    </div>
    </ModalUnstyled>
  )
}

export default BaseModal
