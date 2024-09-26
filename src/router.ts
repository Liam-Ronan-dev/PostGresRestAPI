import { Router } from 'express';
import { body, check, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getOneUpdatePoint,
  getUpdatePoints,
  updateUpdatePoint,
} from './handlers/updatePoint';

const router = Router();

/**
 * Product Routes
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update Routes
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  oneOf([
    check('status').equals('IN_PROGRESS').optional(),
    check('status').equals('SHIPPED').optional(),
    check('status').equals('DEPRECATED').optional(),
  ]),
  body('version').optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputErrors,
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

/**
 * Update point Routes
 */
router.get('/updatepoint', getUpdatePoints);
router.get('/updatepoint/:id', getOneUpdatePoint);
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputErrors,
  updateUpdatePoint
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputErrors,
  createUpdatePoint
);
router.delete('/updatepoint/:id', deleteUpdatePoint);

router.use((err, req, res, next) => {
  console.log(err)
  res.json({message: "router handler"})
})
export default router;
