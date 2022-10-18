import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const user = localStorage.getItem("kandy_user")
    const userObj = JSON.parse(user)

    if (userObj.staff) {
        // Display Employee Nav
        return <EmployeeNav />
    } else {
        // Display Customer Nav
        return <CustomerNav />
    }
}

