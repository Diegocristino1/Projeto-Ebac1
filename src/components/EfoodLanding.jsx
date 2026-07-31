import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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

export function EfoodLanding({ page = 'home' }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const { restaurantId } = useParams()
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

  const selectedRestaurant = useMemo(() => {
    if (page !== 'profile') {
      return null
    }

    return (
      restaurants.find((restaurant) => String(restaurant.id) === restaurantId) ??
      null
    )
  }, [page, restaurants, restaurantId])

  const visibleProducts = useMemo(() => {
    if (!selectedRestaurant) {
      return []
    }

    return selectedRestaurant.cardapio.map((product) => {
      const productId = `${selectedRestaurant.id}-${product.id}`

      return {
        ...product,
        id: productId,
        restaurantTitle: selectedRestaurant.titulo,
        onAdd: handleAddToCart,
        onRemove: handleRemoveFromCart,
        quantityInCart: cartQuantities[productId] ?? 0,
      }
    })
  }, [selectedRestaurant, cartQuantities, handleAddToCart, handleRemoveFromCart])

  return (
    <Page>
      <HeaderSection cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <Content>
        {isLoading && <StatusMessage>Carregando restaurantes...</StatusMessage>}
        {isError && (
          <StatusMessage>Nao foi possivel carregar os restaurantes</StatusMessage>
        )}

        {!isLoading && !isError && (
          <>
            {page === 'home' && <RestaurantList restaurants={restaurants} />}

            {page === 'profile' && !selectedRestaurant && (
              <StatusMessage>Restaurante nao encontrado.</StatusMessage>
            )}

            {page === 'profile' && selectedRestaurant && (
              <ProductList
                title={`Cardapio de ${selectedRestaurant.titulo}`}
                products={visibleProducts}
                onBuy={(product) => setSelectedProduct(product)}
              />
            )}

            {isCartOpen && <CartSummary onClose={() => setIsCartOpen(false)} />}
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
