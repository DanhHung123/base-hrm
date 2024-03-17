import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { HeaderUserMenu} from '../../../partials'
import {useLayout} from '../../core'
import { localStorageItem } from '../../../../app/modules/utils/LocalStorage'
import { headerConstant } from './header-menus/constant'

const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const btnIconClass = 'svg-icon-1'

interface NavBarProps {
  employeeInfo: { name: string; phongBan: string; }
}

const Navbar = ({ employeeInfo }: NavBarProps) => {
  const {config} = useLayout()

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item')}>
        <div className="notification cursor-pointer p-4 mx-3">
          <button type="button" className="btn p-0 position-relative">
            <KTSVG path={'/media/icons/notification.svg'} className={`flex mx-0 p-1`} />
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </button>
        </div>
        <div
          className={clsx('cursor-pointer')}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img
            src={localStorageItem.get(headerConstant.URL_IAMGE_AVATAR) || toAbsoluteUrl("/media/avatars/blank.png")}
            alt="avatar"
            width={24}
            height={24}
            className="avatar rounded-circle"
          />
        </div>
        <div className='header-user-info color-white'>
          <div className="name">{employeeInfo.name}</div>
          <div className="department">{employeeInfo.phongBan}</div>
        </div>
        <HeaderUserMenu />
      </div>

      {/* {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )} */}
    </div>
  )
}

export {Navbar}
