import { useEffect } from 'react';
import "@stripe/stripe-js";
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import { LoadUser } from './actions/UsreAction';
import store from './store'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom'
import Login from './components/Login';
import CreateProduct from './components/CreateProduct';
import DeleteProduct from './components/DeleteProduct';
import Profile from './components/Profile';
import Passwordchange from './components/Passwordchange';
import Cart from './components/Cart';
import ConfirmOrder from './components/ConfirmOrder';
import Payment from './components/Payment';
import Forgotpassword from './components/Forgotpassword';
import { Cartget } from './actions/CartAction';
import { useDispatch } from 'react-redux';
import Dash from './components/Dash';
import Category from './components/Category';
import Dummy from './components/Dummy';
import AddProductToCateg from './components/AddProductToCateg';
import Navbar from './components/Navbar'
import Slider from './components/Slider';
import UpdateProduct from './components/Updateproduct';
import MyOrders from './components/MyOrders';
import { OrderDeaitls } from './components/OrderDetails';
import ConfirmPayment from './components/ConfirmPayment';
import AllOrders from './components/AllOrders';
import AdminOrderDets from './components/AdminOrderDets';
import SliderView from './components/SliderView';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CatHome from './components/CatHome';
import CatDemo from './components/CatDemo';
import SliderDemo from './components/SliderDemo'
import ProductSlider from './components/ProductSlider';
const stripePromise = loadStripe('pk_test_51LMx3DL1YzgC3DzG6LlsBkHEgHUNPmKgrHfquiwrDIJBlvE0Hrr9St7a6l8OKJ15h4w20qTgbs7YMliIHFbGiYNx00u2sWGH7d');

function App() {
const disptach=useDispatch()
  useEffect(()=>{
  const user= store.dispatch(LoadUser())
disptach(Cartget())
  
  },[])
  return (
    <div>
    <Router>
    <div className="App">
    <Header/>
    <Switch>
    <Route  path="/product/:id">
      <ProductDetails/>
      </Route>
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path="/cathome" exact>
      <CatHome/>
      </Route>
      <Route path="/catdemo" exact>
      <CatDemo/>
      </Route>
      <Route path="/sliderdemo" exact>
      <SliderDemo/>
      </Route>
      <Route path="/login" exact>
      <Login/>
      </Route>
      <Route path="/register" exact>
      <Register/>
      </Route>
      <Route path="/search/:keyword">
      <Home/>
      </Route>
      <Route path="/dashboard" exact>
      
      <Dash/>
        
      </Route>
      <Route path="/createProduct" exact>
      
      <CreateProduct/>
        
      </Route>
      <Route path="/delProduct" exact>
      
      <DeleteProduct/>
        
      </Route>
      <Route path="/updateProduct" exact>
      
      <UpdateProduct/>
        
      </Route>
      <Route path="/prodslide" exact>
      
      <ProductSlider/>
        
      </Route>
      <Route path="/userProfile" exact>
      
      <Profile/>
        
      </Route>
      <Route path="/PwdChange" exact>
      
      <Passwordchange/>
        
      </Route>
      <Route path="/cart" exact>
      
      <Cart/>
        
      </Route>
      <Route path="/confirmOrder" exact>
        <Elements stripe={stripePromise}>
        <ConfirmOrder/>
        </Elements>
      </Route>
      <Route path="/cart" exact>
      
      <Cart/>
        
      </Route>
      <Route path="/slider" exact>
      
      <Slider/>
        
      </Route>
      <Route path="/sliderView" exact>
      
      <SliderView/>
        
      </Route>
      <Route path="/payment" exact>
      
      <Payment/>
        
      </Route>
      <Route path="/category" exact>
      
      <Category/>
        
      </Route>
      <Route path="/dummy" exact>
      
      <Dummy/>
        
      </Route>
      <Route path="/paymentStatus/:status/:id" exact>
      
      <ConfirmPayment/>
        
      </Route>
      <Route path="/myOrders" exact>
      
      
        <MyOrders/>
      </Route>
      <Route path="/allorders" exact>
      
      <AllOrders/>
      </Route>
      <Route path="/orderDetails/:id" exact>
      
      <OrderDeaitls/>
    </Route>
    <Route path="/orderDetails/admin/:id" exact>
      
      <AdminOrderDets/>
    </Route>
      <Route path="/category/:categ/:typo" exact>
      <Category/>
     
        
      </Route>
      <Route path="/addProductToCateg/:typo/:categ" exact>
      
     
        <AddProductToCateg/>
      </Route>
      <Route path="/password/forgot" exact>
      
      <Forgotpassword/>
        
      </Route>
      </Switch>
      <Footer/>
    </div>
   
    </Router>
    </div>
  );
}

export default App;
