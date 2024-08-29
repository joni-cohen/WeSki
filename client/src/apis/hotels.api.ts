import {DateRange} from "@mui/x-date-pickers-pro/models";
import {Dayjs} from "dayjs";

export const fetchHotels = (destination: number, groupSize: number, dates :DateRange<Dayjs> ) =>
{
   fetch(`http://localhost:8080/api/hotels?ski_site=${destination}&group_size=${groupSize}&from_date=${dates?.[0]?.format("YYYY-MM-DD")}&to_date=${dates?.[1]?.format("YYYY-MM-DD")}`);
};
