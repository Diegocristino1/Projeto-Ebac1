import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { cartItems, categories, products } from '../data/mockData'

const routes = [
  { to: '/', label: 'Home' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/carrinho', label: 'Carrinho' },
  { to: '/entrega', label: 'Entrega' },
  { to: '/pagamento', label: 'Pagamento' },
  { to: '/confirmacao', label: 'Confirmacao' },
]

export function RestaurantView({
  pageTitle,
  heroText,
  highlightCard,
  showModal,
  showCart,
  checkoutStep,
}) {
  return (
    <Shell>
      <TopRibbon>Layouts para as 4 partes</TopRibbon>
      <RouteTabs>
        {routes.map((route) => (
          <TabLink key={route.to} to={route.to}>
            {route.label}
          </TabLink>
        ))}
      </RouteTabs>

      <Stage>
        <Hero>
          <h2>{pageTitle}</h2>
          <p>{heroText}</p>
        </Hero>

        <ContentGrid>
          <Filters>
            {categories.map((category) => (
              <button key={category} type="button">
                {category}
              </button>
            ))}
          </Filters>

          <CardGrid>
            {products.map((product) => (
              <DishCard key={product.id} $featured={highlightCard === product.id}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <strong>R$ {product.price.toFixed(2)}</strong>
              </DishCard>
            ))}
          </CardGrid>
        </ContentGrid>

        {showModal && (
          <Overlay>
            <Modal>
              <img src={products[0].image} alt={products[0].title} />
              <div>
                <h3>{products[0].title}</h3>
                <p>{products[0].description}</p>
                <button type="button">Adicionar ao carrinho</button>
              </div>
            </Modal>
          </Overlay>
        )}

        {showCart && (
          <SidePanel>
            <h3>Seu Carrinho</h3>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <p>{item.name}</p>
                <span>{item.qty}x</span>
                <strong>R$ {(item.qty * item.price).toFixed(2)}</strong>
              </CartItem>
            ))}
            <Total>
              <span>Total</span>
              <strong>
                R${' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </Total>
          </SidePanel>
        )}

        {checkoutStep && (
          <SidePanel>
            <h3>{checkoutStep}</h3>
            <CheckoutForm>
              <input placeholder="Nome" />
              <input placeholder="Endereco" />
              <input placeholder="Cidade" />
              <Row>
                <input placeholder="CEP" />
                <input placeholder="Numero" />
              </Row>
              <button type="button">Continuar</button>
            </CheckoutForm>
          </SidePanel>
        )}
      </Stage>
    </Shell>
  )
}

const Shell = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.shell};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`

const TopRibbon = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-align: center;
  padding: 14px;
  font-weight: 800;
  font-size: 1.8rem;
`

const RouteTabs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TabLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) => theme.colors.soft};
  border-radius: 999px;
  padding: 6px 14px;
`

const Stage = styled.section`
  position: relative;
  padding: 24px;
  min-height: calc(100vh - 110px);
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 22px;

  h2 {
    margin: 0;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  p {
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.textSoft};
  }
`

const ContentGrid = styled.div`
  display: grid;
  gap: 20px;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  button {
    border: 0;
    background: ${({ theme }) => theme.colors.soft};
    color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: 999px;
    padding: 8px 14px;
    font-weight: 700;
    cursor: pointer;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const DishCard = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;

  ${({ $featured, theme }) =>
    $featured &&
    css`
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(230, 103, 103, 0.2);
    `}

  img {
    width: 100%;
    height: 128px;
    object-fit: cover;
  }

  h3,
  p,
  strong {
    margin: 10px 12px;
  }

  h3 {
    margin-bottom: 4px;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSoft};
    min-height: 58px;
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: grid;
  place-items: center;
  padding: 24px;
`

const Modal = styled.div`
  width: min(680px, 100%);
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: #fff;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  padding: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.radius.md};
    height: 180px;
    object-fit: cover;
  }

  h3 {
    margin: 4px 0 10px;
  }

  button {
    margin-top: 12px;
    border: 0;
    border-radius: 8px;
    padding: 10px 14px;
    font-weight: 700;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`

const SidePanel = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  width: min(340px, 100%);
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 18px;
  overflow-y: auto;

  h3 {
    margin-top: 0;
    margin-bottom: 14px;
  }
`

const CartItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  padding: 10px 0;

  p {
    margin: 0;
    font-weight: 700;
  }

  span {
    font-size: 0.9rem;
  }

  strong {
    display: block;
  }
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  font-size: 1.1rem;
  font-weight: 700;
`

const CheckoutForm = styled.form`
  display: grid;
  gap: 10px;

  input,
  button {
    border: 0;
    border-radius: 8px;
    padding: 10px;
    font: inherit;
  }

  input {
    background: #fff;
  }

  button {
    background: ${({ theme }) => theme.colors.soft};
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: 700;
    cursor: pointer;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`
