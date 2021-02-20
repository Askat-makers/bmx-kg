import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddProduct from './containers/Admin/AddProduct';
import Admin from './containers/Admin/Admin';
import CheckOnAdmin from './containers/Admin/CheckOnAdmin';
import EditProduct from './containers/Admin/EditProduct';
import Authorization from './containers/Authorization/Authorization';
import BmxPage from './containers/BmxPage/BmxPage';
import BottomBasket from './containers/Bottombasket/BottomBasket';
import Cart from './containers/Cart/Cart';
import Catalog from './containers/Catalog/Catalog';
import Favorites from './containers/Favorites/Favorites';
import FboardPage from './containers/FboardPage/FboardPage';
import Home from './containers/Home/Home';
import Navibar from './containers/Navibar/Navibar';
import Pagintaion from './containers/Pagination/Pagintaion';
import ProductDetails from './containers/ProductDetails/ProductDetails';
import Profile from './containers/Profile/Profile';
import Registration from './containers/Registration/Registration';
import RollerPage from './containers/RollerPage/RollerPage';
import SamokatsPage from './containers/SamokatsPage/SamokatsPage';
import SkateboardPage from './containers/SkateboardPage/Skateboard';
import AdminContextProvider from './contexts/AdminContext';
import AuthContextProvider from './contexts/AuthContext';
import ProductsContextProvider from './contexts/ProductsContext';



const Routes = () => {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <ProductsContextProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/navbar" component={Navibar} />
                        <Route exact path="/bottom" component={BottomBasket} />
                        <Route exact path="/catalog" component={Catalog} />
                        <Route exact path="/bmx" component={BmxPage} />
                        <Route exact path="/fboard" component={FboardPage}/>
                        <Route exact path="/samokats" component={SamokatsPage}/>
                        <Route exact path="/skate" component={SkateboardPage}/>
                        <Route exact path="/roller" component={RollerPage}/>
                        <Route exact path="/pagination" component={Pagintaion}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/favorites" component={Favorites}/>
                        <Route exact path="/product-details:id" component={ProductDetails}/>

                    </Switch>
                </ProductsContextProvider>
                <Switch>
                    <AdminContextProvider>
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/addProduct" component={AddProduct} />
                        <Route exact path="/editProduct" component={EditProduct} />
                        <Route exact path="/checkOnAdmin" component={CheckOnAdmin} />
                    </AdminContextProvider>
                </Switch>
                <Switch>
                    <AuthContextProvider>
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/auth" component={Authorization} />
                        <Route exact path="/profile" component={Profile} />
                    </AuthContextProvider>
                </Switch>
            </BrowserRouter>
        </CookiesProvider>
    );
};

export default Routes;