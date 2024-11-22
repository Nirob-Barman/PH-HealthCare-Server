import express from 'express'
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';

const router = express.Router();

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(DoctorValidation.update),
    DoctorController.updateIntoDB
);

export const DoctorRoutes = router