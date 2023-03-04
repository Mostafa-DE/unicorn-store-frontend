import ProductItems from "@/components/ProductItems/ProductItems";

export default function ProductsWithSearch({products, searchTerm, pathname}) {
    let allProductsFiltered = [];
    if (products.length > 0) {
        allProductsFiltered = products.filter((products) => {
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
    }

    return (
        <>
            {allProductsFiltered.length === 0 ? (
                <div className="containerSearchResults">
                    <h1>😔 لا شيء هنا</h1>
                    <p className="text-center">
                        لم نتمكن من العثور على المنتج ، ربما لم يكن موجودًا أو غير متوفر
                        حالياً
                    </p>
                </div>
            ) : allProductsFiltered.map((product) => (
                <ProductItems
                    key={product.id}
                    pathname={pathname}
                    product={product}
                />
            ))}
        </>
    );
}
