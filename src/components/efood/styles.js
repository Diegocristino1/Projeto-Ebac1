import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const pattern = `
  repeating-linear-gradient(
    90deg,
    rgba(230, 103, 103, 0.08) 0,
    rgba(230, 103, 103, 0.08) 2px,
    transparent 2px,
    transparent 34px
  ),
  repeating-linear-gradient(
    0deg,
    rgba(230, 103, 103, 0.08) 0,
    rgba(230, 103, 103, 0.08) 2px,
    transparent 2px,
    transparent 24px
  )
`

export const Page = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Hero = styled.section`
  min-height: 520px;
  background-color: #ffebd9;
  background-image: ${pattern};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    min-height: 420px;
  }
`

export const Logo = styled.img`
  margin-top: 38px;
  width: min(125px, 40vw);
  height: auto;

  @media (max-width: 768px) {
    width: min(112px, 38vw);
  }
`

export const Slogan = styled.h1`
  margin: 210px 0 0;
  text-align: center;
  color: #e66767;
  font-size: clamp(36px, 3.5vw, 72px);
  line-height: 1.16;
  font-weight: 700;

  @media (max-width: 980px) {
    margin-top: 160px;
    font-size: clamp(30px, 6vw, 44px);
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    margin-top: 120px;
  }
`

export const CartCounter = styled.p`
  margin: 12px 0 0;
  background: #e66767;
  color: #fff;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

export const CartShortcut = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e66767;
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  z-index: 40;
  border: 0;
  cursor: pointer;

  span {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #ffebd9;
    color: #e66767;
    font-size: 0.75rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    border: 2px solid #e66767;
    padding: 0 4px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
  }
`

export const Content = styled.section`
  background: #fff;
  padding: 22px clamp(16px, 2vw, 28px) 36px;
`

export const StatusMessageText = styled.p`
  min-height: 340px;
  display: grid;
  place-items: center;
  margin: 0;
  color: #080808;
  font-size: clamp(24px, 1.8vw, 42px);
  font-weight: 700;
  text-align: center;
  padding: 0 16px;
`

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 28px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

export const RestaurantCardWrap = styled.article`
  border: 1px solid #e66767;
  background: #fff8f4;
`

export const Cover = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`

export const CardBody = styled.div`
  padding: 12px;

  p {
    margin: 10px 0 0;
    color: #5f3c37;
    line-height: 1.45;
    font-size: 0.95rem;
  }
`

export const CardCta = styled(Link)`
  display: inline-block;
  margin-top: 14px;
  background: #e66767;
  color: #fff;
  padding: 8px 12px;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h2 {
    margin: 0;
    color: #e66767;
    font-size: 1.2rem;
  }
`

export const Badge = styled.span`
  background: #e66767;
  color: #fff;
  padding: 4px 8px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 2px;
`

export const ProductsTitle = styled.h2`
  margin: 0 0 12px;
  color: #e66767;
  font-size: 1.5rem;
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const ProductCardWrap = styled.article`
  background: #e66767;
  color: #ffe9df;
  padding: 8px;
  display: flex;
  flex-direction: column;
  min-height: 354px;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  h3 {
    margin: 10px 0 4px;
    color: #fff;
    font-size: 1.05rem;
  }

  small {
    font-size: 0.82rem;
    opacity: 0.9;
  }

  p {
    font-size: 0.88rem;
    line-height: 1.45;
    margin: 10px 0 12px;
    flex: 1;
  }
`

export const BuyButton = styled.button`
  border: 0;
  background: #ffebd9;
  color: #e66767;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px;
  cursor: pointer;
  margin-top: 6px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: grid;
  place-items: center;
  z-index: 10;
  padding: 18px;
`

export const Modal = styled.div`
  width: min(1024px, 100%);
  background: #e66767;
  color: #fff;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
  padding: 20px;
  position: relative;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }

  h3 {
    margin: 0 0 10px;
    font-size: 1.15rem;
  }

  p {
    margin: 0 0 10px;
    line-height: 1.45;
    font-size: 0.92rem;
  }
`

export const ModalButton = styled.button`
  margin-top: 8px;
  border: 0;
  background: #ffebd9;
  color: #e66767;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
`

export const FooterPattern = styled.footer`
  min-height: 220px;
  background-color: #ffebd9;
  background-image: ${pattern};
  display: grid;
  place-items: start center;

  ${Logo} {
    margin-top: 40px;
  }
`

export const CartOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;
  padding: 84px 16px 16px;
  z-index: 50;

  @media (max-width: 1024px) {
    align-items: flex-end;
    padding: 16px;
  }
`

export const CartSection = styled.section`
  width: min(360px, calc(100% - 32px));
  max-height: 72vh;
  overflow: auto;
  border: 1px solid #e66767;
  background: #fff8f4;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);

  @media (max-width: 1024px) {
    width: 100%;
    max-height: none;
  }
`

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const CartCloseButton = styled.button`
  border: 0;
  background: transparent;
  color: #e66767;
  font-size: 1.25rem;
  cursor: pointer;
`

export const CartTitle = styled.h2`
  margin: 0;
  color: #e66767;
  font-size: 1.25rem;
`

export const CartEmptyText = styled.p`
  margin: 12px 0 0;
  color: #5f3c37;
`

export const CartList = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`

export const CartItemRow = styled.article`
  border: 1px solid #f1c4ad;
  background: #fff;
  padding: 10px;
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 10px;
  align-items: center;

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;

    img {
      width: 100%;
      height: 180px;
    }
  }
`

export const CartItemDetails = styled.div`
  display: grid;
  gap: 3px;

  strong {
    color: #e66767;
  }

  small,
  span {
    color: #5f3c37;
    font-size: 0.88rem;
  }
`

export const CartFooter = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1c4ad;
  padding-top: 12px;

  p,
  strong {
    margin: 0;
    color: #e66767;
    font-size: 1.1rem;
  }
`

export const CartActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 560px) {
    justify-content: stretch;
  }
`

export const CartActionButton = styled.button`
  border: 0;
  background: #e66767;
  color: #fff;
  font-weight: 700;
  padding: 8px 12px;
  cursor: pointer;

  @media (max-width: 560px) {
    width: 100%;
  }
`

export const IconActionButton = styled.button`
  border: 1px solid #f1c4ad;
  background: #fff;
  color: #e66767;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  cursor: pointer;
`
