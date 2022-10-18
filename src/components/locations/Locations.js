import { useState, useEffect } from "react"
import { getAllLocations } from "../ApiManager"

export const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        getAllLocations()
            .then(
                (data) => {
                    setLocations(data)
                }
            )
    }, [])

    return (
        <>
        <h2>Locations</h2>
        <section id="locations-container">
            {locations.map(location => {
                return <div className="location-div" key={location.id}>
                    <h4>{location.name}</h4>
                    <ul className="location-ul">
                        <li>Address: {location.address}</li>
                        <li>Sqr. Ft: {location.squareFootage}</li>
                    </ul>
                </div>
            })}
        </section>
        </>
    )
}