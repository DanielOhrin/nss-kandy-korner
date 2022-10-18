import "./Customers.css"
import { Link } from "react-router-dom"

export const Customer = ({id, name, email, purchases}) => {

    return <section id={id} className="customer">
    <header>
        <Link to={`/customers/${id}`}>{name}</Link>
    </header>

    <div><strong>Purchases:</strong> {purchases.length}</div>
    <div><strong>Email:</strong> {email}</div>
</section>
}