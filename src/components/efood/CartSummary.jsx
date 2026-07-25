import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../../store/slices/cartSlice'
import {
  CartActionButton,
  CartActions,
  CartEmptyText,
  CartFooter,
  CartItemDetails,
  CartItemRow,
  CartList,
  CartSection,
  CartTitle,
} from './styles'
import { formatPrice } from './utils'

export function CartSummary() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartSection>
      <CartTitle>Seu carrinho ({totalItems})</CartTitle>

      {items.length === 0 && (
        <CartEmptyText>Seu carrinho esta vazio no momento.</CartEmptyText>
      )}

      {items.length > 0 && (
        <>
          <CartList>
            {items.map((item) => (
              <CartItemRow key={item.id}>
                <img src={item.image} alt={item.name} />
                <CartItemDetails>
                  <strong>{item.name}</strong>
                  <small>{item.restaurantTitle}</small>
                  <span>
                    {item.quantity} x {formatPrice(item.price)}
                  </span>
                </CartItemDetails>
                <CartActionButton
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remover
                </CartActionButton>
              </CartItemRow>
            ))}
          </CartList>

          <CartFooter>
            <p>Total</p>
            <strong>{formatPrice(totalAmount)}</strong>
          </CartFooter>

          <CartActions>
            <CartActionButton type="button" onClick={() => dispatch(clearCart())}>
              Limpar carrinho
            </CartActionButton>
          </CartActions>
        </>
      )}
    </CartSection>
  )
}
