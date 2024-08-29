import {Schema} from "joi";
import {Request, Response, NextFunction} from "express";


export function validateQuery(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.query);
        } catch (err) {
            return res.status(400).send(err);
        }
        next();
    };
}
