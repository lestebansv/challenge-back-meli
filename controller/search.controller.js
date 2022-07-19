const axios = require('axios');
const { processCategories, processProducts, processDataProduct } = require('../utils/processData');

/**
 * @object obj author challenge
 */
const author = {
    author: {
        name: 'Ludwin Esteban',
        lastname: 'Sichacá Valbuena'
    },
}

/**
 * Call API list product by category
 * 
 * @param {*} req 
 * @param {*} res 
 */
const searchProducts = async (req, res) => {
    await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`)
        .then(function (response) {
            return response.data;
        })
        .then(function (data) {
            const categories = processCategories(data.filters);
            const items = processProducts(data.results.slice(0, 4));
            const body = {
                ...author,
                categories,
                items
            }
            res.json(body);
        })
        .catch(function (err) {
            res.json(err);
        });
}

/**
 * Call API description product by ID
 * 
 * @param {*} req 
 * @param {*} res 
 */
const descriptionProducts = async (req, res) => {
    const id = req.params.id;
    const idPromise = axios.get(`https://api.mercadolibre.com/items/${id}`);
    const descriptionPromise = axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    Promise.all([idPromise, descriptionPromise]).then(([id, description]) => {
        const item = processDataProduct(id.data, description.data);
        const body = {
            ...author,
            item
        }
        res.json(body);
    }).catch(function (err) {
        res.json(err);
    });
}

module.exports = { searchProducts, descriptionProducts }