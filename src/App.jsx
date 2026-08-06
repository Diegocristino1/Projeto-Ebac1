import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PerfilPage } from './pages/PerfilPage'
import { CarrinhoPage } from './pages/CarrinhoPage'
import { EntregaPage } from './pages/EntregaPage'
import { PagamentoPage } from './pages/PagamentoPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/perfil/:restaurantId" element={<PerfilPage />} />
      <Route path="/carrinho/:restaurantId?" element={<CarrinhoPage />} />
      <Route path="/entrega/:restaurantId?" element={<EntregaPage />} />
      <Route path="/pagamento/:restaurantId?" element={<PagamentoPage />} />
      <Route path="/confirmacao/:restaurantId?" element={<ConfirmacaoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
