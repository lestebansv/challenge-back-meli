/**
 * Get items of category for breadcrumbs component
 * 
 * @param data (JSON) - Data filters from endpoint MELI
 * @returns Array with items of category for breadcrumbs component
 */
exports.processCategories = (data) => {
    return data.length > 0 ?
        data.find((categorie) => categorie.id === 'category').values[0].path_from_root.map((value) => value.name) : null;
}

/**
 * Sort items from array endpoint MELI
 * 
 * @param data (Array) - Items from endpoint MELI
 * @returns Product array data by category
 */
exports.processListProducts = (data) => {
    return data.map((product) => {
        return basicDataProducts(product)
    });
}

/**
 * Sort data only one item from endpoint MELI
 * 
 * @param data (JSON) - Data from endpoint MELI
 * @param description (JSON) - Description data from endpoint MELI
 * @returns 
 */
exports.processDataProduct = (data, description) => {
    return basicDataProducts(data, description);
}

/**
 * Create JSON with data ordered from item MELI
 * 
 * @param data (JSON) - Data from endpoint MELI
 * @param description (JSON) - Description data from endpoint MELI
 * @return JSON with data ordered
 */
basicDataProducts = (product, description = '') => {
    let descr = '';

    if (description !== '') {
        descr = {
            description: description.plain_text,
            img: product.pictures
        }
    }

    return {
        id: product.id,
        title: product.title,
        price: {
            currency: product.currency_id,
            amount: product.price
        },
        picture: product.thumbnail,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping,
        sold_quantity: product.sold_quantity,
        address: product.address,
        tags: product.tags,
        ...descr
    }
}
