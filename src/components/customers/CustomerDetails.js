import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchCustomer } from "../ApiManager"
import "./CustomerDetails.css"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, setCustomer] = useState({})
    const [loyalty, setLoyalty] = useState("")

    useEffect(() => {
        fetchCustomer("GET", customerId)
            .then(
                (data) => {
                    setCustomer(data)
                }
            )
    }, [customerId])

    useEffect(() => {
        if (loyalty.length > 5) {
            const copy = Array.from(loyalty)
            copy.splice(5)

            setLoyalty(copy.join(""))
        }
    }, [loyalty])

    const updateLoyalty = () => {
        const copy = { ...customer }
        delete copy.user
        copy.loyaltyNumber = parseInt(loyalty)

        fetchCustomer("PUT", customerId, copy)
            .then(() => {
                fetchCustomer("GET", customerId)
                    .then(
                        (data) => {
                            setCustomer(data)
                        })
            })

        setLoyalty("")
    }

    return <article id="parent">
        <section id="customerDetails">
            <header><strong> {customer?.user?.fullName}</strong></header>
            <div><strong>Loyalty#:</strong> {customer?.loyaltyNumber}</div>
            <div><strong>Email:</strong> {customer?.user?.email}</div>
        </section>
        <>
            <label htmlFor="loyalty">New Loyalty #:</label>
            <input type="number" id="loyalty" name="loyalty" placeholder="00000" value={loyalty} onChange={(evt) => {
                setLoyalty(evt.target.value)
            }}></input>
        </>
        <button id="update-loyalty" onClick={updateLoyalty} >Update</button>
    </article>
}