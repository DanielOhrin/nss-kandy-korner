import { useState, useEffect } from "react"
import { Customer } from "./Customer"
import { getAllCustomers} from "../ApiManager"
import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getAllCustomers("_embed=purchases")
            .then(
                (data) => {
                    setCustomers(data.sort((a, b) => b.purchases.length - a.purchases.length))
                }
            )
    }, [])

    return (
        <article id="customers">
            {
                customers.map(customer => <Customer key={`customer--${customer.id}`}
                    id={customer.id}
                    name={customer?.user?.fullName}
                    email={customer?.user?.email}
                    purchases={customer.purchases}
                />)
            }
        </article>
    )
}