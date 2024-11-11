import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// import Price from "../pages/pricing";
// import HomePage from "../pages/homepage";
// import NoPage from "../pages/Page-Not-Found";
// import Product from "../pages/product";
// import AppLayout from "../pages/AppLayout";
// import LogIn from "../pages/login";
import CityList from "../components/city-list";
import CountryList from "../components/countrylist";
import City from "../components/city";
import Form from "../components/form";
import { CitiesProvider } from "./cityprovider";
import Country from "../components/country";
import { AuthProvider } from "./FakeApi";
import ProtectedRoute from "../pages/ProtectedRoute";
import Loading from "../components/loading";


const HomePage = lazy(()=>import('../pages/Homepage'))
const Price = lazy(()=>import('../pages/Pricing'))
const Product = lazy(()=>import('../pages/Product'))
const AppLayout = lazy(()=>import('../pages/Applayout'))
const LogIn = lazy(()=>import('../pages/Login'))
const NoPage = lazy(()=>import('../pages/Page-Not-Found'))

function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />}></Route>
              <Route path="pricing" element={<Price />}></Route>
              <Route
                path="applayout"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="city" />} />
                <Route path="city" element={<CityList />} />
                <Route path="city/:idx" element={<City />} />
                <Route path="country" element={<CountryList />} />
                <Route path="country/:xx" element={<Country />} />
                {/* <Route path="city/:idx" element={<Country />} /> */}
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<LogIn />}></Route>
           
              <Route path="*" element={<NoPage />}></Route>
            </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
