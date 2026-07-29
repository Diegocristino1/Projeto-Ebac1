import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useGetRestaurantsQuery } from '../store/services/efoodApi'
import { addToCart, clearCart, removeFromCart } from '../store/slices/cartSlice'
import { formatPrice, shortDescription } from './efood/utils'

const heroPattern = `
  repeating-linear-gradient(
    90deg,
    rgba(230, 103, 103, 0.08) 0,
    rgba(230, 103, 103, 0.08) 2px,
    transparent 2px,
    transparent 34px
  ),
  repeating-linear-gradient(
    0deg,
    rgba(230, 103, 103, 0.08) 0,
    rgba(230, 103, 103, 0.08) 2px,
    transparent 2px,
    transparent 24px
  )
`

function getSidebarStep(mode) {
  if (mode === 'carrinho') {
    return 'cart'
  }

  if (mode === 'entrega') {
    return 'delivery'
  }

  if (mode === 'pagamento') {
    return 'payment'
  }

  if (mode === 'confirmacao') {
    return 'confirmation'
  }

  return null
}

function renderStars(ratingValue) {
  const rating = Math.round(Number(ratingValue) || 0)
  return '★'.repeat(Math.min(rating, 5))
}

export function EfoodLanding({ mode = 'home' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deliveryData, setDeliveryData] = useState({
    receiver: '',
    address: '',
    city: '',
    zip: '',
    number: '',
    complement: '',
  })
  const [paymentData, setPaymentData] = useState({
    cardOwner: '',
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
  })

  const cartItems = useSelector((state) => state.cart.items)
  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useGetRestaurantsQuery()

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const selectedRestaurant = restaurants[0] || null
  const isHome = mode === 'home'
  const sidebarStep = getSidebarStep(mode)
  const sidebarMeta = {
    cart: {
      stepLabel: 'Etapa 1',
      title: 'Carrinho',
      caption: 'Revise seus itens e siga para a entrega.',
    },
    delivery: {
      stepLabel: 'Etapa 2',
      title: 'Entrega',
      caption: 'Preencha os dados para a entrega do pedido.',
    },
    payment: {
      stepLabel: 'Etapa 3',
      title: 'Pagamento',
      caption: 'Finalize o pagamento com os dados do cartão.',
    },
    confirmation: {
      stepLabel: 'Etapa 4',
      title: 'Confirmação',
      caption: 'Seu pedido foi recebido e já está sendo preparado.',
    },
  }
  const activeSidebarMeta = sidebarMeta[sidebarStep] || sidebarMeta.cart

  const products = useMemo(() => {
    if (!selectedRestaurant?.cardapio) {
      return []
    }

    return selectedRestaurant.cardapio.map((product) => ({
      ...product,
      id: `${selectedRestaurant.id}-${product.id}`,
      restaurantTitle: selectedRestaurant.titulo,
      quantityInCart:
        cartItems.find((item) => item.id === `${selectedRestaurant.id}-${product.id}`)
          ?.quantity ?? 0,
    }))
  }, [cartItems, selectedRestaurant])

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.nome,
        image: product.foto,
        price: product.preco,
        restaurantTitle: product.restaurantTitle,
      }),
    )
  }

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleFinishOrder = () => {
    dispatch(clearCart())
    navigate('/')
  }

  return (
    <Page>
      {isHome ? (
        <HomeHero>
          <HeroOverlay />
          <HeroInner>
            <TopBar>
              <TopLink to="/">Restaurantes</TopLink>
              <LogoLink to="/">efood</LogoLink>
              <CartAction to={cartCount > 0 ? '/carrinho' : '/perfil'}>
                <CartIcon aria-hidden="true">🛒</CartIcon>
                <CartLabel>
                  {cartCount > 0 ? `${cartCount}` : '0'}
                </CartLabel>
              </CartAction>
            </TopBar>

            <HeroContent>
              <Eyebrow>Delivery & take away</Eyebrow>
              <HomeTitle>Viva experiências gastronômicas no conforto da sua casa</HomeTitle>
              <HeroText>
                Descubra restaurantes selecionados, pratos especiais e uma experiência de pedido
                simples do começo ao fim.
              </HeroText>
            </HeroContent>
          </HeroInner>
        </HomeHero>
      ) : (
        <ProfileTop>
          <TopBar>
            <TopLink to="/">Restaurantes</TopLink>
            <LogoLink to="/">efood</LogoLink>
            <CartAction to={cartCount > 0 ? '/carrinho' : '/perfil'}>
              <CartIcon aria-hidden="true">🛒</CartIcon>
              <CartLabel>{cartCount > 0 ? `${cartCount}` : '0'}</CartLabel>
            </CartAction>
          </TopBar>

          <RestaurantHero>
            <HeroShade />
            <RestaurantContent>
              <RestaurantInfo>
                <RestaurantType>{selectedRestaurant?.tipo || 'Restaurante'}</RestaurantType>
                <RestaurantName>{selectedRestaurant?.titulo || 'Carregando...'}</RestaurantName>
              </RestaurantInfo>
              <RestaurantMeta>
                <MetaBadge>Entrega em até 45 min</MetaBadge>
                <MetaBadge>Pratos especiais</MetaBadge>
              </RestaurantMeta>
            </RestaurantContent>
          </RestaurantHero>
        </ProfileTop>
      )}

      <Main>
        {isLoading && <StatusText>Carregando...</StatusText>}
        {isError && <StatusText>Nao foi possivel carregar os dados.</StatusText>}

        {!isLoading && !isError && isHome && (
          <RestaurantGrid>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id}>
                <RestaurantImage src={restaurant.capa} alt={restaurant.titulo} />
                <RestaurantBadges>
                  {restaurant.destacado && <Badge>Destaque da semana</Badge>}
                  <Badge>{restaurant.tipo}</Badge>
                </RestaurantBadges>

                <RestaurantBody>
                  <RestaurantHeader>
                    <h2>{restaurant.titulo}</h2>
                    <strong>
                      {restaurant.avaliacao} {renderStars(restaurant.avaliacao)}
                    </strong>
                  </RestaurantHeader>

                  <p>{shortDescription(restaurant.descricao)}</p>

                  <ActionLink to="/perfil">Saiba mais</ActionLink>
                </RestaurantBody>
              </RestaurantCard>
            ))}
          </RestaurantGrid>
        )}

        {!isLoading && !isError && !isHome && (
          <ContentStack>
            <SectionHeader>
              <div>
                <SectionLabel>Cardápio</SectionLabel>
                <SectionTitle>Escolha o prato ideal para o seu momento</SectionTitle>
              </div>
              <SectionHint>Pratos artesanais e sabor único</SectionHint>
            </SectionHeader>

            <FlowNav>
              <FlowLink to="/perfil" $active={location.pathname === '/perfil'}>
                Perfil
              </FlowLink>
              <FlowLink to="/carrinho" $active={location.pathname === '/carrinho'}>
                Carrinho
              </FlowLink>
              <FlowLink to="/entrega" $active={location.pathname === '/entrega'}>
                Entrega
              </FlowLink>
              <FlowLink to="/pagamento" $active={location.pathname === '/pagamento'}>
                Pagamento
              </FlowLink>
              <FlowLink to="/confirmacao" $active={location.pathname === '/confirmacao'}>
                Confirmação
              </FlowLink>
            </FlowNav>

            <MenuGrid>
              {products.map((product) => (
                <MenuCard key={product.id}>
                  <img src={product.foto} alt={product.nome} />
                  <h3>{product.nome}</h3>
                  <p>{shortDescription(product.descricao)}</p>
                  <MenuButton type="button" onClick={() => setSelectedProduct(product)}>
                    Mais detalhes
                  </MenuButton>
                </MenuCard>
              ))}
            </MenuGrid>
          </ContentStack>
        )}
      </Main>

      {!isHome && selectedProduct && (
        <ModalOverlay onClick={() => setSelectedProduct(null)}>
          <ProductModal onClick={(event) => event.stopPropagation()}>
            <img src={selectedProduct.foto} alt={selectedProduct.nome} />
            <div>
              <h3>{selectedProduct.nome}</h3>
              <p>{selectedProduct.descricao}</p>
              <p>Serve: {selectedProduct.porcao}</p>
              <ModalCartButton
                type="button"
                onClick={() => {
                  handleAddToCart(selectedProduct)
                  setSelectedProduct(null)
                }}
              >
                Adicionar ao carrinho - {formatPrice(selectedProduct.preco)}
              </ModalCartButton>
            </div>
            <CloseModalButton
              type="button"
              aria-label="Fechar modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </CloseModalButton>
          </ProductModal>
        </ModalOverlay>
      )}

      {!isHome && sidebarStep && (
        <SidebarBackdrop>
          <SidebarPanel>
            <SidebarHeader>
              <StepBadge>{activeSidebarMeta.stepLabel}</StepBadge>
              <SidebarTitle>{activeSidebarMeta.title}</SidebarTitle>
              <SidebarCaption>{activeSidebarMeta.caption}</SidebarCaption>
            </SidebarHeader>

            {sidebarStep === 'cart' && (
              <>
                {cartItems.length === 0 && <SidebarText>Seu carrinho esta vazio.</SidebarText>}

                {cartItems.length > 0 && (
                  <>
                    <CartList>
                      {cartItems.map((item) => (
                        <CartItem key={item.id}>
                          <img src={item.image} alt={item.name} />
                          <div>
                            <h4>{item.name}</h4>
                            <span>{formatPrice(item.price)}</span>
                          </div>
                          <button type="button" onClick={() => handleRemoveFromCart(item.id)}>
                            ×
                          </button>
                        </CartItem>
                      ))}
                    </CartList>

                    <TotalRow>
                      <span>Valor total</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </TotalRow>

                    <SidebarPrimaryAction type="button" onClick={() => navigate('/entrega')}>
                      Continuar com a entrega
                    </SidebarPrimaryAction>
                  </>
                )}
              </>
            )}

            {sidebarStep === 'delivery' && (
              <>
                <FormGroup>
                  <label htmlFor="receiver">Quem ira receber</label>
                  <input
                    id="receiver"
                    placeholder="Seu nome"
                    value={deliveryData.receiver}
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({
                        ...currentData,
                        receiver: event.target.value,
                      }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="address">Endereco</label>
                  <input
                    id="address"
                    placeholder="Rua, avenida ou praça"
                    value={deliveryData.address}
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({
                        ...currentData,
                        address: event.target.value,
                      }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="city">Cidade</label>
                  <input
                    id="city"
                    placeholder="Cidade"
                    value={deliveryData.city}
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({
                        ...currentData,
                        city: event.target.value,
                      }))
                    }
                  />
                </FormGroup>

                <CompactRow>
                  <FormGroup>
                    <label htmlFor="zip">CEP</label>
                    <input
                      id="zip"
                      placeholder="00000-000"
                      value={deliveryData.zip}
                      onChange={(event) =>
                        setDeliveryData((currentData) => ({
                          ...currentData,
                          zip: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="number">Numero</label>
                    <input
                      id="number"
                      placeholder="123"
                      value={deliveryData.number}
                      onChange={(event) =>
                        setDeliveryData((currentData) => ({
                          ...currentData,
                          number: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>
                </CompactRow>

                <FormGroup>
                  <label htmlFor="complement">Complemento (opcional)</label>
                  <input
                    id="complement"
                    placeholder="Apartamento, bloco, referência"
                    value={deliveryData.complement}
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({
                        ...currentData,
                        complement: event.target.value,
                      }))
                    }
                  />
                </FormGroup>

                <SidebarPrimaryAction type="button" onClick={() => navigate('/pagamento')}>
                  Continuar com o pagamento
                </SidebarPrimaryAction>
                <SidebarSecondaryAction type="button" onClick={() => navigate('/carrinho')}>
                  Voltar para o carrinho
                </SidebarSecondaryAction>
              </>
            )}

            {sidebarStep === 'payment' && (
              <>
                <PaymentCardSection>
                  <PaymentCardPreview>
                    <CardChip />
                    <CardNumber>
                      {paymentData.cardNumber || '0000 0000 0000 0000'}
                    </CardNumber>
                    <CardFooter>
                      <div>
                        <CardLabel>Nome</CardLabel>
                        <strong>{paymentData.cardOwner || 'Seu nome'}</strong>
                      </div>
                      <div>
                        <CardLabel>Validade</CardLabel>
                        <strong>
                          {paymentData.expiryMonth || 'MM'}/{paymentData.expiryYear || 'AAAA'}
                        </strong>
                      </div>
                    </CardFooter>
                  </PaymentCardPreview>

                  <PaymentFormTitle>Pagamento por cartão</PaymentFormTitle>
                  <PaymentHint>Informe os dados do cartão para concluir o pedido.</PaymentHint>
                </PaymentCardSection>

                <FormGroup>
                  <label htmlFor="card-owner">Nome no cartao</label>
                  <input
                    id="card-owner"
                    placeholder="Nome impresso no cartão"
                    value={paymentData.cardOwner}
                    onChange={(event) =>
                      setPaymentData((currentData) => ({
                        ...currentData,
                        cardOwner: event.target.value,
                      }))
                    }
                  />
                </FormGroup>

                <CompactRow>
                  <FormGroup>
                    <label htmlFor="card-number">Numero do cartao</label>
                    <input
                      id="card-number"
                      placeholder="0000 0000 0000 0000"
                      value={paymentData.cardNumber}
                      onChange={(event) =>
                        setPaymentData((currentData) => ({
                          ...currentData,
                          cardNumber: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(event) =>
                        setPaymentData((currentData) => ({
                          ...currentData,
                          cvv: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>
                </CompactRow>

                <CompactRow>
                  <FormGroup>
                    <label htmlFor="expiry-month">Mes de vencimento</label>
                    <input
                      id="expiry-month"
                      placeholder="MM"
                      value={paymentData.expiryMonth}
                      onChange={(event) =>
                        setPaymentData((currentData) => ({
                          ...currentData,
                          expiryMonth: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="expiry-year">Ano de vencimento</label>
                    <input
                      id="expiry-year"
                      placeholder="AAAA"
                      value={paymentData.expiryYear}
                      onChange={(event) =>
                        setPaymentData((currentData) => ({
                          ...currentData,
                          expiryYear: event.target.value,
                        }))
                      }
                    />
                  </FormGroup>
                </CompactRow>

                <SidebarPrimaryAction type="button" onClick={() => navigate('/confirmacao')}>
                  Finalizar pagamento
                </SidebarPrimaryAction>
                <SidebarSecondaryAction type="button" onClick={() => navigate('/entrega')}>
                  Voltar para a edicao de endereco
                </SidebarSecondaryAction>
              </>
            )}

            {sidebarStep === 'confirmation' && (
              <>
                <SidebarText>
                  Estamos felizes em informar que seu pedido ja esta em processo de preparacao e,
                  em breve, sera entregue no endereco fornecido.
                </SidebarText>
                <SidebarText>
                  Gostariamos de lembrar que nossos entregadores nao estao autorizados a realizar
                  cobrancas extras.
                </SidebarText>
                <SidebarText>
                  Lembre-se da importancia de higienizar as maos apos o recebimento do pedido,
                  garantindo assim sua seguranca e bem-estar durante a refeicao.
                </SidebarText>
                <SidebarText>
                  Esperamos que desfrute de uma deliciosa e agradavel experiencia gastronomica.
                  Bom apetite!
                </SidebarText>

                <SidebarPrimaryAction type="button" onClick={handleFinishOrder}>
                  Concluir
                </SidebarPrimaryAction>
              </>
            )}
          </SidebarPanel>
        </SidebarBackdrop>
      )}

      <Footer>
        <LogoLink to="/">efood</LogoLink>
        <FooterText>
          A efood e uma plataforma para divulgacao de estabelecimentos, a responsabilidade pela
          entrega, qualidade dos produtos e transacao financeira e toda do estabelecimento
          contratado.
        </FooterText>
      </Footer>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  background: linear-gradient(180deg, #fffaf6 0%, #fff4ea 100%);
  color: #4b4b4b;
  font-family: 'Inter', 'Segoe UI', sans-serif;
`

const HomeHero = styled.header`
  position: relative;
  min-height: 460px;
  background: linear-gradient(135deg, #f9e0c6 0%, #ffe0b0 100%);
  overflow: hidden;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.45), transparent 45%),
    linear-gradient(90deg, rgba(230, 103, 103, 0.12), transparent);
`

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 60px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const ProfileTop = styled.header`
  background: linear-gradient(135deg, #f9e0c6 0%, #ffe0b0 100%);
`

const TopBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 120px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 0 24px;

  @media (max-width: 700px) {
    min-height: 140px;
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 20px 16px;
  }
`

const TopLink = styled(Link)`
  color: #e66767;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
`

const CartAction = styled(Link)`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  color: #e66767;
  border: 1px solid rgba(230, 103, 103, 0.2);
  box-shadow: 0 8px 20px rgba(230, 103, 103, 0.12);
  text-decoration: none;

  @media (max-width: 700px) {
    justify-self: center;
  }
`

const CartIcon = styled.span`
  font-size: 1.1rem;
`

const CartLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 800;
`

const LogoLink = styled(Link)`
  color: #e66767;
  border: 3px solid #e66767;
  font-size: 36px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.01em;
  text-transform: lowercase;
  padding: 6px 12px;
  background: #fff;
  text-decoration: none;
`

const HeroContent = styled.div`
  margin: auto 0;
  display: grid;
  gap: 18px;
  max-width: 720px;
  padding: 32px 0 0;
`

const Eyebrow = styled.span`
  color: #e66767;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const HomeTitle = styled.h1`
  margin: 0;
  color: #e66767;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.2;
  font-weight: 900;
`

const HeroText = styled.p`
  margin: 0;
  color: #6d4b3a;
  font-size: 1.05rem;
  max-width: 600px;
  line-height: 1.7;
`

const RestaurantHero = styled.section`
  position: relative;
  min-height: 320px;
  background: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')
    center / cover no-repeat;
  display: flex;
  align-items: flex-end;
`

const RestaurantContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.72) 100%);
`

const RestaurantInfo = styled.div`
  display: grid;
  gap: 8px;
`

const RestaurantType = styled.p`
  margin: 0;
  color: #ffffff;
  opacity: 0.8;
  font-size: 1.2rem;
  font-weight: 300;
`

const RestaurantName = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: clamp(34px, 5vw, 44px);
  font-weight: 900;
`

const RestaurantMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const MetaBadge = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  backdrop-filter: blur(6px);
  font-size: 0.9rem;
`

const Main = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 120px;
`

const StatusText = styled.p`
  text-align: center;
  color: #e66767;
  font-size: 1.2rem;
  font-weight: 700;
`

const ContentStack = styled.div`
  display: grid;
  gap: 24px;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
`

const SectionLabel = styled.p`
  margin: 0 0 6px;
  color: #e66767;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

const SectionTitle = styled.h2`
  margin: 0;
  color: #e66767;
  font-size: 1.7rem;
`

const SectionHint = styled.span`
  color: #7d6560;
  font-size: 0.95rem;
`

const FlowNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`

const FlowLink = styled(Link)`
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#e66767' : '#fff8f2')};
  color: ${({ $active }) => ($active ? '#fff' : '#e66767')};
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid rgba(230, 103, 103, 0.16);
`

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const RestaurantCard = styled.article`
  border: 1px solid rgba(230, 103, 103, 0.2);
  background: #fff;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(230, 103, 103, 0.08);
`

const RestaurantImage = styled.img`
  width: 100%;
  height: 226px;
  object-fit: cover;
`

const RestaurantBadges = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const Badge = styled.span`
  background: #e66767;
  color: #fff;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
`

const RestaurantBody = styled.div`
  padding: 16px 16px 24px;
  display: grid;
  gap: 12px;

  p {
    margin: 0;
    color: #4b4b4b;
    line-height: 1.55;
    font-size: 0.95rem;
    min-height: 72px;
  }
`

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  h2,
  strong {
    margin: 0;
    color: #e66767;
    font-size: 1.05rem;
  }
`

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  background: #e66767;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  width: max-content;
`

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const MenuCard = styled.article`
  background: #fff;
  color: #4b4b4b;
  padding: 16px;
  border: 1px solid rgba(230, 103, 103, 0.16);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(230, 103, 103, 0.06);
  display: grid;
  gap: 12px;

  img {
    width: 100%;
    height: 168px;
    object-fit: cover;
    border-radius: 16px;
  }

  h3 {
    margin: 0;
    color: #e66767;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #6d4b3a;
    line-height: 1.5;
    font-size: 0.95rem;
    min-height: 88px;
  }
`

const MenuButton = styled.button`
  width: 100%;
  border: 0;
  min-height: 40px;
  background: #e66767;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 999px;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 12, 12, 0.75);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

const ProductModal = styled.div`
  width: min(1024px, 100%);
  background: #fff;
  color: #4b4b4b;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border-radius: 24px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.32);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 16px;
  }

  h3 {
    margin: 0 0 12px;
    font-size: 1.3rem;
    color: #e66767;
  }

  p {
    margin: 0 0 16px;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`

const ModalCartButton = styled.button`
  border: 0;
  min-height: 44px;
  padding: 0 16px;
  background: #e66767;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 999px;
`

const CloseModalButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: transparent;
  color: #e66767;
  font-size: 1.3rem;
  cursor: pointer;
`

const SidebarBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  background: rgba(18, 12, 12, 0.72);
  z-index: 30;
`

const SidebarPanel = styled.aside`
  width: min(420px, 100%);
  min-height: 100vh;
  background: #fff;
  color: #4b4b4b;
  padding: 24px;
  overflow-y: auto;
  box-shadow: -16px 0 40px rgba(0, 0, 0, 0.16);
  border-radius: 24px 0 0 24px;
`

const SidebarHeader = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 24px;
`

const StepBadge = styled.span`
  width: max-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: #fff4ea;
  color: #e66767;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
  color: #e66767;
`

const SidebarCaption = styled.p`
  margin: 0;
  color: #7d6560;
  line-height: 1.5;
`

const PaymentCardSection = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
`

const PaymentCardPreview = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #e66767 0%, #ff8d5d 100%);
  color: #fff;
  box-shadow: 0 12px 28px rgba(230, 103, 103, 0.18);
  display: grid;
  gap: 18px;
`

const CardChip = styled.div`
  width: 42px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
`

const CardNumber = styled.p`
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: 0.16em;
  font-weight: 700;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.85rem;

  strong {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
  }
`

const CardLabel = styled.span`
  display: block;
  opacity: 0.8;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
`

const PaymentFormTitle = styled.h3`
  margin: 0;
  color: #e66767;
  font-size: 1rem;
`

const PaymentHint = styled.p`
  margin: 0;
  color: #7d6560;
  font-size: 0.9rem;
  line-height: 1.5;
`

const SidebarText = styled.p`
  margin: 0 0 16px;
  line-height: 1.6;
  font-size: 0.95rem;
`

const CartList = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
`

const CartItem = styled.article`
  background: #fff8f2;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 8px;
  padding: 10px;
  position: relative;
  border-radius: 16px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
  }

  h4 {
    margin: 4px 0 2px;
    color: #e66767;
    font-size: 1rem;
  }

  span {
    color: #7d6560;
    font-size: 0.9rem;
  }

  button {
    align-self: end;
    border: 0;
    background: transparent;
    color: #e66767;
    font-size: 1.2rem;
    cursor: pointer;
  }
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-top: 4px;

  span,
  strong {
    font-size: 0.95rem;
    color: #4b4b4b;
  }

  strong {
    color: #e66767;
    font-weight: 800;
  }
`

const SidebarPrimaryAction = styled.button`
  width: 100%;
  border: 0;
  min-height: 44px;
  background: #e66767;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 999px;
  margin-bottom: 10px;
`

const SidebarSecondaryAction = styled.button`
  width: 100%;
  border: 1px solid rgba(230, 103, 103, 0.2);
  min-height: 44px;
  background: #fff;
  color: #e66767;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 999px;
`

const FormGroup = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 12px;

  label {
    font-size: 0.9rem;
    font-weight: 700;
    color: #4b4b4b;
  }

  input {
    width: 100%;
    border: 1px solid rgba(230, 103, 103, 0.18);
    min-height: 42px;
    padding: 0 12px;
    background: #fff8f2;
    color: #4b4b4b;
    font-size: 0.95rem;
    border-radius: 12px;
  }
`

const CompactRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Footer = styled.footer`
  min-height: 298px;
  background-color: #ffebd9;
  background-image: ${heroPattern};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`

const FooterText = styled.p`
  margin: 24px 0 0;
  max-width: 520px;
  text-align: center;
  color: #e66767;
  font-size: 0.95rem;
  line-height: 1.7;
`
