import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {
    //to access staff boolean
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
        if (honeyUserObject.staff) {
            //Return employee view
            return <EmployeeForm/>
        }else {
            //Return cutomer view
            return <CustomerForm />
        }
    
    
}

