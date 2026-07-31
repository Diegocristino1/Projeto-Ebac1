import efoodLogo from '../../assets/efood-logo.svg'
import { CartCounter, CartShortcut, Hero, Logo, Slogan } from './styles'

export function HeaderSection({ cartCount, onOpenCart }) {
  return (
    <Hero>
      <Logo src={efoodLogo} alt="efood" />
      <CartShortcut type="button" onClick={onOpenCart} aria-label="Abrir carrinho">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 4H5L7.2 14.2C7.3 14.7 7.8 15 8.3 15H17.5C18 15 18.4 14.7 18.5 14.2L20 8H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.6" fill="currentColor" />
          <circle cx="17" cy="19" r="1.6" fill="currentColor" />
        </svg>
        <span>{cartCount}</span>
      </CartShortcut>
      <CartCounter>Itens no carrinho: {cartCount}</CartCounter>
      <Slogan>
        Viva experiencias gastronomicas
        <br />
        no conforto da sua casa!
      </Slogan>
    </Hero>
  )
}
