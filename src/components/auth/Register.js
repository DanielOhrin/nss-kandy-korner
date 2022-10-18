import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    const [employee, setEmployee] = useState({})
    const [locations, setLocations] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then(
                (data) => {
                    setLocations(data)
                }
            )
    }, [])

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("kandy_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))
                    if (createdUser.isStaff) {
                        const newEmployee = {
                            userId: createdUser.id,
                            ...employee
                        }

                        fetch(`http://localhost:8088/employees`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newEmployee)
                        })
                            .then(() => navigate("/employees"))
                    } else {
                        const customer = {
                            userId: createdUser.id,
                            loyaltyNumber: Math.ceil(Math.random() * 99999)
                        }

                        fetch(`http://localhost:8088/customers`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(customer)
                        })
                            .then(() => navigate("/"))
                    }
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Kandy Korner</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...user }
                        copy.isStaff = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                {
                    user.isStaff ?
                        <>
                            <fieldset>
                                <label htmlFor="location">Location:</label>
                                <select className="employee-input" name="location" onChange={(event) => {
                                    const copy = {...employee}
                                    copy.locationId = parseInt(event.target.value)

                                    setEmployee(copy)
                                }}>
                                    <option key={0} value="0" hidden>Locations</option>
                                    {
                                        locations.map(location => {
                                            return <option key={`location--${location.id}`} id={`location--${location.id}`} value={location.id}>{location.name}</option>
                                        })
                                    }
                                </select>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="startDate">Start Date:</label>
                                <input className="employee-input" type="date" name="startDate" onChange={(event) => {
                                    const copy = {...employee}
                                    copy.startDate = event.target.value

                                    setEmployee(copy)
                                }} />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="payRate">Hourly Pay:</label>
                                <input className="employee-input" type="text" name="payRate" placeholder="round to whole number" onChange={(event) => {
                                    const copy = {...employee}
                                    copy.payRate = parseInt(event.target.value)

                                    setEmployee(copy)
                                }}/>
                        </fieldset>
                        </> : ""
                }
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

