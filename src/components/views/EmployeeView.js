import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeList } from "../employees/EmployeeList"
import { Locations } from "../locations/Locations"
import { CreateProduct } from "../products/CreateProduct"
import { Products } from "../products/Products"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"

export const EmployeeView = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 id="main-h1">Kandy Korner</h1>
					<p id="main-p">The sweetest place in the world!</p>

					<Outlet />
				</>
			}>
				<Route path="locations" element={<Locations />} />
				
				<Route path="products" element={<Products />} />
				<Route path="add-product" element={<CreateProduct />} />

				<Route path="employees" element={<EmployeeList />} />
				<Route path="customers" element={<CustomerList />} />
				<Route path="customers/:customerId" element={<CustomerDetails />} />
			</Route>
		</Routes>
	)
}
