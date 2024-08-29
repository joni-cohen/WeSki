import {Hotel} from "../types/hotel.types.ts";
import {HotelCard} from "./HotelCard.tsx";
import {DateRange} from "@mui/x-date-pickers-pro/models";
import {Dayjs} from "dayjs";
import {destinations} from "../constants";

export const SearchResults = ({hotels, destination, dates, groupSize}:
    {
        hotels:Hotel[],
        destination?: number,
        dates?:DateRange<Dayjs>,
        groupSize?:number
    } ) => {

    const destinationText = destinations.find((d) => d.id === destination)
    const getHotelsCards = () => {
        return hotels.map((hotel) => <HotelCard hotel={{...hotel}} destination={destinationText?.name} />)
    }
    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                textAlign: "left",
                width:"80%",
                padding:"0 30px"
            }}>
                <h1>Select your ski trip</h1>
                <div style={{marginBottom:"30px"}}>{hotels.length} ski trips options
                    • {destinationText?.name} • {dates?.[0]?.format("MMM DD")} - {dates?.[1]?.format("MMM DD")} • {groupSize} people
                </div>
                {getHotelsCards()}
            </div>
    )
}
