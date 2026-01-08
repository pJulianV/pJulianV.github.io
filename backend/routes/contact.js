import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

// Validaciones
const contactValidation = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),
  
  body('mensaje')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
];

// POST /api/contact
router.post('/', contactValidation, async (req, res) => {
  try {
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

    const { nombre, email, mensaje } = req.body;

    const emailSent = await sendContactEmail({
      nombre,
      email,
      mensaje,
      timestamp: new Date().toISOString()
    });

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Message sent successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    }

  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try later.'
    });
  }
});

export default router;
