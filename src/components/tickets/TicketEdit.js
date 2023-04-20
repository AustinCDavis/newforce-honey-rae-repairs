import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {

    const navigate = useNavigate()
    const {ticketId} = useParams()
   
    //initial state for tickets
    const [ticket, updateTicket] = useState({
        userId: 0,
        description: "",
        emergency: false,
        dateCompleted: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(r => r.json())
        .then((data) => {
            updateTicket(data)
        })
    }, [ticketId])
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
       })
       .then(() => {
        navigate(`/tickets`)
        })

    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Update Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                updateTicket(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.emergency = event.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Save Edits
            </button>
        </form>
    )
}