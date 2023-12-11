import React, { useState } from "react";
import data from "bootstrap/js/src/dom/data";
import {useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
// import { saveForm  , } from "./formSlice";
// import {useDispatch, useSelector} from "react-redux";


function ListView(){
    const app = useSelector(state => state.app);
    const url = app.currentUrl;
    var  data = []
    const  account = JSON.parse(window.localStorage.getItem("account")) ;
    console.log(account[url],"account")
    if(url){
        if(!account || !account[url]){
            console.log('aa')
        } else {
            console.log(1111)
            data = Object.values(account[url]);
        }

    } else{

    }

    console.log(data,"data")

    console.log(data)
    return (
        <div>
            <h2>List View</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>username : {item.username}   password :  {item.password}</li>
                ))}
            </ul>
        </div>
    )

}

export default ListView;