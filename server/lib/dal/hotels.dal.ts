import { Hotel, GetHotelRequest} from "../types/hotel.types";
import {WeSkiProvider} from "../providers/WeSkiProvider";
import * as server from "../../server"
export async function getHotelsFromSource(hotelRequest: GetHotelRequest) : Promise<Hotel[]>{
    const hotelsProviders = [WeSkiProvider];
    let hotels: Hotel[] = [];
    for (const hotelsProvider of hotelsProviders) {
        const provider = new hotelsProvider();
        const providerRequest = provider.mapRequest(hotelRequest);
        const providerData = await provider.fetchData(providerRequest);
        const data = provider.mapResponse(providerData);
        server.io.emit("receiveData", data);
        hotels = hotels.concat(data);
    }
    return hotels;

}
