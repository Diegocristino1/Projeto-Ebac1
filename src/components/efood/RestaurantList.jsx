import {
  Badge,
  CardBody,
  CardCta,
  CardHeader,
  Cover,
  RestaurantCardWrap,
  RestaurantGrid,
} from './styles'

export function RestaurantList({ restaurants }) {
  return (
    <RestaurantGrid>
      {restaurants.map((restaurant) => (
        <RestaurantCardWrap key={restaurant.id}>
          <Cover src={restaurant.capa} alt={restaurant.titulo} />
          <CardBody>
            <CardHeader>
              <h2>{restaurant.titulo}</h2>
              <Badge>{restaurant.tipo}</Badge>
            </CardHeader>
            <p>{restaurant.descricao}</p>
            <CardCta to={`/perfil/${restaurant.id}`}>Ver perfil</CardCta>
          </CardBody>
        </RestaurantCardWrap>
      ))}
    </RestaurantGrid>
  )
}
