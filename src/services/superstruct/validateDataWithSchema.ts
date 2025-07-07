import { Struct, StructError, validate } from 'superstruct'

const formatStructErrorMessage = (error: StructError) => {
  const { path, value, type } = error
  return `응답 데이터의 필드 타입이 스키마에 맞지 않습니다.
잘못된 데이터의 필드: ${path.findLast((part) => isNaN(Number(part)))},
기대한 필드의 타입: ${type},
실제로 온 필드의 값: ${value}`
}

const validateDataWithSchema = async (data: unknown, schema: Struct) => {
  const [error] = validate(data, schema)
  if (error) {
    const errorMessage = formatStructErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default validateDataWithSchema
