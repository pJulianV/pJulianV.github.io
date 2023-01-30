import express from 'express';
import { regusuario, showuser, shuserone, deluser, upuser  } from '../controllers/userscontroller.js';
import { regevento, shevento, shonevent, delevento, upevento } from '../controllers/eventcontrollers.js';
import {login, loginjwt} from '../controllers/logincontrollers.js';
import {requireToken} from '../Midlewares/auth.js'
import {db} from '../mongodb.js';



export const router = express.Router();


//rutas collection usuarios
router.post('/login1',requireToken, loginjwt );
router.post('/login', login );
router.post('/reguser', regusuario);
router.get('/shuser',requireToken, showuser);
router.get('/shuser/:id', shuserone);
router.delete('/shuser/:id',deluser);
router.put('/shuser/:id', upuser);

//rutas para los eventos deportivos

router.post('/regevento', regevento);
router.get('/shevento',requireToken, shevento);
router.get('/shevento/:id', shonevent);
router.delete('/delevento/:id', delevento);
router.put('/upevento/:id', upevento);

export default router;