import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Sarees from './components/Sarees';
import Kurtas from './components/Kurtas';
import Lehengas from './components/Lehengas';
import CoOrds from './components/CoOrds';
import DressMaterials from './components/DressMaterials';
import ReadyToWear from './components/ReadyToWear';
import WesternApparels from './components/WesternApparels';
import Bestsellers from './components/Bestsellers';
import Sale from './components/Sale';
import SizeGuide from './components/SizeGuide';
import ShippingPolicy from './components/ShippingPolicy';
import ExchangePolicy from './components/ExchangePolicy';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="sarees" element={<Sarees />} />
                  <Route path="kurtas" element={<Kurtas />} />
                  <Route path="lehengas" element={<Lehengas />} />
                  <Route path="co-ords" element={<CoOrds />} />
                  <Route path="dress-materials" element={<DressMaterials />} />
                  <Route path="ready-to-wear" element={<ReadyToWear />} />
                  <Route path="western-apparels" element={<WesternApparels />} />
                  <Route path="bestsellers" element={<Bestsellers />} />
                  <Route path="sale" element={<Sale />} />
                  {/* Help Pages */}
                  <Route path="size-guide" element={<SizeGuide />} />
                  <Route path="shipping-policy" element={<ShippingPolicy />} />
                  <Route path="exchange-policy" element={<ExchangePolicy />} />
                  <Route path="contact" element={<ContactUs />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;