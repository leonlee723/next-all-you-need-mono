import express from 'express';
import validate from '../../middlewares/validate';
import authValidation from '../../validations/auth.validation';
import { oauthController } from '../../controllers'; 

const router = express.Router();

router.post('/login', validate(authValidation.oauthLogin), oauthController.loginOauth);

export default router;