import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then(r => r.json())
            .then((customerArray) => {
                setCustomers(customerArray)
                console.log(customerArray)
            })
        }
    )

    return <article className="customers">
    {
            customers.map(customer => <Customer key={(`customer--${customer.id}`)}
            //props idicated to be sent to customer
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email} 
                address={customer.address}
                phone={customer.phoneNumber}
                />)
    }
    </article>
}