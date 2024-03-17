import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { PERMISSIONS, PERMISSION_ABILITY } from "../Constant";
// import { AppointmentList } from "../modules/appointment-list/AppointmentList";
// import Bonus from "../modules/bonus/Bonus";
// import { Contract } from "../modules/contract/Contract";
// import Discipline from "../modules/discipline/Discipline";
// import { DismissedList } from "../modules/dismissed-list/DismissedList";
// import HealthInsurance from "../modules/health-insurance/HealthInsurance";
// import { Manager } from "../modules/manager/Manager";
// import { Profile } from "../modules/profile/Profile";
// import { ProposeList } from "../modules/propose/ProposeList";
// import { Resign } from "../modules/resign/Resign";
// import Statistical from "../modules/statistical/Statistical";
// import { TimeKeeping } from "../modules/timekeeping/TimeKeeping";
// import Transition from "../modules/transition/Transition";
// import Warning from "../modules/warning/Warning";
// import { WelfareList } from "../modules/welfare-list/WelfareList";
// import Report from "../modules/report/Report";
// import { Concurrently } from "../modules/concurrently/Concurrently";
// import Secondment from "../modules/secondment/Secondment";
import { hasAuthority } from "../modules/utils/FunctionUtils";
import { HomePage } from "../pages/Homepage/HomePage";
import TimeKeeping from "../modules/timeKeeping/TimeKeeping";

interface PrivateRouteProps {
  auth: string;
  ability: string;
  component: React.ComponentType<any>;
  redirect: string;
}

const PrivateRoutes = () => {
  // const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, ability, component: Component, redirect, }) => {
    return hasAuthority(auth, ability) ? (<Component />) : (<Navigate to={redirect} />);
  };

  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route element={<MasterLayout />}>
        <Route path="/*" element={<TimeKeeping />}/>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/home" />} />
        {/* Pages */}
        {/* <Route path="personal-information/statistical" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={Statistical} redirect="/home" />} />
        <Route path="personal-information/warning" element={<PrivateRoute auth={PERMISSIONS.TONG_QUAN} ability={PERMISSION_ABILITY.VIEW} component={Warning} redirect="/home" />} />
        <Route path="personal-information/profile" element={<PrivateRoute auth={PERMISSIONS.EMPLOYEE} ability={PERMISSION_ABILITY.VIEW} component={Profile} redirect="/home" />} />
        <Route path="personal-information/contract" element={<PrivateRoute auth={PERMISSIONS.HOP_DONG} ability={PERMISSION_ABILITY.VIEW} component={Contract} redirect="/home" />} />
        <Route path="personal-information/resign" element={<PrivateRoute auth={PERMISSIONS.NGHI_VIEC} ability={PERMISSION_ABILITY.VIEW} component={Resign} redirect="/home" />} />
        <Route path="personal-information/transition" element={<PrivateRoute auth={PERMISSIONS.THUYEN_CHUYEN} ability={PERMISSION_ABILITY.VIEW} component={Transition} redirect="/home" />} />
        <Route path="personal-information/appreciative" element={<PrivateRoute auth={PERMISSIONS.KHEN_THUONG} ability={PERMISSION_ABILITY.VIEW} component={Bonus} redirect="/home" />} />
        <Route path="personal-information/issue" element={<PrivateRoute auth={PERMISSIONS.SU_CO} ability={PERMISSION_ABILITY.VIEW} component={Discipline} redirect="/home" />} />
        <Route path="personal-information/appointment" element={<PrivateRoute auth={PERMISSIONS.BO_NHIEM} ability={PERMISSION_ABILITY.VIEW} component={AppointmentList} redirect="/home" />} />
        <Route path="personal-information/dismissed" element={<PrivateRoute auth={PERMISSIONS.MIEN_NHIEM} ability={PERMISSION_ABILITY.VIEW} component={DismissedList} redirect="/home" />} />
        <Route path="personal-information/welfare" element={<PrivateRoute auth={PERMISSIONS.PHUC_LOI} ability={PERMISSION_ABILITY.VIEW} component={WelfareList} redirect="/home" />} />
        <Route path="personal-information/concurrently" element={<PrivateRoute auth={PERMISSIONS.PHUC_LOI} ability={PERMISSION_ABILITY.VIEW} component={Concurrently} redirect="/home" />} />
        <Route path="personal-information/secondment" element={<PrivateRoute auth={PERMISSIONS.PHUC_LOI} ability={PERMISSION_ABILITY.VIEW} component={Secondment} redirect="/home" />} />
        <Route path="personal-information/propose" element={<PrivateRoute auth={PERMISSIONS.DE_XUAT} ability={PERMISSION_ABILITY.VIEW} component={ProposeList} redirect="/home" />} />
        <Route path="personal-information/manager" element={<PrivateRoute auth={PERMISSIONS.AUTHORITY} ability={PERMISSION_ABILITY.VIEW} component={Manager} redirect="/home" />} />
        <Route path="personal-information/health-insurance" element={<PrivateRoute auth={PERMISSIONS.BAO_HIEM_Y_TE} ability={PERMISSION_ABILITY.VIEW} component={HealthInsurance} redirect="/home" />} />
        <Route path="personal-information/report" element={<PrivateRoute auth={PERMISSIONS.BAO_CAO} ability={PERMISSION_ABILITY.VIEW} component={Report} redirect="/home" />} /> */}
        {/* Time keeping */}
        {/* <Route path="timekeeping" element={<PrivateRoute auth={PERMISSIONS.CHAM_CONG} ability={PERMISSION_ABILITY.VIEW} component={TimeKeeping} redirect="/home" />} /> */}
        {/* Lazy Modules */}
        {/* <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        /> */}
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--kt-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };

