import { toAbsoluteUrl } from "../../../_metronic/helpers";
import "./homepage.scss";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { checkMenuByPermissions, hasAuthority, hasRole } from "../../modules/utils/FunctionUtils";
import { MODULE, MODULE_NAME, PERMISSIONS, ROLE } from "../../Constant";
import { TYPE } from "../../modules/utils/Constant";
import useMultiLanguage from "../../hook/useMultiLanguage";
import { useEffect, useState } from "react";
// import { getEmployeeIdByUserId } from "../../modules/profile/services/DialogServices";
import { localStorageItem } from "../../modules/utils/LocalStorage";
import { headerConstant } from "../../../_metronic/layout/components/header/header-menus/constant";

interface LinkBtnProps {
  linkTo: string;
  iconPath: string;
  text: string;
  modulePermission: string;
  moduleName: string;
}

const countAuthorities = () => {
  const authorities = [
    hasAuthority(PERMISSIONS.MODULE, MODULE.HO_SO, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.CHAM_CONG, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.TUYEN_DUNG, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.TAI_LIEU, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.DAO_TAO, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.PHONG_HOP, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.CONG_VIEC, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.HE_THONG, TYPE.MODULE)
  ];

  const count = authorities.filter(authority => authority === true).length;
  return count;
}

const LinkButton = (props: LinkBtnProps) => {
  const { linkTo = "", iconPath, text, modulePermission, moduleName } = props;
  const checkedMenu = checkMenuByPermissions();

  let colSize = 12;
  switch (countAuthorities()) {
    case 8:
      colSize = 3;
      break;
    case 7:
      colSize = 3;
      break;
    case 6:
      colSize = 4;
      break;
    case 5:
      colSize = 3;
      break;
    case 4:
      colSize = 6;
      break;
    case 3:
      colSize = 6;
      break;
    case 2:
      colSize = 6;
      break;
    case 1:
      colSize = 12;
      break;
    default:
      colSize = 12;
      break;
  }

  const handleButtonClick = (module: string) => {
    const selectedMenu = checkedMenu.find((menu) => menu.name === module);
    if (selectedMenu) {
      localStorage.setItem(headerConstant.LIST_SUB_MENU, JSON.stringify(selectedMenu.subMenu));
    }
  };

  return (
    <>
      {hasAuthority(PERMISSIONS.MODULE, modulePermission, TYPE.MODULE) && (
      <Col xs={12} sm={6} md={colSize} xl={colSize} className="flex flex-center">
        <Link to={linkTo} onClick={() => handleButtonClick(moduleName)}>
          <div className="link-button-container">
            <button
              type="button"
              className="button-link"
            >
              <div className="cirle-animation cirle-animation-1"></div>
              <div className="cirle-animation cirle-animation-2"></div>
              <Image src={toAbsoluteUrl(iconPath)} alt="image" />
            </button>
            <span className="button-text">{text}</span>
          </div>
        </Link>
      </Col>
      )}
    </>
  )
}

export function HomePage() {
  const { lang } = useMultiLanguage();
  const { logout } = useAuth();
  document.title = `${lang('SOFTWARE')}`;
  const { currentUser } = useAuth();
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    phongBan: "",
  });
  
  // useEffect(() => {
  //   if (hasRole(ROLE.USER)) {
  //     checkID();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser]);

  // const checkID = async () => { 
  //   let employeeId = currentUser?.id ? currentUser?.id : currentUser?.user?.id;
  //   const { data } = await getEmployeeIdByUserId(employeeId);
  //   setEmployeeInfo({
  //     name: data.data?.name || "",
  //     phongBan: data.data?.phongBanText || ""
  //   });
  // };
 
  return (
    <div className="main">
      {/* <div className="circle-blur-cyan"></div>
      <div className="circle-blur-deep"></div> */}
      <div className="header">
        <div className="logo">
          <Image src={toAbsoluteUrl("/media/logos/xHRM.svg")} />
        </div>
        <div className="user">
          <div className="user-info">
            <span>{lang("GENERAL.HELLO")}</span>
            <h5>{employeeInfo.name}</h5>
          </div>
          <div className="user-avatar">
            <img
              src={localStorageItem.get(headerConstant.URL_IAMGE_AVATAR) || toAbsoluteUrl("/media/avatars/blank.png")}
              alt="avatar"
            />
          </div>
          <div className="user-logout">
            <button type="button" onClick={logout}>{lang("LOGOUT")}</button>
          </div>
        </div>
      </div>
      <div className="z-100 main-content">
        <div className="body-container">
            <Row>
              <Col xs={12}>
                <h2 className="title-software">{lang("GENERAL.NAME_SOFTWARE")}</h2>
              </Col>
            </Row>
            <Row className="flex flex-start">
              <LinkButton
                linkTo={hasRole(ROLE.USER) ? "/personal-information/profile" : "/personal-information/statistical"}
                iconPath="/media/icons/homepage/profile.svg"
                text={lang("GENERAL.APP.NAME")}
                modulePermission={MODULE.HO_SO}
                moduleName={MODULE_NAME.HO_SO}
              />
              <LinkButton
                linkTo="/timekeeping"
                iconPath="/media/icons/homepage/time.svg"
                text={lang("GENERAL.TIME_KEEPING")}
                modulePermission={MODULE.CHAM_CONG}
                moduleName={MODULE_NAME.CHAM_CONG}
              />
              <LinkButton
                linkTo="/recruitment"
                iconPath="/media/icons/homepage/hr.svg"
                text={lang("GENERAL.RECRUITMENT")}
                modulePermission={MODULE.TUYEN_DUNG}
                moduleName={MODULE_NAME.TUYEN_DUNG}
              />
              <LinkButton
                linkTo="/document"
                iconPath="/media/icons/homepage/document.svg"
                text={lang("GENERAL.DOCUMENT")}
                modulePermission={MODULE.TAI_LIEU}
                moduleName={MODULE_NAME.TAI_LIEU}
              />
              <LinkButton
                linkTo="/trainning"
                iconPath="/media/icons/homepage/training.svg"
                text={lang("GENERAL.TRAINING")}
                modulePermission={MODULE.DAO_TAO}
                moduleName={MODULE_NAME.DAO_TAO}
              />
              <LinkButton
                linkTo="/meeting-room"
                iconPath="/media/icons/homepage/meet.svg"
                text={lang("GENERAL.MEETING_ROOM")}
                modulePermission={MODULE.PHONG_HOP}
                moduleName={MODULE_NAME.PHONG_HOP}
              />
              <LinkButton
                linkTo="/job"
                iconPath="/media/icons/homepage/work.svg"
                text={lang("GENERAL.JOB")}
                modulePermission={MODULE.CONG_VIEC}
                moduleName={MODULE_NAME.CONG_VIEC}
              />
              <LinkButton
                linkTo="/system"
                iconPath="/media/icons/homepage/system.svg"
                text={lang("GENERAL.SYSTEM")}
                modulePermission={MODULE.HE_THONG}
                moduleName={MODULE_NAME.HE_THONG}
              />
            </Row>
          {/* <Row className="mt-4rem">
            <h5 className="copyright-title">Copyright ©2023 Produced by OCEANTECH</h5>
          </Row> */}
        </div>
      </div>
    </div>
  );
}
