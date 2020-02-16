import { combineReducers } from 'redux'
import guardianReducer from "./guardianReducer";

const rootReducer = combineReducers({  
	  guardian: guardianReducer
})

export default rootReducer