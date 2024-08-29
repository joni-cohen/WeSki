import {useEffect, useRef, useState} from 'react'
import { Button, InputLabel, MenuItem, FormControl} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './App.css'
import { socket } from './socket';
import {Hotel} from "./types/hotel.types.ts";
import {fetchHotels} from "./apis/hotels.api.ts";
import {destinations} from "./constants";
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {SearchResults} from "./components/SearchResults.tsx";
import weski from "./assets/weski.svg"
function App() {
    const [hotels, setHotels ] = useState<Hotel[]>([]);
    const data = useRef<Hotel[]>([]);
    const [destination, setDestination] = useState<number>();
    const [groupSize, setGroupSize] = useState<number>();
    const [dateValues, setDateValues] = useState<DateRange<Dayjs>>();
    const handleDestinationChange = (event: SelectChangeEvent) => {
        setDestination(parseInt(event.target.value));
    };

    const handleGrouSizeChange = (event: SelectChangeEvent) => {
        setGroupSize(parseInt(event.target.value));
    };

    const fetchDataFromServer = () => {
        setHotels([]);
        data.current = [];
        if(destination && groupSize && dateValues){
            fetchHotels(destination, groupSize, dateValues);
        }
    };

    useEffect(() => {
        const onDeceiveData = (dataReceived: Hotel[]) => {
            data.current = data.current.concat(dataReceived);
            setHotels(data.current);
        }

        socket.on('receiveData', onDeceiveData);

        return () => {
            socket.off('receiveData', onDeceiveData);
        };
    }, []);

    const getDestinations = () =>{
        return destinations.map((destination) => {
            return <MenuItem value={destination.id}>{destination.name}</MenuItem>
        });
    }

    const getGroupSize = () =>{
        const items = [];
        for(let i=1; i<=10; i++){
            items.push(<MenuItem value={i}>{i} People</MenuItem>)
        }
        return items;
    }
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap", width:"100%", backgroundColor:"#FFFFFF", borderBottom:"1px solid #E0E3EB", padding:"0"}}>
                <div style={{float: "left", marginTop:"15px",padding:"15px"}}><img src={weski} width="126px" alt=""/></div>
                    <div style={{float: "left", padding:"0 15px"}}>
                        <FormControl sx={{ m: 1, minWidth: 80, paddingTop:"8px"}}>
                            <InputLabel id="ski-site-select-label">Destination</InputLabel>
                            <Select
                                labelId="ski-site-select-label"
                                id="ski_site"
                                value={destination?.toString()}
                                label="Destination"
                                onChange={handleDestinationChange}
                            >
                                {getDestinations()}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{float: "left", padding:"0 15px", paddingTop:"8px"}}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="group-size-select-label">Group Size</InputLabel>
                            <Select
                                labelId="group-size-select-label"
                                id="group-size"
                                value={groupSize?.toString()}
                                label="Group Size"
                                onChange={handleGrouSizeChange}
                            >
                                {getGroupSize()}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{float: "left", padding:"0 15px"}}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateRangePicker localeText={{start: 'Start Date', end: 'End Date'}}
                                                     onChange={(newValue) => setDateValues(newValue)}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </div>
                    <Button style={{ marginTop:"30px"}} type="submit" onClick={fetchDataFromServer}>Search</Button>
            </div>
            {(hotels.length > 0) && <SearchResults hotels={hotels} destination={destination} dates={dateValues}  groupSize={groupSize}/>}
        </div>
    )
}

export default App
