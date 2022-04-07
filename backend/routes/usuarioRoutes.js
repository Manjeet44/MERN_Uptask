import express from 'express';
import { registrar, autenticar } from '../controllers/usuarioController.js';
const router = express.Router();


//Autenticacion, Registro y confirmacion de Usuarios
router.post('/', registrar); //Crea nuevo usuario
router.post('/login', autenticar); //Crea nuevo usuario


export default router;