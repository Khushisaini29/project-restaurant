import {Outlet,Navigate} from 'react-router'
import Auth from '../store/AuthStore';

const RoleRouter = () => {
    const {isAdmin} = Auth();
    if(isAdmin =='admin'){
        return <Outlet/>
    }
    else{
        return <Navigate to='/' />
    }

  
}

export default RoleRouter