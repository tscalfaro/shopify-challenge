const db = require('../db');
const Sequelize = require('sequelize');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            isNumeric: true,
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})
module.exports = Product;
//Instance Methods

Product.getAllProducts = async () => {
    const products = await Product.findAll();
    products.sort((a, b) => (a.id > b.id ? 1 : -1))
    return products
}

Product.getSingleProduct = async id => {
    const product = await Product.findByPk(id);
    return product;
}

Product.getProductByLocation = async location => {
    const products = await Product.findAll({
        where: {
            location: location
        }
    })
    products.sort((a, b) => a.id > b.id ? 1 : -1)
    return products;
}

Product.editProduct = async (data, action) => {

    if (action === 'add') {
        const product = await Product.create(data)
        return product;
    } else if( action === 'delete') {
        const product = await Product.findByPk(data.id);
        await product.destroy()
        return product;
    } else if ( action === 'update') {
        const product = await Product.findByPk(data.id)
        let updatedProd = await product.update(data);
        return updatedProd;
    }

}

