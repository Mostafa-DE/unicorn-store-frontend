import ProductItems from "@/components/ProductItems/ProductItems";

export default function ProductsWithSearch({
  productsData,
  searchTerm,
  pathname,
  token,
}) {
  const allProductsFiltered = productsData.filter((products) => {
    if (searchTerm === "") {
      return products;
    } else if (products.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return products;
    } else if (
      products.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return products;
    }
  });

  return (
    <>
      {allProductsFiltered.map((productData) => (
        <ProductItems
          key={productData.id}
          pathname={pathname}
          product={productData}
          token={token}
        />
      ))}

      {allProductsFiltered.length === 0 ? (
        <div className="containerSearchResults">
          <h1>😔 لا شيء هنا</h1>
          <p className="text-center">
            لم نتمكن من العثور على المنتج ، ربما لم يكن موجودًا أو غير متوفر
            حالياً
          </p>
        </div>
      ) : null}
    </>
  );
}
