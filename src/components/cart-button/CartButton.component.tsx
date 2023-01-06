import { useNavigate } from "react-router-dom";

import { useAuthContext } from "contexts/auth.context";
import { useCartContext } from "contexts/cart.context";

import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartButton.styles.module.css";

type CartButtonPropsType = {
    wishlistElementType: "button" | "nav-icon"
    productId?: string
    className?: string
}

const CartButton = ({ productId, wishlistElementType, className }: CartButtonPropsType) => {
    const { signedIn } = useAuthContext()
    const { cartList, cartListCount, addToCart } = useCartContext()
    const isCartItem = cartList?.find((cartProduct) => cartProduct.product._id === productId)
    const navigate = useNavigate()

    if (wishlistElementType === 'nav-icon') {
        return (
            <div className={styles['cart-icon-wrapper']}>
                <FaShoppingCart size="24" />
                {signedIn && <span className="count-icon fw-500">{cartListCount}</span>}
            </div>
        )
    } else if (wishlistElementType === 'button') {
        return (
            <>
                {
                    isCartItem
                        ? (
                            <button
                                className={className}
                                onClick={() => navigate('/cart')}
                            >
                                Go To Cart
                            </button>
                        )
                        : (
                            <button
                                className={className}
                                onClick={() => {
                                    addToCart(productId)
                                }}
                            >
                                Add to Cart
                            </button>
                        )
                }
            </>
        )
    } else {
        return null
    }
}

export default CartButton;