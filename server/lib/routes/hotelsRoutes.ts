import {validateQuery} from "../middleware/validateRequest";
import Joi from "joi";
import {getHotels} from "../logic/hotels.controller";
import express from 'express';

const hotelRouter = express.Router();

hotelRouter.get('/',
    validateQuery(Joi.object({
        ski_site: Joi.number().required(),
        group_size: Joi.number().required().greater(0),
        from_date: Joi.date().required(),
        to_date: Joi.date().required().greater(Joi.ref('from_date'))
    }).required()));

hotelRouter.get('/',getHotels);

export default hotelRouter;
