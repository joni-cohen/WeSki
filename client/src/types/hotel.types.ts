type HotelImage = {
    URL: string;
}

type HotelInfo = {
    Position: HotelPosition;
    Rating: string;
    Beds: string;
}

type PriceInfo = {
    AmountAfterTax: string;
    AmountBeforeTax: string;
}
type Distance = {
    type: string;
    distance: string;
}

type HotelPosition = {
    Latitude:string;
    Longitude:string;
    Distances: Distance[];
}


export type Hotel = {
    HotelCode: string;
    HotelName: string;
    HotelDescriptiveContent: { Images: HotelImage[] },
    HotelInfo: HotelInfo;
    PricesInfo: PriceInfo;
}

export type GetHotelRequest = {
    ski_site: number;
    from_date: string;
    to_date: string;
    group_size: number;
}
