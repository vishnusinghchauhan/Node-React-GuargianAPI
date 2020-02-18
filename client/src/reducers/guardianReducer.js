import { GET_GUARDIANLIST, GET_GUARDIANDETAIL,GET_GUARDIANSEARCH, GET_GUARDIANSDATESEARCH } from "../actions/types";

const initialState = {
    guardiansList: [],
    guardiansDetail:{}
}

const guardianReducer = (state = initialState, action) => {
    switch (action.type) {
        // store all gurdianlist to  guardiansList Array
        case GET_GUARDIANLIST:
            return {
                ...state,
                guardiansList: action.payload,
            };
        // store all gurdiandetail to  guardiansDetail object
        case GET_GUARDIANDETAIL:
            return {
                ...state,
                guardiansDetail: action.payload,
        };
        // Sort all gaurdian list according to newest and oldest web publication date  
        // and update guardiansList according to requirement
        case GET_GUARDIANSDATESEARCH:
            let gaurdianData = state.guardiansList;
            if(action.payload == "newest"){
                gaurdianData.sort(function(a,b){
              return new Date(b.webPublicationDate) - new Date(a.webPublicationDate);
            });
            }else{
                gaurdianData.sort(function(a,b){
                  return new Date(a.webPublicationDate) - new Date(b.webPublicationDate);
                });
            }
            return {
                ...state,
                guardiansList: gaurdianData,
        };
        // Sort search gaurdian list according to user input 
        // and update guardiansList according to requirement
        case GET_GUARDIANSEARCH:
            let searchValue = action.payload
            let array = state.guardiansList;
            let foundArr =[]
            if(searchValue.length > 0){
             foundArr = array.filter((item) => {
                  const savageMatch = JSON.stringify(item)
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) !== -1
                  console.log(savageMatch)
                  if (savageMatch) return true
                })
            }else{
                 foundArr = array
            }
            return {
                ...state,
                guardiansList: foundArr,
            };  

	    default:
	        return state
	    }
}

export default guardianReducer;