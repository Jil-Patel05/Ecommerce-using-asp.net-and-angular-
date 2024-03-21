export interface PaginationProducts {
  pageNumber: number
  pageSize: number
  count:number,
  products: Product[]
}

export interface Product {
  productID: number
  productName: string
  productDescription: string
  price: number,
  numberOfProduct:number,
  productUrl: string[]
  typeName: string
  brandName: string
  noOfReviews: number
  productRating:number
  reviewInfo: ReviewInfo[]
}

export interface ReviewInfo {
  userFullName: string
  userReview: string
  userRating: number
}