import { useState, useEffect } from "react"
import { fetchCustomerByUserID, getPurchasesByCustomerID } from "../../ApiManager"
import "./MyOrders.css"

export const MyOrders = () => {
    const [userObj] = useState(JSON.parse(localStorage.getItem("kandy_user"))), // Set User Object on initial state render
        [purchases, setPurchases] = useState([]), // Fetch array of the customer's purchases based on userObj.id
        [customer, setCustomer] = useState({})

    useEffect(() => {
        fetchCustomerByUserID(userObj.id)
            .then(data => setCustomer(data[0]))
    }, [userObj])

    useEffect(() => {
        if (!customer.id) return;

        getPurchasesByCustomerID(customer.id)
            .then(
                (data) => {
                    setPurchases(data)
                })
    }, [customer])
    
    return <article className="purchases">
        <section>
            <h3>My Orders</h3>
            {
                purchases.reduce((arr, obj) => {
                    let newCount = arr.find(purchase => purchase.product?.id === obj.product?.id)
                    if (newCount) newCount.amount ++;

                    return newCount
                    ? [...arr]
                    : [...arr, obj]
                }, []).map(purchase => {
                    return (
                        <div key={`purchase--${purchase.id}`} className="purchase">
                            <>{purchase.product?.name} x{purchase.amount} = ${purchase.product?.ppu * purchase.amount}</>
                        </div>
                    )
                })
            }
        </section>
    </article>
}

//* Nullish coalescing operator (??) Return right when left is null or undefined
// [filteredPurchases, setFilteredPurchases] = useState([]) Original useState

// *Original useEffect for combining purchases:
// useEffect(() => {
//     const data = [...purchases]
    
//     setFilteredPurchases(
//         data.reduce((arr, obj) => {
//             const newCount = arr.find(purchase => purchase.product?.id === obj.product?.id)?.amount
            
//             if (newCount) {
//                 arr.find(purchaseObj => purchaseObj.product?.id === obj.product?.id).amount = newCount + 1
//                 return [...arr]
//             } else {
//                 return [...arr, obj]
//             }
//         }, [])
//     )
// }, [purchases])
                   
// *V2 of the useEffect
// useEffect(() => {
//     const data = [...purchases]
                    
//     setFilteredPurchases(
//         data.reduce((arr, obj) => {
//             let newCount = arr.find(purchase => purchase.product?.id === obj.product?.id)
//             if (newCount) newCount.amount++;
                    
//             return newCount
//                 ? [...arr]
//                 : [...arr, obj]
//         }, [])
//     )
// }, [purchases])

//* I re-read the instructions, and the challenge was to include the .reduce inside of the JSX itself, which actually made it look a lot cleaner