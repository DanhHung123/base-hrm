/* eslint-disable jsx-a11y/anchor-is-valid */
import { Outlet } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import "./authLayout.scss"
import { Image } from 'react-bootstrap'

const AuthLayout = () => {
  return (
    <div className='flex-column flex-middle flex-center h-100 authLayout py-10'>
      <div className='wellcome-site flex-column flex-middle'>
        <div className="logo">
          <Image src={toAbsoluteUrl("/media/logos/xHRM.svg")} />
        </div>
        <div className="wellcome-header">
          <h4>Phần mềm quản lý nhân sự thông minh</h4>
        </div>
      </div>
      <div className='form-width'>
        <Outlet />
      </div>
    </div>
  )
}

export { AuthLayout }
