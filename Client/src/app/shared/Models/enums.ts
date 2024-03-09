export interface Enum {
    enumType: EnumType[]
    enumBrand: EnumBrand[]
  }
  
export interface EnumType {
    productTypeID: number
    typeName: string
  }
  
export interface EnumBrand {
    productBrandID: number
    brandName: string
  }
  