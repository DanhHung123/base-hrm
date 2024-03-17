import { MODULE, PERMISSIONS, PERMISSION_ABILITY } from "../../Constant"

export type TMenu = {
  title: string,
  to: string,
  name: string,
  permission: string,
  ability: string,
  subMenu: TSubMenu[],
  icon?: string
}

export type TSubMenu = {
  title: string,
  to: string,
  hasBullet?: boolean,
  icon: string
  permission: string,
  ability: string,
}

export const allMenu: TMenu[] = [
  {
    title: "GENERAL.APP.NAME",
    to: "/personal-information",
    name: "profile",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.HO_SO,
    icon: "/media/icons/personal-information.svg",
    subMenu: [
      {
        title: "GENERAL.STATISTICAL",
        to: "/personal-information/statistical",
        hasBullet: false,
        icon: "/media/icons/statistical.svg",
        permission: PERMISSIONS.TONG_QUAN,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.WARNING",
        to: "/personal-information/warning",
        hasBullet: false,
        icon: "/media/icons/warning.svg",
        permission: PERMISSIONS.TONG_QUAN,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.PROFILE",
        to: "/personal-information/profile",
        hasBullet: false,
        icon: "/media/icons/profile.svg",
        permission: PERMISSIONS.EMPLOYEE,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.CONTRACT",
        to: "/personal-information/contract",
        hasBullet: false,
        icon: "/media/icons/contract.svg",
        permission: PERMISSIONS.HOP_DONG,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.TRANSFER",
        to: "/personal-information/transition",
        hasBullet: false,
        icon: "/media/icons/transition.svg",
        permission: PERMISSIONS.THUYEN_CHUYEN,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.RESIGN",
        to: "/personal-information/resign",
        hasBullet: false,
        icon: "/media/icons/resign.svg",
        permission: PERMISSIONS.NGHI_VIEC,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "APPOINTMENT",
        to: "/personal-information/appointment",
        hasBullet: false,
        icon: "/media/icons/appointment.svg",
        permission: PERMISSIONS.BO_NHIEM,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "DISMISSED",
        to: "/personal-information/dismissed",
        hasBullet: false,
        icon: "/media/icons/dismissed.svg",
        permission: PERMISSIONS.MIEN_NHIEM,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "WELFARE",
        to: "/personal-information/welfare",
        hasBullet: false,
        icon: "/media/icons/welfare.svg",
        permission: PERMISSIONS.PHUC_LOI,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "CONCURRENTLY",
        to: "/personal-information/concurrently",
        hasBullet: false,
        icon: "/media/icons/concurrently.svg",
        permission: PERMISSIONS.PHUC_LOI,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "SECONDMENT",
        to: "/personal-information/secondment",
        hasBullet: false,
        icon: "/media/icons/secondment.svg",
        permission: PERMISSIONS.PHUC_LOI,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.APPRECIATIVE",
        to: "/personal-information/appreciative",
        hasBullet: false,
        icon: "/media/icons/appreciative.svg",
        permission: PERMISSIONS.KHEN_THUONG,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.DISCIPLINE",
        to: "/personal-information/issue",
        hasBullet: false,
        icon: "/media/icons/issue.svg",
        permission: PERMISSIONS.SU_CO,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "GENERAL.REPORT",
        to: "/personal-information/report",
        hasBullet: false,
        icon: "/media/icons/report.svg",
        permission: PERMISSIONS.BAO_CAO,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "CATEGORY",
        to: "/personal-information/category",
        hasBullet: false,
        icon: "/media/icons/category.svg",
        permission: PERMISSIONS.DANH_MUC,
        ability: PERMISSION_ABILITY.VIEW,
      },
      {
        title: "MANAGER",
        to: "/personal-information/manager",
        hasBullet: false,
        icon: "/media/icons/manager.svg",
        permission: PERMISSIONS.AUTHORITY,
        ability: PERMISSION_ABILITY.VIEW,
      }
    ]
  },
  {
    title: "GENERAL.TIME_KEEPING",
    to: "/timekeeping",
    name: "timekeeping",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.CHAM_CONG,
    icon: "/media/icons/time.svg",
    subMenu: []
  },
  {
    title: "GENERAL.RECRUITMENT",
    to: "/recruitment",
    name: "recruitment",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.TUYEN_DUNG,
    icon: "/media/icons/hr.svg",
    subMenu: []
  },
  {
    title: "GENERAL.DOCUMENT",
    to: "/document",
    name: "document",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.TAI_LIEU,
    icon: "/media/icons/document.svg",
    subMenu: []
  },
  {
    title: "GENERAL.TRAINING",
    to: "/trainning",
    name: "trainning",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.DAO_TAO,
    icon: "/media/icons/training.svg",
    subMenu: []
  },
  {
    title: "GENERAL.MEETING_ROOM",
    to: "/meeting-room",
    name: "meeting-room",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.PHONG_HOP,
    icon: "/media/icons/meet.svg",
    subMenu: []
  },
  {
    title: "GENERAL.JOB",
    to: "/job",
    name: "job",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.CONG_VIEC,
    icon: "/media/icons/work.svg",
    subMenu: []
  },
  {
    title: "GENERAL.SYSTEM",
    to: "/system",
    name: "system",
    permission: PERMISSIONS.MODULE,
    ability: MODULE.HE_THONG,
    icon: "/media/icons/system.svg",
    subMenu: []
  }
]