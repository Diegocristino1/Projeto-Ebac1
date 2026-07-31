import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../../store/slices/cartSlice'
import {
  CartCloseButton,
  CartHeader,
  CartActionButton,
  CartActions,
  CartEmptyText,
  CartFooter,
  CartItemDetails,
  CartItemRow,
  CartList,
  CartOverlay,
  CartSection,
  CartTitle,
  IconActionButton,
} from './styles'
import { formatPrice } from './utils'

export function CartSummary({ onClose }) {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartOverlay onClick={onClose}>
      <CartSection onClick={(event) => event.stopPropagation()}>
        <CartHeader>
          <CartTitle>Seu carrinho ({totalItems})</CartTitle>
          <CartCloseButton type="button" onClick={onClose} aria-label="Fechar carrinho">
            x
          </CartCloseButton>
        </CartHeader>

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
                  <IconActionButton
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 7H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7L8 19C8.08284 19.9944 8.9145 20.75 9.91236 20.75H14.0876C15.0855 20.75 15.9172 19.9944 16 19L17 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 11V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </IconActionButton>
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
    </CartOverlay>
  )
}
