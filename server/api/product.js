const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const products = await Product.getAllProducts()
      res.json(products)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.getSingleProduct(req.params.id)
        res.json(product)
    } catch (e) {
        next(e)
    }
})