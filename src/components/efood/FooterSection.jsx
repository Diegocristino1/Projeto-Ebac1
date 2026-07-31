import efoodLogo from '../../assets/efood-logo.svg'
import { FooterPattern, Logo } from './styles'

export function FooterSection() {
  return (
    <FooterPattern>
      <Logo src={efoodLogo} alt="efood" />
    </FooterPattern>
  )
}
