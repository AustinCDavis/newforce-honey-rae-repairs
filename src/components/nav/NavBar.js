import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"

export const NavBar = () => {
    //to access staff boolean
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
        if (honeyUserObject.staff) {
            //Return employee view
            return <EmployeeNav />
        }else {
            //Return cutomer view
            return <CustomerNav />
        }
    
    
}

