import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearCart } from '../store/slices/cartSlice'
import { formatPrice } from './efood/utils'

export function CheckoutStepPage({ step }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

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

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const totalValue = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const handleFinishOrder = () => {
    dispatch(clearCart())
    navigate('/')
  }

  const content = {
    delivery: {
      title: 'Entrega',
      subtitle: 'Preencha os dados do endereço para concluir o pedido.',
      buttonLabel: 'Continuar para o pagamento',
      buttonAction: () => navigate('/pagamento'),
      secondaryLabel: 'Voltar ao carrinho',
      secondaryAction: () => navigate('/carrinho'),
    },
    payment: {
      title: 'Pagamento por cartão',
      subtitle: 'Informe os dados do cartão para finalizar a compra.',
      buttonLabel: 'Finalizar pagamento',
      buttonAction: () => navigate('/confirmacao'),
      secondaryLabel: 'Voltar para entrega',
      secondaryAction: () => navigate('/entrega'),
    },
    confirmation: {
      title: 'Pedido confirmado',
      subtitle: 'Seu pedido foi recebido e logo será preparado.',
      buttonLabel: 'Voltar ao início',
      buttonAction: handleFinishOrder,
    },
  }[step]

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
        <MainCard>
          <TitleRow>
            <div>
              <StepLabel>{step === 'delivery' ? 'Etapa 2' : step === 'payment' ? 'Etapa 3' : 'Etapa 4'}</StepLabel>
              <Title>{content.title}</Title>
              <Subtitle>{content.subtitle}</Subtitle>
            </div>
            <StatusPill>{cartItems.length > 0 ? 'Pedido ativo' : 'Sem itens'}</StatusPill>
          </TitleRow>

          {step === 'delivery' && (
            <FormGrid>
              <FormGroup>
                <label htmlFor="receiver">Quem irá receber</label>
                <input
                  id="receiver"
                  value={deliveryData.receiver}
                  placeholder="Seu nome"
                  onChange={(event) =>
                    setDeliveryData((currentData) => ({ ...currentData, receiver: event.target.value }))
                  }
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="address">Endereço</label>
                <input
                  id="address"
                  value={deliveryData.address}
                  placeholder="Rua, avenida ou praça"
                  onChange={(event) =>
                    setDeliveryData((currentData) => ({ ...currentData, address: event.target.value }))
                  }
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  value={deliveryData.city}
                  placeholder="Cidade"
                  onChange={(event) =>
                    setDeliveryData((currentData) => ({ ...currentData, city: event.target.value }))
                  }
                />
              </FormGroup>

              <TwoColumns>
                <FormGroup>
                  <label htmlFor="zip">CEP</label>
                  <input
                    id="zip"
                    value={deliveryData.zip}
                    placeholder="00000-000"
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({ ...currentData, zip: event.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="number">Número</label>
                  <input
                    id="number"
                    value={deliveryData.number}
                    placeholder="123"
                    onChange={(event) =>
                      setDeliveryData((currentData) => ({ ...currentData, number: event.target.value }))
                    }
                  />
                </FormGroup>
              </TwoColumns>

              <FormGroup>
                <label htmlFor="complement">Complemento</label>
                <input
                  id="complement"
                  value={deliveryData.complement}
                  placeholder="Apartamento, bloco ou referência"
                  onChange={(event) =>
                    setDeliveryData((currentData) => ({ ...currentData, complement: event.target.value }))
                  }
                />
              </FormGroup>
            </FormGrid>
          )}

          {step === 'payment' && (
            <FormGrid>
              <PaymentCardPreview>
                <CardChip />
                <CardNumber>{paymentData.cardNumber || '0000 0000 0000 0000'}</CardNumber>
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

              <FormGroup>
                <label htmlFor="card-owner">Nome no cartão</label>
                <input
                  id="card-owner"
                  value={paymentData.cardOwner}
                  placeholder="Nome impresso no cartão"
                  onChange={(event) =>
                    setPaymentData((currentData) => ({ ...currentData, cardOwner: event.target.value }))
                  }
                />
              </FormGroup>

              <TwoColumns>
                <FormGroup>
                  <label htmlFor="card-number">Número do cartão</label>
                  <input
                    id="card-number"
                    value={paymentData.cardNumber}
                    placeholder="0000 0000 0000 0000"
                    onChange={(event) =>
                      setPaymentData((currentData) => ({ ...currentData, cardNumber: event.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    value={paymentData.cvv}
                    placeholder="123"
                    onChange={(event) =>
                      setPaymentData((currentData) => ({ ...currentData, cvv: event.target.value }))
                    }
                  />
                </FormGroup>
              </TwoColumns>

              <TwoColumns>
                <FormGroup>
                  <label htmlFor="expiry-month">Mês de vencimento</label>
                  <input
                    id="expiry-month"
                    value={paymentData.expiryMonth}
                    placeholder="MM"
                    onChange={(event) =>
                      setPaymentData((currentData) => ({ ...currentData, expiryMonth: event.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="expiry-year">Ano de vencimento</label>
                  <input
                    id="expiry-year"
                    value={paymentData.expiryYear}
                    placeholder="AAAA"
                    onChange={(event) =>
                      setPaymentData((currentData) => ({ ...currentData, expiryYear: event.target.value }))
                    }
                  />
                </FormGroup>
              </TwoColumns>
            </FormGrid>
          )}

          {step === 'confirmation' && (
            <ConfirmationBox>
              <p>Estamos felizes em informar que seu pedido já está sendo preparado.</p>
              <p>Recebemos os dados de entrega e pagamento e em breve o pedido será enviado.</p>
            </ConfirmationBox>
          )}

          <Actions>
            <PrimaryButton type="button" onClick={content.buttonAction}>
              {content.buttonLabel}
            </PrimaryButton>
            {content.secondaryLabel && (
              <SecondaryButton type="button" onClick={content.secondaryAction}>
                {content.secondaryLabel}
              </SecondaryButton>
            )}
          </Actions>
        </MainCard>

        <SummaryCard>
          <SummaryTitle>Resumo do pedido</SummaryTitle>
          <SummaryRow>
            <span>Itens</span>
            <strong>{itemCount}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Entrega</span>
            <strong>Grátis</strong>
          </SummaryRow>
          <SummaryRow $highlight>
            <span>Total</span>
            <strong>{formatPrice(totalValue)}</strong>
          </SummaryRow>

          {cartItems.map((item) => (
            <SummaryItem key={item.id}>
              <span>{item.name}</span>
              <strong>{item.quantity}x</strong>
            </SummaryItem>
          ))}
        </SummaryCard>
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
  justify-content: space-between;
  align-items: center;
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
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const MainCard = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 24px rgba(230, 103, 103, 0.08);
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const StepLabel = styled.span`
  color: #e66767;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const Title = styled.h1`
  margin: 4px 0 8px;
  color: #e66767;
  font-size: 1.8rem;
`

const Subtitle = styled.p`
  margin: 0;
  color: #7d6560;
  line-height: 1.6;
`

const StatusPill = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: #fff4ea;
  color: #e66767;
  font-weight: 700;
`

const FormGrid = styled.div`
  display: grid;
  gap: 14px;
`

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-weight: 700;
    color: #4b4b4b;
  }

  input {
    min-height: 44px;
    border: 1px solid rgba(230, 103, 103, 0.16);
    border-radius: 12px;
    padding: 0 12px;
    background: #fff8f2;
    color: #4b4b4b;
  }
`

const PaymentCardPreview = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #e66767 0%, #ff8d5d 100%);
  color: #fff;
  display: grid;
  gap: 18px;
`

const CardChip = styled.div`
  width: 40px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
`

const CardNumber = styled.p`
  margin: 0;
  font-size: 1.05rem;
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

const ConfirmationBox = styled.div`
  padding: 20px;
  background: #fff8f2;
  border-radius: 16px;
  color: #6d4b3a;
  line-height: 1.7;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`

const PrimaryButton = styled.button`
  border: 0;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  background: #e66767;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`

const SecondaryButton = styled.button`
  border: 1px solid rgba(230, 103, 103, 0.2);
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  background: #fff;
  color: #e66767;
  font-weight: 700;
  cursor: pointer;
`

const SummaryCard = styled.aside`
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 10px 24px rgba(230, 103, 103, 0.08);
  display: grid;
  gap: 12px;
  align-self: start;
`

const SummaryTitle = styled.h2`
  margin: 0 0 4px;
  color: #e66767;
  font-size: 1.2rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $highlight }) => ($highlight ? '#e66767' : '#4b4b4b')};
  font-weight: ${({ $highlight }) => ($highlight ? 800 : 600)};
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: #7d6560;
  font-size: 0.95rem;
`
