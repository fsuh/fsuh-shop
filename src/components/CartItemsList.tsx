import { useSelector } from "react-redux/es/hooks/useSelector";
import type { RootState } from "../store";
import CartItem from "./CartItem";
import { CartProducts } from "../pages/SingleProduct";
const CartItemsList = () => {
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);

	return (
		<>
			{cartItems.map((item: CartProducts) => {
				return (
					<CartItem
						key={item.cartID}
						cartItem={item}
					/>
				);
			})}
		</>
	);
};
export default CartItemsList;
