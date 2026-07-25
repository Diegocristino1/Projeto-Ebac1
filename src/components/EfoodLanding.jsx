import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Content, Page } from './efood/styles'
import { HeaderSection } from './efood/HeaderSection'
import { FooterSection } from './efood/FooterSection'
import { StatusMessage } from './efood/StatusMessage'
import { RestaurantList } from './efood/RestaurantList'
import { ProductList } from './efood/ProductList'
import { ProductModal } from './efood/ProductModal'
import { CartSummary } from './efood/CartSummary'
import { useGetRestaurantsQuery } from '../store/services/efoodApi'
import { addToCart, removeFromCart } from '../store/slices/cartSlice'

export function EfoodLanding() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useGetRestaurantsQuery()

  const cartQuantities = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity
        return acc
      }, {}),
    [cartItems],
  )

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const handleAddToCart = useCallback((product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.nome,
        image: product.foto,
        price: product.preco,
        restaurantTitle: product.restaurantTitle,
      }),
    )
  }, [dispatch])

  const handleRemoveFromCart = useCallback((productId) => {
    dispatch(removeFromCart(productId))
  }, [dispatch])

  useEffect(() => {
    if (!selectedProduct) {
      return
    }

    const nextQuantity = cartQuantities[selectedProduct.id] ?? 0

    if (selectedProduct.quantityInCart === nextQuantity) {
      return
    }

    setSelectedProduct((currentProduct) => {
      if (!currentProduct) {
        return null
      }

      return {
        ...currentProduct,
        quantityInCart: nextQuantity,
      }
    })
  }, [cartQuantities, selectedProduct])

  const allProducts = useMemo(
    () =>
      restaurants.flatMap((restaurant) =>
        restaurant.cardapio.map((product) => ({
          ...product,
          id: `${restaurant.id}-${product.id}`,
          restaurantTitle: restaurant.titulo,
          onAdd: handleAddToCart,
          onRemove: handleRemoveFromCart,
          quantityInCart: cartQuantities[`${restaurant.id}-${product.id}`] ?? 0,
        })),
      ),
    [restaurants, cartQuantities, handleAddToCart, handleRemoveFromCart],
  )

  return (
    <Page>
      <HeaderSection cartCount={cartCount} />

      <Content>
        {isLoading && <StatusMessage>Carregando restaurantes...</StatusMessage>}
        {isError && (
          <StatusMessage>Nao foi possivel carregar os restaurantes</StatusMessage>
        )}

        {!isLoading && !isError && (
          <>
            <RestaurantList restaurants={restaurants} />
            <ProductList
              products={allProducts}
              onBuy={(product) => setSelectedProduct(product)}
            />
            <CartSummary />
          </>
        )}
      </Content>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <FooterSection />
    </Page>
  )
}
