import React, { useContext } from "react";
import AppContext from "./Context";
import {Navigate, Route} from "react-router-dom";

function Auth(props){
    console.log(props)

    const { login } = useContext(AppContext)

    if(!login){
        return (<Navigate replace to="/" />)
    }

    return (<Route {...props} />)

}

export default Auth