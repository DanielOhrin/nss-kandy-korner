import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { Products } from "../products/Products"
import { SearchProducts } from "../products/search/SearchProducts"
import { MyOrders } from "../products/Orders/MyOrders"

export const CustomerView = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 id="main-h1">Kandy Korner</h1>
					<p id="main-p">The sweetest place in the world!</p>

					<Outlet />
				</>
			}>
				<Route path="locations" element= { <Locations />} />
				<Route path="products" element= { <Products /> } />
				<Route path="searchProducts" element={ <SearchProducts /> } />
				<Route path="orders" element={ <MyOrders /> } />
			</Route>
		</Routes>
	)
}
