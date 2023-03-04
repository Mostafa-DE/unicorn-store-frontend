export const calculateDiscountPrice = (oldPrice: number, discountPercentage: number) => {
    const discountValue = oldPrice * (discountPercentage / 100);
    const newPrice = oldPrice - discountValue;
    return newPrice.toFixed(2);
}
