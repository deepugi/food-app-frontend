// import React, { useEffect, useRef } from 'react';
// import './Home.css';
// import {
//   Navigate,
//   useLocation,
// } from 'react-router-dom';
// import { Toast } from 'primereact/toast';
// import { useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
// import { setWelcomeToast } from '../../store/authStore';
// import ToastConstants from '../../constants/toastConstants';
// import RolesConstants from '../../constants/rolesContants';
// import { Admin, Evaluator, SuperEvaluator } from '../index';
// import privateRoute from '../../routes/PrivateRoute';
// import RoutesConstants from '../../constants/routesConstants';
// import { setLoader } from '../../store/loaderStore';

// function Home() {
//   const dispatch = useAppDispatch();
//   const toast = useRef<any>(null);
//   const welcomeToast = useAppSelector((state) => state.auth.welcomeToast);
//   const location: any = useLocation();
//   const rolesConstant = new RolesConstants();
//   const routesConstant = new RoutesConstants();
//   const toastConstants = new ToastConstants();
//   const navigate = useNavigate();

//   const userRole = useAppSelector((state) => state.auth.role);
//   // TODO Comment below and uncomment above for actual role
//   // const userRole = rolesConstant.ADMIN;

//   useEffect(() => {
//     dispatch(setLoader(false));
//     // Code query param is sent by cognito on redirect
//     if (location.search.startsWith('?code=')) {
//       dispatch(setLoader(true));
//     }
//     if (location.state) {
//       if (welcomeToast
//         && location.state.message.title === toastConstants.SUCCESS_TITLE
//         && location.state.from === routesConstant.HOME) {
//         // @ts-ignore
        // toast.current.show({
        //   severity: toastConstants.SUCCESS_TITLE,
        //   summary: 'Success HOME',
        //   detail: location.state.message.detail,
        //   life: 3000,
        // });
//       }
//       if (welcomeToast
//         && location.state.message.title === toastConstants.SUCCESS_TITLE
//         && location.state.from === routesConstant.LOGIN) {
//         // @ts-ignore
//         toast.current.show({
//           severity: toastConstants.SUCCESS_TITLE,
//           summary: 'Success',
//           detail: location.state.message.detail,
//           life: 3000,
//         });
//       }
//       addEventListener(('popstate'), () => {
//         navigate('/login')
//       })
//       /*
//          * Setting welcomeToast value of false to avoid displaying
//          * welcome toast even when a logged-in user visits home page
//          */
//       dispatch(setWelcomeToast(false));
//     }
//   }, []);

//   return (
//     <div className="home-view h-auto w-full flex justify-content-center align-items-center flex-column">
//       <Toast ref={toast} />
//       {
//         (rolesConstant.ADMIN === userRole) ? <Admin />
//           : (rolesConstant.SUPER_EVALUATOR === userRole) ? <SuperEvaluator />
//             : (rolesConstant.EVALUATOR === userRole) ? <Evaluator />
//               : <Navigate to={routesConstant.LOGIN} />
//       }
//     </div>
//   );
// }

// export default privateRoute(Home);
