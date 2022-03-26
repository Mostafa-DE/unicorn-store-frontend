export const values = {
    start: 0,
    end: 0,
    totalPages: 0
}

export const getStartAndEndValueForPagination = (product, page) => {
    const perPage = 10;
    const totalProducts = product.length;
    values.totalPages = Math.round(totalProducts / perPage);
    if (values.totalPages < 1) {
        values.totalPages = 1;
    }
    values.start = (page - 1) * perPage;
    values.end = values.start + perPage;
    if (values.end > totalProducts) {
        values.end = totalProducts;
    }
}