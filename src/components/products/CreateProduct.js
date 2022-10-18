import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllTypes, postProducts } from "../ApiManager"
import "./CreateProduct.css"

export const CreateProduct = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        typeId: "",
        ppu: ""
    })

    const [types, setTypes] = useState([])

    useEffect(() => {
        getAllTypes()
            .then(
                (data) => {
                    setTypes(data)
                }
            )
    }, [])

    const saveProduct = (event) => {
        event.preventDefault()

        if (!Object.values(formData).includes("")) {
            return postProducts(formData)
                .then(
                    () => {
                        navigate("/products")
                    }
                )
        } else {
            window.alert(`Please fill out every field.`)
        }
    }

    return (
        <>
            <h2>Create New Product</h2>
            <form>
                <label htmlFor="name">Choose Name:</label>
                <input type="text" placeholder="product name" onChange={(event) => {
                    const copy = { ...formData }
                    copy.name = event.target.value

                    setFormData(copy)
                }} />

                <label htmlFor="type">Choose Type:</label>
                <select name="type" onChange={(event) => {
                    const copy = { ...formData }
                    copy.typeId = event.target.value

                    setFormData(copy)
                }}>
                    <option key={0} value={0} hidden>Types</option>
                    {
                        types.map(type => {
                            return <option key={type.id} value={type.id}>{type.label}</option>
                        })
                    }
                </select>

                <label htmlFor="price">Price:</label>
                <input type="text" name="price" placeholder="0.00" onChange={(event) => {
                    const copy = { ...formData }
                    copy.ppu = event.target.value

                    setFormData(copy)
                }}></input>

                <button id="save-btn" type="button" onClick={(event) => { saveProduct(event) }}>Save Product</button>
            </form>
        </>
    )
}
