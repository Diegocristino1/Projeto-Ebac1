import { useEffect, useMemo, useState } from 'react'
import { Content, Page } from './efood/styles'
import { HeaderSection } from './efood/HeaderSection'
import { FooterSection } from './efood/FooterSection'
import { StatusMessage } from './efood/StatusMessage'
import { RestaurantList } from './efood/RestaurantList'
import { ProductList } from './efood/ProductList'
import { ProductModal } from './efood/ProductModal'

export function EfoodLanding() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          'https://api-ebac.vercel.app/api/efood/restaurantes',
        )

        if (!response.ok) {
          throw new Error('Falha ao carregar restaurantes')
        }

        const data = await response.json()
        setRestaurants(data)
      } catch {
        setError('Nao foi possivel carregar os restaurantes')
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [])

  const allProducts = useMemo(
    () =>
      restaurants.flatMap((restaurant) =>
        restaurant.cardapio.map((product) => ({
          ...product,
          restaurantTitle: restaurant.titulo,
        })),
      ),
    [restaurants],
  )

  return (
    <Page>
      <HeaderSection />

      <Content>
        {loading && <StatusMessage>Carregando restaurantes...</StatusMessage>}
        {error && <StatusMessage>{error}</StatusMessage>}

        {!loading && !error && (
          <>
            <RestaurantList restaurants={restaurants} />
            <ProductList
              products={allProducts}
              onBuy={(product) => setSelectedProduct(product)}
            />
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
