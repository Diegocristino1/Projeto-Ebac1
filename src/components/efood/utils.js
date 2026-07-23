export function shortDescription(text) {
  if (!text) {
    return ''
  }

  return text.length > 110 ? `${text.slice(0, 110)}...` : text
}

export function formatPrice(price) {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
