export const calculateDiscountPrice = (oldPrice: number, discountPercentage: number) => {
    const discountValue = oldPrice * (discountPercentage / 100); 
    return oldPrice - discountValue;
}
