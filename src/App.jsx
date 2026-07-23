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
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/carrinho" element={<CarrinhoPage />} />
      <Route path="/entrega" element={<EntregaPage />} />
      <Route path="/pagamento" element={<PagamentoPage />} />
      <Route path="/confirmacao" element={<ConfirmacaoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
