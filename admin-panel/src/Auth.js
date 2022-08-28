import React, { useContext } from "react";
import AppContext from "./Context";
import {Navigate, Route} from "react-router-dom";

function Auth(props){
    console.log(props)

    const { login } = useContext(AppContext)

    if(login){
        return (<Route {...props} />)
    }

    return (<Navigate to="/" replace />)

}

export default Auth