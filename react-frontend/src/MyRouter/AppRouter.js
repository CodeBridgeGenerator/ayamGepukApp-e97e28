import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleUserDetailsPage from "../components/app_components/UserDetailsPage/SingleUserDetailsPage";
import UserDetailProjectLayoutPage from "../components/app_components/UserDetailsPage/UserDetailProjectLayoutPage";
import SingleTransactionsPage from "../components/app_components/TransactionsPage/SingleTransactionsPage";
import TransactionProjectLayoutPage from "../components/app_components/TransactionsPage/TransactionProjectLayoutPage";
import SingleWalletPage from "../components/app_components/WalletPage/SingleWalletPage";
import WalletProjectLayoutPage from "../components/app_components/WalletPage/WalletProjectLayoutPage";
import SinglePromotionsPage from "../components/app_components/PromotionsPage/SinglePromotionsPage";
import PromotionProjectLayoutPage from "../components/app_components/PromotionsPage/PromotionProjectLayoutPage";
import SingleCartPage from "../components/app_components/CartPage/SingleCartPage";
import CartProjectLayoutPage from "../components/app_components/CartPage/CartProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/userDetails/:singleUserDetailsId" exact element={<SingleUserDetailsPage />} />
<Route path="/userDetails" exact element={<UserDetailProjectLayoutPage />} />
<Route path="/transactions/:singleTransactionsId" exact element={<SingleTransactionsPage />} />
<Route path="/transactions" exact element={<TransactionProjectLayoutPage />} />
<Route path="/wallet/:singleWalletId" exact element={<SingleWalletPage />} />
<Route path="/wallet" exact element={<WalletProjectLayoutPage />} />
<Route path="/promotions/:singlePromotionsId" exact element={<SinglePromotionsPage />} />
<Route path="/promotions" exact element={<PromotionProjectLayoutPage />} />
<Route path="/cart/:singleCartId" exact element={<SingleCartPage />} />
<Route path="/cart" exact element={<CartProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
