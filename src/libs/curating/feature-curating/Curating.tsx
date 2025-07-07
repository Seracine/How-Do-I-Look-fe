import { CuratingType } from '@services/types'
import CuratingLayout from '../ui-curating/CuratingLayout'
import CuratingOptionButtons from './CuratingOptionButtons'

type CuratingProps = {
  curating: CuratingType
}

const Curating = ({ curating }: CuratingProps) => {
  return (
    <CuratingLayout
      curating={curating}
      optionButtons={<CuratingOptionButtons curating={curating} />}
    />
  )
}

export default Curating
