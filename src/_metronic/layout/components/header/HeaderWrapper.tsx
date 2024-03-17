/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {Header} from './Header'
import {Navbar} from './Navbar'
import { useAuth } from '../../../../app/modules/auth'
import { useEffect, useState } from 'react'
import { hasRole } from '../../../../app/modules/utils/FunctionUtils'
import { ROLE } from '../../../../app/Constant'
import { RESPONSE_STATUS_CODE } from '../../../../app/modules/auth/core/_consts'
import { localStorageItem } from '../../../../app/modules/utils/LocalStorage'
import { headerConstant } from './header-menus/constant'
import { Image } from 'react-bootstrap'

export function HeaderWrapper() {
  const {config, classes} = useLayout()
  const { currentUser } = useAuth();
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    phongBan: "",
  });

  if (!config.app?.header?.display) {
    return null
  }



  return (
    <div id='kt_app_header' className='app-header'>
      <div
        id='kt_app_header_container'
        className={clsx(
          'flex-grow-1',
          classes.headerContainer.join(' '),
          config.app?.header?.default?.containerClass
        )}
      >
        {config.app.sidebar?.display ? (
          <>
            <div
              className='d-flex align-items-center d-lg-none ms-n2 me-2'
              title='Show sidebar menu'
            >
              <div
                className='btn btn-icon btn-active-color-primary spaces ml-20 mr-10 cursor-pointer'
                id='kt_app_sidebar_mobile_toggle'
              >
                <KTSVG path='/media/icons/list.svg' svgClassName='spaces w-24 h-24' />
              </div>
            </div>
            <div className='header-brand d-lg-none'>
              <Link className='header-brand-link w-100 flex flex-middle flex-center' to={'/dashboard'}>
                <Image className='spaces w-65' src={toAbsoluteUrl("/media/logos/xHRM.svg")} />
              </Link>
            </div>
          </>
        ) : (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
            <Link to='/dashboard'>
              {config.layoutType !== 'dark-header' ? (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/xHRM_bule.svg')}
                  className='h-20px h-lg-30px app-sidebar-logo-default'
                />
              ) : (
                <>
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default.svg')}
                    className='h-20px h-lg-30px app-sidebar-logo-default theme-light-show'
                  />
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/xHRM_bule.svg')}
                    className='h-20px h-lg-30px app-sidebar-logo-default theme-dark-show'
                  />
                </>
              )}
            </Link>
          </div>
        )}
        
        <div
          id='kt_app_header_wrapper'
          className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'
        >
          {config.app.header.default?.content === 'menu' &&
            config.app.header.default.menu?.display && (
              <div
                className='app-header-menu app-header-mobile-drawer align-items-stretch'
                data-kt-drawer='true'
                data-kt-drawer-name='app-header-menu'
                data-kt-drawer-activate='{default: true, lg: false}'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width='180px'
                data-kt-drawer-direction='end'
                data-kt-drawer-toggle='#kt_app_header_menu_toggle'
                data-kt-swapper='true'
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
              >
                <Header />
              </div>
          )}
          <Navbar
            employeeInfo={employeeInfo}
          />
        </div>
      </div>
    </div>
  )
}
