export const getAllCustomers = (query) => {
    if (query) {
        return fetch(`http://localhost:8088/customers?_expand=user&${query}`)
            .then(res => res.json())
    } else {
        return fetch(`http://localhost:8088/customers?_expand=user`)
            .then(res => res.json())
    }
}

export const fetchCustomer = (method, customerId, body) => {
    if (method === "PUT") {
        return fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    } else {
        return fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
            .then(res => res.json())
    }
}

export const deleteUser = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
        .then(response => response.json())
}

export const getAllLocations = () => {
    return fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
}

export const postProducts = (body) => {
    return fetch(`http://localhost:8088/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const getAllTypes = () => {
    return fetch(`http://localhost:8088/types`)
        .then(res => res.json())
}

export const getAllPurchases = () => {
    return fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=type`)
        .then(response => response.json())
}

export const createPurchase = (body) => {
    return fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const fetchCustomerByUserID = (userId) => {
    return fetch(`http://localhost:8088/customers?userId=${userId}`)
        .then(res => res.json())
}

export const getPurchasesByCustomerID = (customerId) => {
    return fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=product`)
        .then(res => res.json())
}

export const getLocationProducts = () => {
    return fetch(`http://localhost:8088/locationProducts?_expand=location`)
        .then(response => response.json())
}

// I much preferred writing the unique fetches inside their components, however, I will continue to try it this way and see how I can better organize it.