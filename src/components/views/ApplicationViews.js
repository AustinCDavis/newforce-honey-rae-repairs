import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
    //to access staff boolean
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

        if (honeyUserObject.staff) {
            //Return employee view
            return <EmployeeViews />
        }else {
            //Return cutomer view
            return <CustomerViews />
        }

}

