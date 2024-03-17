interface ParamType {
  name: string
  value: any
}

export const handleChangeURLParams = (
  paramList: ParamType[],
  navigate: any,
  params: URLSearchParams,
  pathname: string
) => {
  paramList.map((param: ParamType) => {
    params.set(param.name, String(param.value))
    return param
  })
  navigate(`${pathname}?${params.toString()}`)
}

export const paramsConfig = (searchObject: object) => {
  let config = { params: searchObject }
  return config
}
