import axios from "axios";
import {GET_GUARDIANLIST, GET_GUARDIANDETAIL, GET_GUARDIANSEARCH, GET_GUARDIANSDATESEARCH} from "./types";

//const apyKey =  'daa37865-8c63-408a-a6c4-545971fd29d6'


/*
 * This function is used to call API of guardian list and dispatch list to redux store
 */
export const getGuardianList = (pageIndex) => dispatch => {
  return new Promise((resolve, reject) => {
      console.log("getGuardianList calling")
      axios.get(`/api/getguardianlist/${pageIndex}`).then((res)=>{
          dispatch({  type: GET_GUARDIANLIST, payload: res.data  });
      }).catch(err => {
          console.log(err)
      });
    // axios.get('https://content.guardianapis.com/search', {
    //       params: {'api-key': apyKey, 'page':pageIndex}
    //   }).then((res)=>{
    //     var data = res && res.data && res.data.response && res.data.response.results
    //     dispatch({
    //         type: GET_GUARDIANLIST,
    //         payload: data
    //     });
    //     resolve(res) 
    //   }).catch(err => {
    //       reject(err);
    //   });
  });
};

/*
 * This function is used to call API of guardian detail and dispatch pertucular gaurdian detail to redux store
 */
export const getGuardianDetail = (id) => dispatch => {
  return new Promise((resolve, reject) => {
      var convertedUrl = id.replace(/\//g, "_");
      console.log("getGuardianDetail calling", convertedUrl)
      axios.get(`/api/getguardiandetail/${convertedUrl}`).then((res)=>{
          dispatch({  type: GET_GUARDIANDETAIL,  payload: res.data  });
      }).catch(err => {
          console.log(err)
      });
      // axios.get(`https://content.guardianapis.com/${id}`,{
      //     params: {'api-key': apyKey}
      // }).then((res)=>{
      //   var data = res && res.data && res.data.response &&  res.data.response.content
      //   dispatch({
      //       type: GET_GUARDIANDETAIL,
      //       payload: data
      //   });
      //   resolve(res) 
      // }).catch(err => {
      //     reject(err);
      // });
  });
};

/*
 * This function is used to search data from redux store according to user search input
 */
export const getGuardianSearchList = (searchValue) => dispatch => {
  return new Promise((resolve, reject) => {
    console.log("getGuardianSearchList calling", searchValue)
    dispatch({  type: GET_GUARDIANSEARCH,  payload: searchValue });
  });
};


/*
 * This function is used to sort data from redux store according newest publication date and oldest publication date
 */
export const gerGuardianByDate = (filterType) => dispatch => {
  return new Promise((resolve, reject) => {
    console.log("gerGuardianByDate calling", filterType)
      dispatch({  type: GET_GUARDIANSDATESEARCH,  payload: filterType });
  });
};
