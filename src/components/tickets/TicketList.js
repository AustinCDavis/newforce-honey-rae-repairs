import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"
import { Ticket } from "./Ticket"


export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    const getAllTickets = () => {
        
        fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(response => response.json())
        .then((ticketArray) => {
            setTickets(ticketArray)
        })
    }

useEffect(
    () => {
        //Lowercased to make it not case sensitive
        const searchedTickets = tickets.filter(ticket => ticket.description.toLowerCase().includes(searchTermState.toLowerCase()))
        setFiltered(searchedTickets)
    }, [ searchTermState ]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
        )
    
    useEffect(
        () => {
            getAllTickets()

            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(r => r.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

        useEffect(
            () => {
                if (honeyUserObject.staff) {
                    // for employees-true
                    setFiltered(tickets)
                }
                else {
                    // for customers-false
                    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets)
                }
            },
            [tickets]

        )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)

                setFiltered(myTickets)
            }
        },
        [ openOnly ]
    )

    return <>
    {
        honeyUserObject.staff 
        ? <>
            <button className="emergencybutton" onClick={() => {setEmergency(true) } } >Emergency Only</button>
            <button className="showallbutton" onClick={() => {setEmergency(false) } } >Show All</button>
        </>
        : <>
            <button className="createTicket" onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button className="openTickets" onClick={() => updateOpenOnly(true)}>Open Tickets</button>
            <button className="allTickets" onClick={() => updateOpenOnly(false)}>All of My Tickets</button>
        </>
    }
    

    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => <Ticket employees={employees} 
                    getAllTickets={getAllTickets}
                    currentUser={honeyUserObject} 
                    ticketObject={ticket} 
                    key={`ticket--${ticket.id}`} />
            )
        }
    </article>
    </>
}


