import { useEffect } from "react";
import { logout } from "../../services/authService";

function Logout(){
    useEffect(() => {
        logout()
    }, [])


    return(
        <h1>This is page logout</h1>
    )
}

export default Logout