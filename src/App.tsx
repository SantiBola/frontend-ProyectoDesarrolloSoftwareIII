import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./shared/Footer";
import NotFound from "./shared/NotFound";
import Home from "./features/home/Home";
import Header from "./shared/Header";
import { AreaList } from "./components/AreaList";
import { CityList } from "./components/CityList";
import { CountryList } from "./components/CountryList";
import { CustomerList } from "./components/CustomerList";
import { MenuList } from "./components/MenuList";
import { OrderDetailList } from "./components/OrderDetailList";
import { OrderList } from "./components/OrderList";
import { PayList } from "./components/PayList";
import { Reservation } from "./components/Reservation";
import { RestaurantList } from "./components/RestaurantList";
import { RestaurantTableList } from "./components/RestaurantTableList";
import { StateList } from "./components/StateList";
export default function App() {
    return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <main className="bg-white flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Area" element={<AreaList />} />
            <Route path="/City" element={<CityList />} />
            <Route path="/Country" element={<CountryList />} />
            <Route path="/Customer" element={<CustomerList />} />
            <Route path="/Menu" element={<MenuList />} />
            <Route path="/OrderDetail" element={<OrderDetailList />} />
            <Route path="/Order" element={<OrderList />} />
            <Route path="/Pay" element={<PayList />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/Restaurant" element={<RestaurantList />} />
            <Route path="/Table" element={<RestaurantTableList />} />
            <Route path="/State" element={<StateList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}