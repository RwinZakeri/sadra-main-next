import React from 'react';

//css
import { Button, TextField } from '@mui/material';
// import AuthForm from '../components/modules/AuthModules/AuthForm';
import AuthForm from '../module/AuthModules/AuthForm';

const AuthLogin = () => {

    return (
        <div className='authDiv'>
            <AuthForm/>
        </div>
    );
};

export default AuthLogin;