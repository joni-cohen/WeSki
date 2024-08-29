import {GetHotelRequest, Hotel} from "../types/hotel.types";

export interface HotelProvider <ProviderRequest, ProviderResponse> {
    mapRequest(getHotelRequest: GetHotelRequest): ProviderRequest;
    fetchData(providerRequest:ProviderRequest): Promise<ProviderResponse>;
    mapResponse(providerResponse: ProviderResponse): Hotel[];
}
