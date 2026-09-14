import Auth from "../store/AuthStore.js";
import DashbordAdmin from "../pages/Admin/DashbordAdmin";
import DashbordUser from "../pages/User/DashbordUser";

const Dashbord = () => {

    const { isAdmin } = Auth();

    if (isAdmin === "admin") {
        return <DashbordAdmin />;
    } 
    else if(isAdmin=="user"){
        return <DashbordUser />;
    }
    else{
            return(<h1>Login failed</h1>)
    }
};

export default Dashbord;