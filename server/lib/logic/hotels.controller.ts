import {getHotelsFromSource} from "../dal/hotels.dal";
import {GetHotelRequest, Hotel} from "../types/hotel.types";
import {RequestHandler} from "express";
export const getHotels: RequestHandler<
    {},
    Hotel[],
    {},
    GetHotelRequest
> = async (req, res, next) => {
    try {
        const { ski_site , group_size, from_date, to_date } = req.query;
        const requestData  = { ski_site , group_size, from_date, to_date };
        const hotels = await getHotelsFromSource(requestData);
        res.json(hotels);
    } catch (err) {
        next(err)
    }
}
