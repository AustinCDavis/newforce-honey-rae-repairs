import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import { getAllCustomers } from "../ApiManager"
import "./Customers.css"
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getAllCustomers()
                .then((customers) => {
                        setCustomers(customers)
                    }
                )
        },
        []
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