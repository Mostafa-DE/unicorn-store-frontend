export const urls = [
    `turkey-dresses`,
    `turkey-women-products`,
    `turkey-lingeries`,
    `turkey-abayas`,
    `local-lingeries`,
    `local-dresses`,
    `local-women-products`,
    `local-abayas`,
    `men-products`,
    `men-pajamas`,
    `kids-products`,
    `kids-dresses`,
    `kids-pajamas`,
    `kids-accessories`,
    `men-watches`,
    `women-accessories`,
    `bracelets`,
    `necklaces`,
    `rings`
]

export const AlertProductDoesNotExist = () => {
    return (
        <div className="containerSearchResults">
            <h1>😔 لا شيء هنا</h1>
            <p className="text-center">
                لم نتمكن من العثور على المنتج ، ربما لم يكن موجودًا أو غير متوفر
                حالياً
            </p>
        </div>
    )
}