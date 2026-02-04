import React from 'react'

const ProductsDetails = async ({ params }) => {
    const { productId } = await params;
  return (
    <div>
      hello products : {productId}
    </div>
  )
}

export default ProductsDetails
