import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get form fields based on role and form type
router.get('/:type', authMiddleware, (req, res) => {
  const { type } = req.params;
  const { role } = req.query;

  let fields = [];

  switch (type) {
    case 'register':
      if (role === 'NGO') {
        fields = [
          {
            name: 'name',
            type: 'text',
            label: 'Organization Name',
            required: true,
            placeholder: 'Enter organization name',
            validation: { min: 3, max: 100 }
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: true,
            placeholder: 'Enter email address'
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
            validation: { min: 6 }
          },
          {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            placeholder: 'Brief description of your organization'
          },
          {
            name: 'website',
            type: 'text',
            label: 'Website',
            placeholder: 'https://yourwebsite.com'
          },
          {
            name: 'contactEmail',
            type: 'email',
            label: 'Contact Email',
            placeholder: 'contact@yourorg.com'
          },
          {
            name: 'contactPhone',
            type: 'text',
            label: 'Contact Phone',
            placeholder: '+1234567890'
          },
          {
            name: 'logo',
            type: 'file',
            label: 'Organization Logo',
            accept: 'image/*'
          }
        ];
      } else {
        fields = [
          {
            name: 'name',
            type: 'text',
            label: 'Full Name',
            required: true,
            placeholder: 'Enter your full name',
            validation: { min: 3, max: 50 }
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: true,
            placeholder: 'Enter email address'
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
            validation: { min: 6 }
          }
        ];
      }
      break;

    case 'campaign':
      fields = [
        {
          name: 'title',
          type: 'text',
          label: 'Campaign Title',
          required: true,
          placeholder: 'Enter campaign title',
          validation: { min: 5, max: 100 }
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          placeholder: 'Describe your campaign'
        },
        {
          name: 'goalAmount',
          type: 'number',
          label: 'Goal Amount',
          required: true,
          placeholder: '1000',
          validation: { min: 1 }
        },
        {
          name: 'currency',
          type: 'select',
          label: 'Currency',
          required: true,
          options: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' }
          ]
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
          required: true
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          required: true
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          options: [
            { value: 'education', label: 'Education' },
            { value: 'health', label: 'Health' },
            { value: 'environment', label: 'Environment' },
            { value: 'poverty', label: 'Poverty Relief' },
            { value: 'disaster', label: 'Disaster Relief' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'images',
          type: 'file',
          label: 'Campaign Images',
          accept: 'image/*',
          multiple: true
        }
      ];
      break;

    case 'beneficiary':
      fields = [
        {
          name: 'name',
          type: 'text',
          label: 'Beneficiary Name',
          required: true,
          placeholder: 'Enter beneficiary name',
          validation: { min: 2, max: 50 }
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          placeholder: 'Describe the beneficiary'
        },
        {
          name: 'needs',
          type: 'textarea',
          label: 'Specific Needs',
          placeholder: 'What does this beneficiary need?'
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          placeholder: 'City, Country'
        },
        {
          name: 'age',
          type: 'number',
          label: 'Age',
          validation: { min: 0, max: 120 }
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Gender',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'photo',
          type: 'file',
          label: 'Photo',
          accept: 'image/*'
        }
      ];
      break;

    default:
      return res.status(400).json({ message: 'Invalid form type' });
  }

  res.json({ fields });
});

export default router;