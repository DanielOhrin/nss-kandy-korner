import "./Employees.css"
import { useState, useEffect } from "react"
import { Employee } from "./Employee"
import { getAllEmployees } from "../ApiManager"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees()
            .then(
                (data) => {
                    setEmployees(data)
                }
            )
    }, [])

    return (
        <article id="employees">
            {
                employees.map(employee => <Employee key={`employee--${employee.id}`}
                    id={employee.id}
                    name={employee.user?.fullName}
                    startDate={employee.startDate}
                    location={employee.location?.name}
                    email={employee.user?.email}
                    userId={employee.user?.id}
                    setEmployees={setEmployees}
                />)
            }
        </article>
    )
}