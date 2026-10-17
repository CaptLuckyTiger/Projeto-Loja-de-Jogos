import { Route, Routes } from 'react-router-dom';
import { useStoreViewModel } from '../viewmodel/useStoreViewModel';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import CartView from './views/CartView';
import ContactView from './views/ContactView';
import OrdersView from './views/OrdersView';
import ProductDetailView from './views/ProductDetailView';
import ComparisonView from './views/ComparisonView';

export default function App() {
  const store = useStoreViewModel();
  return (
    <Layout store={store}>
      <Routes>
        <Route path="/" element={<HomeView store={store} />} />
        <Route path="/produtos" element={<ProductsView store={store} />} />
        <Route path="/favoritos" element={<ProductsView store={store} favoriteOnly />} />
        <Route path="/carrinho" element={<CartView store={store} />} />
        <Route path="/contato" element={<ContactView />} />
        <Route path="/pedidos" element={<OrdersView store={store} />} />
        <Route path="/produto/:id" element={<ProductDetailView store={store} />} />
        <Route path="/comparar" element={<ComparisonView store={store} />} />
      </Routes>
    </Layout>
  );
}
