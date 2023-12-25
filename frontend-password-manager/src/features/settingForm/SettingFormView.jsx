import React, {useEffect, useState} from 'react';
import '@djthoms/pretty-checkbox';
import {Switch, useCheckboxState} from "pretty-checkbox-react";
import Input from "react-bootstrap-sweetalert/dist/components/Input";
import {Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {fetchSaveAccountSetting} from "./settingformSlice";


const SettingFormView = () => {
    const  setting= useSelector(state => state.setting)
    // const [checked, setChecked] = useState(true);

    const handleCheckboxChange = () => {
        if(setting.enable2FA){
            fetchSaveAccountSetting({enable2FA: false});
        } else {
            fetchSaveAccountSetting({enable2FA: true});
        }
    };

    console.log("Setting", setting)

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={setting.enable2FA}
                    onChange={handleCheckboxChange}
                />
                Allow 2 FA
            </label>
        </div>
    );
};

export default SettingFormView;
