import "./SearchProducts.css"
import { useState, useEffect } from "react"
import { getAllPurchases, getLocationProducts } from "../../ApiManager"

export const SearchProducts = () => {
    const [products, setProducts] = useState([])
    const [results, setResults] = useState([])
    const [locationProducts, setLocationProducts] = useState([])

    useEffect(() => {
        getAllPurchases()
            .then(
                (data) => {
                    setProducts(data)
                }
            )
        
            getLocationProducts()
                .then(
                    (data) => setLocationProducts(data)
                )
    }, [])

    const showLocations = (event) => {
        event.preventDefault()

        const [, productId] = event.target.parentNode.id.split("--")
        const lPs = locationProducts.filter(lP => lP.productId === parseInt(productId))

        window.alert(
            lPs.map(lP => {
                return lP.location.address
            }).join(`\r\n`)
        )
    }

    return (
        <>
            <article id="container">
                <section key={1} id="form">
                    <label htmlFor="searchProducts">What candy are you looking for?</label>
                    <input type="text" name="searchProducts" onChange={(event) => {
                        const filteredProducts = products.filter(product => product.name.toLowerCase().startsWith(event.target.value.toLowerCase()) && event.target.value.replace(" ", "") !== "")
                        setResults(filteredProducts)
                    }} />
                </section>
                <section key={2} id="products">
                    {
                        results.map(product => {
                            return <div id={`product--${product.id}`} key={`product--${product.id}`}>
                                <h4>{product.name}</h4>
                                <ul>
                                    <li>Price: ${product.ppu}</li>
                                </ul>
                                <div className="address-link" onClick={(event) => (showLocations(event))}>Show me where</div>
                            </div>
                        })
                    }
                </section>
            </article>
        </>
    )
}