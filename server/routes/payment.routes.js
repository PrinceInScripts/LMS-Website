import {Router} from 'express'
import { buySubscription, cancelSubcription, getAllPayments, getRazorpayApiKey, verifySubcription } from '../controllers/payment.controllers.js'
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js'

const router=Router()

router
      .route('/razorpay-key')
      .get(
        isLoggedIn,
        getRazorpayApiKey)

router
     .route('/subscribe')
     .post(
        isLoggedIn,
        buySubscription)

router
     .route('/verify')
     .post(
        isLoggedIn,
        verifySubcription)

router
     .route('/unsubcribe')
     .post(
        isLoggedIn,
        cancelSubcription)

router  
     .route('/')
     .get(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        getAllPayments)


export default router;