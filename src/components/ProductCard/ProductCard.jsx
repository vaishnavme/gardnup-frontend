import { Link } from "react-router-dom";
import { useState } from "react";
import { useData, useAuth } from "../../context";
import * as AIicons from "react-icons/ai";
import { checkIn, Modal } from "../index";
import styles from "./ProductCard.module.css";

export const ProductCard = ({product}) => {
    const { wishListItems, addToWishlist, removeFromWishlist } = useData();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const wishBtnHandler = (productID) => {
        user ? (
            checkIn(wishListItems, productID) ?
            removeFromWishlist({product: productID})
            : addToWishlist({product: productID})
        ) : setShowModal(true)
    }

    const modalCloseBtn = () => {
        setShowModal(() => !showModal);
    }

    return (
        <>
        {showModal && <Modal modalCloseBtn={modalCloseBtn}/>}
        <div className={`${styles.productContainer}`}>
            <Link to={`/products/${product._id}`}>
                <div className={`${styles.productCard}`}>
                    <img className={`${styles.productImg}`} src={product.image} alt={product.name}/>
                    <div className={`${styles.productInfo}`}>
                        <div className={`h6`}>{product.name}</div>
                        <div className={`h6 f-light`}>₹ {product.price}</div>
                    </div>
                </div>
            </Link>
            <div>
                <button
                    className={`btn iconBtn ${styles.wishlistBtn}`} 
                    onClick={() => wishBtnHandler(product._id)}>
                    {checkIn(wishListItems, product._id) ? <AIicons.AiFillHeart className={`${styles.fillWishlist}`}/> : <AIicons.AiOutlineHeart/>}                </button>
            </div>
        </div>
        </>
    )
}