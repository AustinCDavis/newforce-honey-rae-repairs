import { useEffect, useState } from "react"
import { getCustomerById, editCustomer } from "../ApiManager"

export const CustomerForm = () => {
  // TODO: Provide initial state for profile
  const [profile, updateprofile] = useState({
    address: "",
    phoneNumber: "",
    userId: 0
})

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)

// TODO: Get customer profile info from API and update state
useEffect(() => {
    getCustomerById(honeyUserObject.id)
    .then((data) => {
        const customerObject = data[0]
        updateprofile(customerObject)
    })
}, [])

const [feedback, setFeedback] = useState("")

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

const handleSaveButtonClick = (event) => {
    event.preventDefault()

    /*
        TODO: Perform the PUT fetch() call here to update the profile.
        Navigate user to home page when done.
    */
   editCustomer(profile)
   .then(() => {
    setFeedback("Profile successfully saved")
    })
}

return (<>
<div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
{feedback}
</div>
    <form className="profile">
        <h2 className="profile__title">New Profile</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Address:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.address}
                    onChange={
                        (evt) => {
                            // TODO: Update specialty property
                            const copy = {...profile}
                            copy.address = evt.target.value
                            updateprofile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Phone Numer:</label>
                <input type="text"
                    className="form-control"
                    value={profile.phoneNumber}
                    onChange={
                        (evt) => {
                            // TODO: Update rate property
                            const copy = {...profile}
                            copy.phoneNumber = evt.target.value
                            updateprofile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
</>
)
}