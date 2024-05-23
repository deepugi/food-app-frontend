import React, { useEffect, useState } from "react";
import store from '../store/store';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import RoutesConstants from "../constants/routeConstants";
import axios from 'axios';
import { getJWT } from "../service/authService";
import Layout from "../components/Layout/Layout";

const Success = () => { 

  const authenticated =  store.getState().auth.authenticated;

  const navigate = useNavigate();
// http://localhost:8080/dev

useEffect( () => {


//   axios.get('http://localhost:8080/allProducts', { headers: {"Authorization" : `Bearer ${getJWT()}`} }).then((response) => {

//   console.log('response', response);

//   }).catch((e) => {
//      console.log('error getting the values', e);
//   });









  // axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           console.log(res.data);
  //       this.setState({
  //           items: res.data,  /*set response data in items array*/
  //           isLoaded : true,
  //           redirectToReferrer: false
  //       })


  // getAllUniversity()
  // .then((response: AxiosResponse) => {
  //   dispatch(setAllCollegeData(extractUniversities(response.data.colleges as ICollege[])));
  // })
  // .catch((e) => {
  //   toastRef.current.show({
  //     severity: 'error',
  //     summary: 'Something went wrong',
  //     detail: e.response.data.message,
  //   });
  // });
  // export function getAllUniversity() {
  //   return axios.get(apiConstants.COLLEGE);
  // }
  // export function getPaginationUniversity(pageno: number) {
  //   return axios.get(apiConstants.COLLEGE, {
  //     params: {
  //       sortBy: 'updatedAt,DESC',
  //       pageNo: pageno,
  //     },
  //   });
  // }


  if(!authenticated){
  navigate('/');
  }
});


   if(authenticated){
    return( <div><Layout /></div>);
}
    // navigate('/');

    // else{
    //   return(
    //     <div>
    //   <Navigate to={RoutesConstants.HOME } />
    //   </div>
    //   );
    //  }
    // else{
    // navigate('/');
    // }


    
  
}

export default Success;