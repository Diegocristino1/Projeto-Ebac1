import styled from 'styled-components'

export function EfoodLanding() {
  return (
    <Page>
      <Hero>
        <Logo>efood</Logo>
        <Slogan>
          Viva experiencias gastronomicas
          <br />
          no conforto da sua casa!
        </Slogan>
      </Hero>

      <ErrorSection>
        <ErrorMessage>Nao foi possivel carregar os restaurantes</ErrorMessage>
      </ErrorSection>

      <FooterPattern>
        <Logo>efood</Logo>
      </FooterPattern>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const pattern = `
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

const Hero = styled.section`
  min-height: 520px;
  background-color: #ffebd9;
  background-image: ${pattern};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.div`
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

const Slogan = styled.h1`
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

const ErrorSection = styled.section`
  min-height: 340px;
  background: #fff;
  display: grid;
  place-items: center;
`

const ErrorMessage = styled.p`
  margin: 0;
  color: #080808;
  font-size: clamp(24px, 1.8vw, 42px);
  font-weight: 700;
  text-align: center;
  padding: 0 16px;
`

const FooterPattern = styled.footer`
  min-height: 220px;
  background-color: #ffebd9;
  background-image: ${pattern};
  display: grid;
  place-items: start center;

  ${Logo} {
    margin-top: 40px;
  }
`
