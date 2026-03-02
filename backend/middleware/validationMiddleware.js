import Joi from 'joi';

// User validation schemas
export const userSchemas = {
  register: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'NGO', 'DONOR').default('DONOR'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
  }),
};

// NGO validation schemas
export const ngoSchemas = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),
    website: Joi.string().uri(),
    contactEmail: Joi.string().email(),
    contactPhone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  }),

  update: Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().max(500),
    website: Joi.string().uri(),
    contactEmail: Joi.string().email(),
    contactPhone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    status: Joi.string().valid('pending', 'approved', 'rejected'),
  }),
};

// Campaign validation schemas
export const campaignSchemas = {
  create: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().max(1000).required(),
    goalAmount: Joi.number().min(1).required(),
    currency: Joi.string().valid('USD', 'EUR', 'GBP').default('USD'),
    startDate: Joi.date().min('now'),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    ngoId: Joi.string().required(),
  }),

  update: Joi.object({
    title: Joi.string().min(5).max(100),
    description: Joi.string().max(1000),
    goalAmount: Joi.number().min(1),
    currency: Joi.string().valid('USD', 'EUR', 'GBP'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    status: Joi.string().valid('active', 'completed', 'cancelled'),
  }),
};

// Beneficiary validation schemas
export const beneficiarySchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(500),
    needs: Joi.string().max(1000),
    location: Joi.string().max(100),
    ngoId: Joi.string().required(),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().max(500),
    needs: Joi.string().max(1000),
    location: Joi.string().max(100),
  }),
};

// Donation validation schemas
export const donationSchemas = {
  create: Joi.object({
    amount: Joi.number().min(0.01).required(),
    currency: Joi.string().valid('USD', 'EUR', 'GBP').default('USD'),
    campaignId: Joi.string().required(),
    donorId: Joi.string().required(),
    paymentMethod: Joi.string().valid('card', 'bank', 'paypal').required(),
  }),
};

// Validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
    next();
  };
};