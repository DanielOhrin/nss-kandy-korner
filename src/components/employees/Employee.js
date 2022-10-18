import { deleteUser } from "../ApiManager"
import { getAllEmployees } from "../ApiManager"
import "./Employees.css"

export const Employee = ({ id, name, location, startDate, email, userId, setEmployees }) => {

    const fire = (evt) => {
        deleteUser(userId)
            .then(res => {
                if (res.ok) {
                    getAllEmployees()
                        .then(data => setEmployees(data))
                }
            })
    }

    return <section id={id} className="employee">
        <header>{name}</header>
        <div><strong>Location:</strong> {location}</div>
        <div><strong>Start Date:</strong> {startDate}</div>
        <footer>{email}</footer>
        <button id={`fire--${id}`} onClick={fire}>Fire Employee</button>
    </section>
}