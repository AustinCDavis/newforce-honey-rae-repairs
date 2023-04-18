import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
            .then(r => r.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
                console.log(employeeArray)
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