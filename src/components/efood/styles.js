import styled from 'styled-components'

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
`

export const Logo = styled.div`
  margin-top: 38px;
  border: 4px solid #e66767;
  color: #e66767;
  font-weight: 900;
  letter-spacing: 0.02em;
  font-size: 58px;
  line-height: 1;
  padding: 8px 16px;
  background: #fff;
  text-transform: lowercase;

  @media (max-width: 768px) {
    font-size: 40px;
    border-width: 3px;
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
