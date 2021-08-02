import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import {BASE_URL}  from "../../api";
import { useAuth, useLoader } from "..";
import { dataReducer } from "./data-reducer";

const DataContext = createContext();

const initialState = {
    productData: [],
    cartItems: [],
    wishListItems: [],
    showInventoryAll: [],
    categories: [],
    sizeSelect: [],
    rating: null,
    sortBy: null
}

export const DataProvider = ({children}) => {
    const { user, token } = useAuth();
    const { isLoading ,setLoading} = useLoader();
    
    const [{
        productData,
        cartItems,
        wishListItems,
        showInventoryAll,
        categories,
        sizeSelect,
        sortBy,
        rating
    }, dispatch] = useReducer(dataReducer, initialState)

    // data fetching operations
    const getProductData = async() => {
        try {
            setLoading(true);
            const {data: {product}} = await axios.get(`${BASE_URL}/products`);
            dispatch({type: "SET_DATA", payload: product});
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async () => {
        try {
            //get user cart items
            const  { data:{cart} } = await axios.get(`${BASE_URL}/cart/${user._id}`);
            const userCart = cart.cartItems;
            const userCartItems = userCart.map((item) => {
                return { ...item.product, quantity: item.quantity };
            });
            dispatch({type: "SET_CART", payload: userCartItems})

            //get user wishlist
            const  { data:{wishlist} } = await axios.get(`${BASE_URL}/wishlist/${user._id}`); 
            const userWishlist = wishlist.wishlist;
            dispatch({type: "SET_WISHLIST", payload: userWishlist})

        } catch(err) {
            console.log()
        }
    }

    useEffect(() => {
         getProductData();
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        token && getUserData();
        // eslint-disable-next-line
    },[user, token]);

    return (
        <DataContext.Provider value={{
            productData,
            cartItems,
            wishListItems,
            showInventoryAll,
            categories,
            sizeSelect,
            sortBy,
            rating,
            dispatch,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);