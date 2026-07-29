import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addToCart, clearCart, removeFromCart } from '../store/slices/cartSlice'
import { formatPrice } from '../components/efood/utils'

export function CarrinhoPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const totalValue = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const handleIncrease = (item) => {
    dispatch(addToCart(item))
  }

  const handleDecrease = (itemId) => {
    dispatch(removeFromCart(itemId))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <Page>
      <Header>
        <TopBar>
          <NavLink to="/">Voltar ao cardápio</NavLink>
          <Brand to="/">efood</Brand>
          <CartBadge>{itemCount} item(s)</CartBadge>
        </TopBar>
      </Header>

      <Content>
        <Title>Seu carrinho</Title>
        <Subtitle>Os produtos abaixo são preenchidos diretamente pelo Redux.</Subtitle>

        {cartItems.length === 0 ? (
          <EmptyState>
            <p>Seu carrinho está vazio.</p>
            <ActionButton onClick={() => navigate('/')}>Explorar pratos</ActionButton>
          </EmptyState>
        ) : (
          <Grid>
            <ItemsList>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemInfo>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} cada</p>
                    <QuantityRow>
                      <QuantityButton type="button" onClick={() => handleDecrease(item.id)}>
                        −
                      </QuantityButton>
                      <span>{item.quantity}</span>
                      <QuantityButton type="button" onClick={() => handleIncrease(item)}>
                        +
                      </QuantityButton>
                    </QuantityRow>
                  </ItemInfo>
                  <ItemTotal>{formatPrice(item.price * item.quantity)}</ItemTotal>
                </CartItem>
              ))}
            </ItemsList>

            <SummaryCard>
              <SummaryTitle>Resumo da compra</SummaryTitle>
              <SummaryRow>
                <span>Produtos</span>
                <strong>{formatPrice(totalValue)}</strong>
              </SummaryRow>
              <SummaryRow>
                <span>Entrega</span>
                <strong>Grátis</strong>
              </SummaryRow>
              <SummaryRow $highlight>
                <span>Total</span>
                <strong>{formatPrice(totalValue)}</strong>
              </SummaryRow>

              <ActionButton onClick={() => navigate('/entrega')}>Continuar para entrega</ActionButton>
              <SecondaryAction onClick={handleClearCart}>Limpar carrinho</SecondaryAction>
            </SummaryCard>
          </Grid>
        )}
      </Content>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  background: linear-gradient(180deg, #fffaf6 0%, #fff4ea 100%);
  color: #4b4b4b;
`

const Header = styled.header`
  background: linear-gradient(135deg, #f9e0c6 0%, #ffe0b0 100%);
  padding: 20px 24px;
`

const TopBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const NavLink = styled(Link)`
  color: #e66767;
  font-weight: 700;
  text-decoration: none;
`

const Brand = styled(Link)`
  color: #e66767;
  border: 3px solid #e66767;
  font-size: 32px;
  line-height: 1;
  font-weight: 900;
  padding: 6px 12px;
  background: #fff;
  text-decoration: none;
`

const CartBadge = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: #fff;
  color: #e66767;
  font-weight: 700;
`

const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
`

const Title = styled.h1`
  margin: 0;
  color: #e66767;
  font-size: 2rem;
`

const Subtitle = styled.p`
  margin: 8px 0 24px;
  color: #7d6560;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 0.8fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const ItemsList = styled.div`
  display: grid;
  gap: 16px;
`

const CartItem = styled.article`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(230, 103, 103, 0.08);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ItemImage = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
`

const ItemInfo = styled.div`
  display: grid;
  gap: 8px;

  h3 {
    margin: 0;
    color: #e66767;
  }

  p {
    margin: 0;
    color: #7d6560;
  }
`

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    min-width: 20px;
    text-align: center;
    font-weight: 700;
  }
`

const QuantityButton = styled.button`
  border: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e66767;
  color: #fff;
  cursor: pointer;
`

const ItemTotal = styled.strong`
  color: #e66767;
  font-size: 1rem;
`

const SummaryCard = styled.aside`
  padding: 20px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 24px rgba(230, 103, 103, 0.08);
  display: grid;
  gap: 12px;
  align-self: start;
`

const SummaryTitle = styled.h2`
  margin: 0;
  color: #e66767;
  font-size: 1.2rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $highlight }) => ($highlight ? '#e66767' : '#4b4b4b')};
  font-weight: ${({ $highlight }) => ($highlight ? 800 : 500)};
`

const ActionButton = styled.button`
  border: 0;
  min-height: 44px;
  border-radius: 999px;
  background: #e66767;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`

const SecondaryAction = styled.button`
  border: 1px solid rgba(230, 103, 103, 0.2);
  min-height: 44px;
  border-radius: 999px;
  background: #fff;
  color: #e66767;
  font-weight: 700;
  cursor: pointer;
`

const EmptyState = styled.div`
  padding: 40px 24px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 24px rgba(230, 103, 103, 0.08);
  text-align: center;

  p {
    margin: 0 0 16px;
    font-size: 1rem;
    color: #7d6560;
  }
`
