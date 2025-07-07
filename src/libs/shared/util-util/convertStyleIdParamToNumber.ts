const convertStyleIdParamToNumber = (styleId?: string): number => {
  return isNaN(Number(styleId)) ? 0 : Number(styleId)
}

export default convertStyleIdParamToNumber
