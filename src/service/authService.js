import {
  setRole, setAuthenticated, clearAuthStore, setWelcomeToast, setName, setEmail, setId,setUserId, setReload
} from '../store/authStore';
import { Auth, Hub, Amplify } from 'aws-amplify';
import { NavigateFunction } from 'react-router';
// import AwsConstants from '../constants/awsConstants';

// import store from '../store/store';
// import RoutesConstants from '../constants/routesConstants';
// import ToastConstants from '../constants/toastConstants';
// import { setLoader } from '../store/loaderStore';
// import { Amplify } from 'aws-amplify';
import { useNavigate } from 'react-router';
import ToastConstants from '../constants/toastConstants';




export function authLogin(email, passw) {




  // const authLogin = ( email, passw) => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    let isSuccess = true;
    console.log('inside authLogin');
    Amplify.configure({
        Auth: {
            userPoolId: 'us-east-1_ZsW42bgPL', //UserPool ID
            region: 'us-east-1',
            userPoolWebClientId: '3iqd5j28ejoemlv81a8poveg91', //WebClien
        }
    });

    Auth.signIn(email, passw).then(async (result) => {
       
      // isSuccess= true;
     
        // navigate('/success');
      //  const {address, name, email } = result.challengeParam.userAttributes;
      //  await Auth.completeNewPassword(result, 'MuniReddy@123', {});

    //    let user = await Auth.currentSession().then(data => 
    //     console.log('currentSessionData', data));
        // console.log('result', result.challengeParam.userAttributes);
        // dispatch(setAuthenticated(true));
        // dispatch(setRole(result.challengeParam.userAttributes['custom:user_role']));
        // dispatch(setName(name));
        // // dispatch(setWelcomeToast(true));
        // dispatch(setEmail(email))

    }).catch((err) => {
        // Something is Wrong
        // isSuccess= false;
     
        console.log('Error', err);
        // toast.current.show({
        //   severity: 'error',
        //   summary: 'Something went wrong while logging In',
        //   detail: err.response.data.message,
        // });
        // navigate('/');
    });

    // if(isSuccess){
    // return 'success';
    // }
    // else{
    //   return 'failure';
    // }
}

export function authLogout() {
  // const authLogout = () => {
  Auth.signOut()
    .then(() => {
      // Set loader to active here
    })
    .catch(() => {
      // Handle errors
    });
}

export const storeJWT = (jwt) => {
  localStorage.setItem('jwt', JSON.stringify(jwt));
}

export const getJWT = () => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return JSON.parse(jwt)
  }
  return null
}

export function attachHub(navigate, dispatch) {



 console.log('inside HUB');
 const toastConstants = new ToastConstants();
  /*
   * Amplify Event Hub attached to login page
   * to listen to 'signIn' event and store the token
   * and role in auth store.
   */

  const listener = async (data) => {
    console.log('inside data hub', data);
    if (data.payload.event === 'signIn') {
       console.log('Data in service', data);
    
      await Auth.currentAuthenticatedUser().then((authUser) => {
        console.log('authUser', authUser);
        storeJWT(authUser.signInUserSession.accessToken.jwtToken);
        console.log('inside current authen', authUser);
        dispatch(setAuthenticated(true));
        // dispatch(setId(authUser.attributes.id))
        const role = authUser.attributes['custom:user_role'];
        dispatch(setRole(authUser.attributes['custom:user_role']));
        dispatch(setName(authUser.attributes.name));
        dispatch(setWelcomeToast(true));
        dispatch(setEmail(authUser.attributes.email))
        dispatch(setUserId(authUser.attributes.sub));

        if(role === 'Agent'){
          navigate('/AgentDetails',
          {
            state: {
              message: {
                title: toastConstants.SUCCESS_TITLE,
                detail: toastConstants.LOGIN_SUCCESS_DETAIL,
              },
            }
          }
        );
        }

        if(role === 'RestaurantOwner'){
          navigate('/RestaurantDetails',
          {
            state: {
              message: {
                title: toastConstants.SUCCESS_TITLE,
                detail: toastConstants.LOGIN_SUCCESS_DETAIL,
              },
            }
          }
        );
        }

        if(role === 'user'){
          navigate('/Admin',
          {
            state: {
              message: {
                title: toastConstants.SUCCESS_TITLE,
                detail: toastConstants.LOGIN_SUCCESS_DETAIL,
              },
            }
          }
        );
          
        }
        if(role === 'Admin'){

          navigate('/home',
          {
            state: {
              message: {
                title: toastConstants.SUCCESS_TITLE,
                detail: toastConstants.LOGIN_SUCCESS_DETAIL,
              },
            }
          }
        );
          
        }



 


      })
    }
     else if (data.payload.event === 'oAuthSignOut') {
      // dispatch(clearAuthStore());
      // dispatch(setLoader(false));
      // navigate(routesConstants.LOGIN);

      
      dispatch(setReload(true));
      navigate('/login',
      {
        state:{
          message: {
            reload: true
          }
        }
      }); 
      
      

    }
  };

  Hub.listen('auth', listener);
}
