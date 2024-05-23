
import React, { useState } from "react";
import './login.css';
import Success from './success';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { NavigateFunction } from 'react-router';
import {
    Navigate,
    useLocation,
} from 'react-router-dom';
import store from '../store/store';
import { useNavigate } from 'react-router';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { setLoader } from '../store/loaderStore';
import { setCredentials  } from '../store/authStore';
// import { AppDispatch } from '../store/store';
// import { useAppSelector } from '../../store/storeHooks';

// import { ProgressSpinner } from 'primereact/progressspinner';
import {authLogin} from '../service/authService';
import Layout from "../components/Layout/Layout";



const Login = () => {

    const navigate = useNavigate();
    // const dispatch = AppDispatch();

    const [email, setEmail] = useState("");
    const [passw, setPassw] = useState("");
    const [dataInput, setDataInput] = useState('');


    // const loading = useSelector(() => store.getState().loader.loading);
    // console.log('loading value', loading);
    const submitThis = (e) => {
        e.preventDefault();
        // dispatch(setLoader(true));

        console.log('inside the submit function');
        const info = { email: email, passw: passw };

        console.log('username' + email);
        console.log('password', passw);
        
    

        // Amplify.configure({
        //     Auth: {
        //         userPoolId: 'us-east-1_fwx4Hvdma', //UserPool ID
        //         region: 'us-east-1',
        //         userPoolWebClientId: '78m43otgi1tprcvbguhfre59br', //WebClien
        //     }
        // });


        authLogin(email,passw);
        const authenticated =  store.getState().auth.authenticated;
        if(authenticated){
        // navigate('/success');
        return <Layout />;
        } else{
            navigate('/');
        }
        

        // Amplify.configure({
        //     Auth: {
        //         userPoolId: 'us-east-1_ZsW42bgPL', //UserPool ID
        //         region: 'us-east-1',
        //         userPoolWebClientId: '3iqd5j28ejoemlv81a8poveg91', //WebClien
        //     }
        // });

        // Auth.signIn(email, passw).then(async (result) => {
        //     //Success 
        //     console.log('result', result);
            
        //     // dispatch(setLoader(false));

        //     // dispatch(setCredentials(result));
            
        //     // authenticated
        //     // const  = useSelector(() => store.getState().loader.loading);



        //     navigate('/success');
        // }).catch((err) => {
        //     // Something is Wrong

        //     console.log('Error', err);
        //     navigate('/');
        // });



        setDataInput([info]);
    }
    return (



        <div className="login">
            {/* { (!loading) && */}
             <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={submitThis}>
                        <div className="input-container">
                            <label>Email </label>
                            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="pass" value={passw} onChange={(e) => setPassw(e.target.value)} required />
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
            {/* // } */}
            {/* { (loading && 
            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" />
            )
       
            } */}

        </div>






    )
}

export default Login;