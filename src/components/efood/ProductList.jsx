import {
  BuyButton,
  ProductCardWrap,
  ProductGrid,
  ProductsTitle,
} from './styles'
import { shortDescription } from './utils'

export function ProductList({ products, onBuy }) {
  return (
    <>
      <ProductsTitle>Produtos</ProductsTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCardWrap key={product.id}>
            <img src={product.foto} alt={product.nome} />
            <h3>{product.nome}</h3>
            <small>{product.restaurantTitle}</small>
            <p>{shortDescription(product.descricao)}</p>
            <BuyButton type="button" onClick={() => onBuy(product)}>
              Comprar o produto
            </BuyButton>
          </ProductCardWrap>
        ))}
      </ProductGrid>
    </>
  )
}
