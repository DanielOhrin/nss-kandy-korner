import { CustomerView } from "./CustomerView"
import { EmployeeView } from "./EmployeeView"

export const ApplicationViews = () => {
	const user = localStorage.getItem("kandy_user")
	const userObj = JSON.parse(user)

	if (userObj.staff) {
		// Display Employee View
		return <EmployeeView />
	} else {
		// Display Customer View
		return <CustomerView />
	}
}

