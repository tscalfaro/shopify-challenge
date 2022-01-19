const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.route('/')
.get( async (req, res, next) => {
    try {
      const products = await Product.getAllProducts()
      res.json(products)
    } catch (err) {
      next(err)
    }
  })
  .post( async (req, res, next) => {
    try {
      res.send(await Product.editProduct(req.body, 'add'))
    } catch (e) {
      next(e)
    }
  })

router.route('/:id')
.get(async (req, res, next) => {
    try {
        const product = await Product.getSingleProduct(req.params.id)
        res.json(product)
    } catch (e) {
        next(e)
    }
})
.post(async (req, res, next) => {
  try {
    res.send(await Product.editProduct(req.body, 'update'))
  } catch (e) {
    next(e)
  }
})
.delete(async (req, res, next) => {
  try {
    const product = await Product.getSingleProduct(req.params.id)
    await Product.editProduct(product, 'delete')
    res.sendStatus(202);
  } catch (e) {
    next(e)
  }
})