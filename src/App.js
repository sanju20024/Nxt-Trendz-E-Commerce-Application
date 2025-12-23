import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(x => x.id === product.id)

    if (existingItem) {
      const updatedList = cartList.map(x =>
        x.id === product.id
          ? {...x, quantity: x.quantity + product.quantity}
          : x,
      )
      this.setState({cartList: updatedList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...product, quantity: 1}],
      }))
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(x => x.id === id)
    if (item.quantity === 1) {
      const newList = cartList.filter(x => x.id !== id)
      this.setState({cartList: newList})
      return
    }
    const updatedList = cartList.map(x =>
      x.id === id ? {...x, quantity: x.quantity - 1} : x,
    )
    this.setState({cartList: updatedList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(x =>
      x.id === id ? {...x, quantity: x.quantity + 1} : x,
    )
    this.setState({cartList: updatedList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const afterRemoving = cartList.filter(x => x.id !== id)
    this.setState({cartList: afterRemoving})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
