export const urls = [
    "midi-dresses",
    "long-dresses",
    "off-dresses",
    "a-dresses",
    "mini-dresses",
    "suit-dresses",
    "jsuit-dresses",
    "hijab-dresses",
    "new-arrivals",
    "offers"
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