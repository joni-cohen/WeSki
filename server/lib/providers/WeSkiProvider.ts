import {HotelProvider} from "./hotelProvider";
import {GetHotelRequest, Hotel} from "../types/hotel.types";
import axios from "axios";
import date from 'date-and-time'

export class WeSkiProvider implements HotelProvider<GetHotelRequest, Hotel[]> {

    mapRequest(getHotelRequest: GetHotelRequest) : GetHotelRequest {
        return getHotelRequest
    }

    async fetchData(providerRequest: GetHotelRequest) {
        let { group_size: currentSize, from_date, to_date} = providerRequest;
        const resultsPromises = [];
        const fromDate =new Date(from_date)
        const toDate =new Date(to_date)
        const hotelsRoute = "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator"
        try {
            while(currentSize<=10){
                resultsPromises.push(axios.post(hotelsRoute, {
                    query: {...providerRequest, group_size: currentSize, from_date: "03/04/2025", to_date: "03/11/2025"}
                }));
                currentSize++;
            }
            const hotels = await Promise.all(resultsPromises)
            return hotels.reduce(
                (accumulator, currentValue) => {
                    return accumulator.concat(currentValue.data.body.accommodations)
                }
                , [])
        } catch (err) {
            throw err;
        }
    }

    mapResponse(providerResponse: Hotel[] ):  Hotel[] {
        return providerResponse;
    }
}
