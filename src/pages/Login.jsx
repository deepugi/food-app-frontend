import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import {authLogin} from '../service/authService';
import store from '../store/store';
import { useNavigate } from 'react-router';
import { Auth } from 'aws-amplify';
import { useLocation } from "react-router-dom";
import { setReload } from "../store/authStore";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  // const navigate = useNavigate();
  const [loader, setLoader] = useState(false); 
  // const location = useLocation();
  // const dispatch = useDispatch();
  // const reload = useSelector((state) => state.auth.reload);

  // const [reload, setReload] = useState(true);






  const submitHandler = async (e) => {

    e.preventDefault();
    console.log('name', loginNameRef.current.value);
    console.log('password', loginPasswordRef.current.value);
    setLoader(true);
   const  result = await authLogin(loginNameRef.current.value, loginPasswordRef.current.value);
   console.log('result'+ result);
    // const authenticated =  store.getState().auth.authenticated;
    // await Auth.currentAuthenticatedUser().then(() => {
    //   navigate('/home');
    // })

  };



  return (
    <Helmet title="Login">


    {loader && (
              <div>
                <span className="loader">
                  <i className="pi pi-spin pi-spinner" />
                </span>
              </div>
            )}
            {!loader && (
      <><CommonSection title="Login" /><section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      ref={loginNameRef} />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      ref={loginPasswordRef} />
                  </div>
                  <button type="submit" className="addTOCart__btn">
                    Login
                  </button>
                </form>
                {/* <Link to="/register">
      Don't have an account? Create an account
    </Link> */}
              </Col>
            </Row>
          </Container>
        </section></>
      )}
    </Helmet>
  );
};

export default Login;




// import React, { useEffect, useState } from "react";
// import './login.css';
// import Success from './success';
// import { Amplify } from 'aws-amplify';
// import { Auth } from 'aws-amplify';
// import { NavigateFunction } from 'react-router';
// import {
//     Navigate,
//     useLocation,
// } from 'react-router-dom';
// import store from '../store/store';
// import { useNavigate } from 'react-router';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// // import { setLoader } from '../store/loaderStore';
// import { setCredentials  } from '../store/authStore';
// // import { AppDispatch } from '../store/store';
// // import { useAppSelector } from '../../store/storeHooks';

// // import { ProgressSpinner } from 'primereact/progressspinner';
// import {authLogin} from '../service/authService';
// import Layout from "../components/Layout/Layout";



// const Login = () => {

//     const navigate = useNavigate();
//     // const dispatch = AppDispatch();

//     const [email, setEmail] = useState("");
//     const [passw, setPassw] = useState("");
//     const [dataInput, setDataInput] = useState('');

  


//     // const loading = useSelector(() => store.getState().loader.loading);
//     // console.log('loading value', loading);
//     // const authenticated =  store.getState().auth.authenticated;

//     const submitThis = async (e) => {
//         e.preventDefault();
//         // dispatch(setLoader(true));

//         console.log('inside the submit function');
//         const info = { email: email, passw: passw };

//         console.log('username' + email);
//         console.log('password', passw);
        
    

//         // Amplify.configure({
//         //     Auth: {
//         //         userPoolId: 'us-east-1_fwx4Hvdma', //UserPool ID
//         //         region: 'us-east-1',
//         //         userPoolWebClientId: '78m43otgi1tprcvbguhfre59br', //WebClien
//         //     }
//         // });


//     await authLogin(email,passw);

//       //  fetchResponse.then(() => {
//       //   const authenticated =  store.getState().auth.authenticated;
//       //   if(authenticated){
//       //   // navigate('/success');
//       //         // return <Layout />;
//       //   } else{
//       //       navigate('/');
//       //       // return <Layout />;
//       //   }
//       //  })

      
//         const authenticated =  store.getState().auth.authenticated;
//         if(authenticated){
//         navigate('/success');
//               // return <Layout />;
//         } else{
//             navigate('/');
//             // return <Layout />;
//         }
        

//         // Amplify.configure({
//         //     Auth: {
//         //         userPoolId: 'us-east-1_ZsW42bgPL', //UserPool ID
//         //         region: 'us-east-1',
//         //         userPoolWebClientId: '3iqd5j28ejoemlv81a8poveg91', //WebClien
//         //     }
//         // });

//         // Auth.signIn(email, passw).then(async (result) => {
//         //     //Success 
//         //     console.log('result', result);
            
//         //     // dispatch(setLoader(false));

//         //     // dispatch(setCredentials(result));
            
//         //     // authenticated
//         //     // const  = useSelector(() => store.getState().loader.loading);



//         //     navigate('/success');
//         // }).catch((err) => {
//         //     // Something is Wrong

//         //     console.log('Error', err);
//         //     navigate('/');
//         // });



//         setDataInput([info]);
//     }



//     return (
//         <div className="login">
//             {/* { (!loading) && */}
//              <div className="login-form">
//                 <div className="title">Sign In</div>
//                 <div className="form">
//                     <form onSubmit={submitThis}>
//                         <div className="input-container">
//                             <label>Email </label>
//                             <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         </div>
//                         <div className="input-container">
//                             <label>Password </label>
//                             <input type="password" name="pass" value={passw} onChange={(e) => setPassw(e.target.value)} required />
//                         </div>
//                         <div className="button-container">
//                             <input type="submit" />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )

// }

    
    


// export default Login;
