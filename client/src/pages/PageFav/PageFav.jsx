import React, { useContext, useEffect } from "react"
import { useSelector } from "react-redux";
import ContainerFav from "./ContainerFav/ContainerFav";
import { useDispatch } from "react-redux";
import { checkLocation } from "../../store/location/location";
import { useLocation } from "react-router-dom";
import Title from '../../components/Title/Title';
import {addToWishlist, fetchWishlist} from "../../store/wishlist/ActionCreator";
import { AuthContext } from "../../context/AuthContext";

const PageFav = () => {
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const location = useLocation();
    const favCounter = useSelector((state) => state.counter)
    const { favItems, isItemsLoading } = useSelector((state) => state.wishlist)
    const auth = useContext(AuthContext)

    const { isAuthenticated } = auth

    // console.log(location)
    // console.log(favCounter)
    console.log(favItems)
    const { itemNo } = favItems.products
    console.log(favItems.products)

    useEffect(() => {
      dispatch(checkLocation(location.pathname))
    }, []);

    const findItemsFav = () => {
        const itemsFav = JSON.parse(localStorage.getItem('fav'));

        if (itemsFav) {
            return products.products.filter(item => itemsFav.includes(item._id))
        }
    }

    const addAuthorized = () => {
       dispatch(addToWishlist(itemNo))
    }

    useEffect(() => {
        dispatch(fetchWishlist())
    }, []);

    return (
        <div className="container">
            <Title subtitle={
                favCounter.inFav ? "Your favourite cards" : "No cards in favourites"
            }/>
            { isItemsLoading && <h1 style={{ textAlign: 'center' }}> Loading... </h1> }
            <ContainerFav
                items={ isAuthenticated ?  favItems.products : findItemsFav() }
                // items={ findItemsFav() }
                // items={ addAuthorized() }
            />
        </div>
    )
}

// isAuthenticated ? addAuthorized() :

export default PageFav;