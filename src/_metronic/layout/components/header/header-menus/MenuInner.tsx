import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import "../../../../../app/modules/styles/index.scss";
import { TMenu,  } from '../../../../../app/pages/Homepage/listMenu';
import { MenuItem } from './MenuItem';
import { headerConstant } from './constant';
import { Image } from 'react-bootstrap';
import { KTSVG, toAbsoluteUrl } from '../../../../helpers';
import { checkMenuByPermissions } from '../../../../../app/modules/utils/FunctionUtils';
import { useEffect, useState } from 'react';

export function MenuInner() {
  const intl = useIntl();
  const navigate = useNavigate();
  const checkedMenu = checkMenuByPermissions();

  const handleButtonClick = (module: string) => {
    const selectedMenu = checkedMenu.find((menu) => menu.name === module);
    if (selectedMenu) {
      localStorage.setItem(headerConstant.LIST_SUB_MENU, JSON.stringify(selectedMenu.subMenu));
      navigate(`/${module}`);
    }
  };
  
  useEffect(() => {
    const tabList:any = document.querySelector('.header-list-nav');
    const isScroll = tabList.clientWidth < tabList?.scrollWidth;
    const rightArrow = document.querySelector('.header-list-nav-container .arrow-right');
    const leftArrow = document.querySelector('.header-list-nav-container .arrow-left');
    if(isScroll) {
      rightArrow?.classList?.remove("hidden");
      const handleShowIcon = () => {
        if(tabList) {
          if(tabList.scrollLeft >= 20) {
            leftArrow?.classList?.remove("hidden");
          } else {
            leftArrow?.classList?.add("hidden");
          }
  
          const maxScrollValue = tabList.scrollWidth - tabList.clientWidth - 20;        
          if(tabList.scrollLeft >= maxScrollValue) {
            rightArrow?.classList?.add("hidden");
          } else {
            rightArrow?.classList?.remove("hidden");
          }
        }
      }
      rightArrow?.addEventListener('click', () => {
        if(tabList) {
          tabList.scrollLeft += 100;
          handleShowIcon();
        }
      });
      leftArrow?.addEventListener('click', () => {
        if(tabList) {
          tabList.scrollLeft -= 100;
          handleShowIcon();
        }
      });
      tabList?.addEventListener('scroll', handleShowIcon);
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className='header-brand'>
        <Link className='header-brand-link w-100 flex flex-middle flex-center' to={'/dashboard'}>
          <Image className='spaces w-65' src={toAbsoluteUrl("/media/logos/xHRM.svg")} />
        </Link>
      </div>
      {/* <MenuItem title="" icon="/media/icons/menu.svg" to="/home" onClick={() => handleButtonClick('home')} /> */}
      <div className="header-list-nav-container">
        {/* <KTSVG path='/media/icons/arrow-left.svg' className="text-white arrow-left hidden" svgClassName={`position-absolute`}/> */}
        <div className="header-list-nav">
          {/* {checkedMenu?.map((item: TMenu, index: number) => {
            return (
              <MenuItem key={index} title={intl.formatMessage({ id: item?.title })} to={item?.to} onClick={() => handleButtonClick(item.name)} />
            )
          })} */}
        </div>
        <KTSVG path='/media/icons/arrow-left.svg' className="text-white arrow-right hidden" svgClassName={`position-absolute`}/>
      </div>
    </div>
  );
}
