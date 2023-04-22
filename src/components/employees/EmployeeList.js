import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"
import { getAllEmployees } from "../ApiManager"
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            getAllEmployees()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
            }
    )

    return <article className="employees">
    {
            employees.map(employee => <Employee key={(`employee--${employee.id}`)}
            //props idicated to be sent to employee
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
    }
    </article>
}