import { Link, json } from "react-router-dom"
import { claimTicket, deleteTicket, editTicket } from "../ApiManager"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null
    
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "" && currentUser.staff) {
            return <button onClick={closeTicket} className="ticket_finish">Finish</button>
        } else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                deleteTicket(ticketObject.id)
                    .then(getAllTickets)
            }} className="ticket_delete">Delete</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy ={
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date() 
        }

        return editTicket(ticketObject.id, copy)
            .then(getAllTickets)
    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                        onClick={() => {
                            claimTicket(ticketObject.id, userEmployee.id)
                            .then(() => {
                                getAllTickets()
                            })
                    }}
                    >Claim</button>
        }else {
            return "Your ticket is now in que awaiting one of our specialists."
        }
    }

    return <section className="ticket" >
            <header>
                {
                    currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}
            <hr></hr>
            </section>
            <footer>
                <div className="footer">
                {
                    ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
                }
                {
                    canClose()
                }
                {
                    deleteButton()
                }
                </div>
            </footer>
        </section>
}