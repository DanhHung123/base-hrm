import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { reInitMenu } from '../helpers'
import {
  ActivityDrawer,
  DrawerMessenger,
  InviteUsers,
  ThemeModeProvider,
  UpgradePlan,
} from '../partials'
import { Content } from './components/content'
import { HeaderWrapper } from './components/header'
import { ScrollTop } from './components/scroll-top'
import { Sidebar } from './components/sidebar'
import { PageDataProvider } from './core'
import SidebarProvider from './components/sidebar/SidebarContext'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />
            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              <SidebarProvider>
                <Sidebar />
              </SidebarProvider>
              <div className='app-main flex-column flex-row-fluid justify-content-between' id='kt_app_main'>
                <div className='d-flex flex-column flex-column-fluid'>
                  {/* <ToolbarWrapper /> */}
                  <Content>
                    <Outlet />
                  </Content>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* begin:: Drawers */}
        <ActivityDrawer />
        {/* <RightToolbar /> */}
        <DrawerMessenger />
        {/* end:: Drawers */}

        {/* begin:: Modals */}
        <InviteUsers />
        <UpgradePlan />
        {/* end:: Modals */}
        {/* <ScrollTop /> */}
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export { MasterLayout }

