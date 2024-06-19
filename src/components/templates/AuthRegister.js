import { Button, TextField } from '@mui/material';
import AuthForm from "../module/AuthModules/AuthForm";

function AuthRegister() {
  return (
    <div className="authDiv">
      <AuthForm isRegister />
    </div>
  )
}

export default AuthRegister
