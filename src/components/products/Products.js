import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createPurchase, getAllCustomers, getAllPurchases } from "../ApiManager"
import "./Products.css"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()
    const userObj = JSON.parse(localStorage.getItem("kandy_user"))

    useEffect(() => {
        getAllPurchases()
            .then(
                (data) => {
                    setProducts(data)
                }
            )
        
        getAllCustomers()
                .then(data => setCustomers(data))
    }, [])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    const purchaseCandy = (evt) => {
        const body = {
            customerId: customers.find(customer => customer.userId === userObj.id).id,
            productId: parseInt(evt.target.value),
            amount: 1
        }
        
        createPurchase(body)
    }

    return (
        <>
            <div id="buttons-container">
                    <button id="sortByPrice" onClick={() => {
                        setFilteredProducts(products.filter(product => product.ppu > 1.99))
                    }}>Expensive Products</button>
            {
                userObj.staff ? 
                <button id="createProduct" onClick = {() => {
                    navigate("/add-product")
                }}>Create Product</button> : ""
            }
            </div>
            <h2>Products</h2>

            <section id="product-container">
                {filteredProducts.map(product => {
                    return <div key={`product--${product.id}`}>
                        <h4>{product.name}</h4>
                        <ul>
                            <li>Type: {product.type.label}</li>
                            <li>Price: ${product.ppu}</li>
                        </ul>
                            {
                                !userObj.staff 
                                    ? <button value={`${product.id}`} onClick={purchaseCandy}>Purchase</button>
                                    : ""
                            }
                    </div>
                })}
            </section>
        </>
    )
}
