import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from './context/AuthContext'
import { fetchProducts } from './store/products/productSlice'
import { login } from './store/tokenWork/tokenWork'
import { fetchAddToCart, fetchGetAllFromCart } from './store/cart/cart'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRouter from './router/AppRouter'
import './styles/App.scss'
import { fetchWishlist } from './store/wishlist/ActionCreator'
import { useLocation } from 'react-router-dom'
import { checkLocation } from './store/location/location'
import { addToWishlist } from './store/wishlist/ActionCreator'
import { fetchGetUser } from './store/user/userSlice'
import Loader from './components/Loader'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const locationLogin = useSelector(state => state.location.locationLogin)
  const isAuthenticated = !!token
  const location = useLocation()
  useSelector(state => state.counter)
  const counterInCart = useSelector(state => state.counter.inCart)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(checkLocation(location.pathname))
    const data = JSON.parse(localStorage.getItem('userToken'))
    if (data && data.token) dispatch(login(data.token))
    if (token) {
      dispatch(fetchGetAllFromCart())
      dispatch(fetchWishlist())
      dispatch(fetchGetUser())

      const cards = JSON.parse(localStorage.getItem('cart'))
      if (JSON.parse(localStorage.getItem('cart'))) {
        cards.map(item => dispatch(fetchAddToCart(item)))
        const favs = JSON.parse(localStorage.getItem('fav'))
        if (cards) {
          cards.map(item => {
            dispatch(fetchAddToCart(item))
          })
          localStorage.removeItem('cart')
        }
        if (favs) {
          favs.map(item => {
            dispatch(addToWishlist(item))
          })
          localStorage.removeItem('fav')
        }
      }
    }
  }, [dispatch, token, locationLogin, location.pathname])

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated
      }}
    >
      <Header />
      <AppRouter counterInCart={counterInCart} token={token} />
      {!locationLogin ? <Footer /> : null}
    </AuthContext.Provider>
  )
}

export default App
