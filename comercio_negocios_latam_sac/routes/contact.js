import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

// Validaciones para el formulario de contacto
const contactValidation = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('empresa')
    .trim()
    .notEmpty().withMessage('La empresa es requerida')
    .isLength({ min: 2, max: 100 }).withMessage('La empresa debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('telefono')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('El teléfono debe contener solo números y símbolos válidos'),
  
  body('mensaje')
    .trim()
    .notEmpty().withMessage('El mensaje es requerido')
    .isLength({ min: 10, max: 1000 }).withMessage('El mensaje debe tener entre 10 y 1000 caracteres')
];

// POST /api/contact - Enviar formulario de contacto
router.post('/', contactValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { nombre, empresa, email, telefono, mensaje } = req.body;

    // Enviar el email
    const emailSent = await sendContactEmail({
      nombre,
      empresa,
      email,
      telefono,
      mensaje,
      timestamp: new Date().toISOString()
    });

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      });
    }

  } catch (error) {
    console.error('Error en ruta de contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, intenta más tarde.'
    });
  }
});

export default router;
