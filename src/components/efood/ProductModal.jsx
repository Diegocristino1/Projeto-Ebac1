import {
  CloseButton,
  Modal,
  ModalButton,
  Overlay,
} from './styles'
import { formatPrice } from './utils'

export function ProductModal({ product, onClose }) {
  if (!product) {
    return null
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <img src={product.foto} alt={product.nome} />
        <div>
          <h3>{product.nome}</h3>
          <p>{product.descricao}</p>
          <p>
            Serve: <strong>{product.porcao}</strong>
          </p>
          <p>
            Preco: <strong>{formatPrice(product.preco)}</strong>
          </p>
          <ModalButton type="button">Adicionar ao carrinho</ModalButton>
        </div>
        <CloseButton type="button" onClick={onClose} aria-label="Fechar modal">
          x
        </CloseButton>
      </Modal>
    </Overlay>
  )
}
