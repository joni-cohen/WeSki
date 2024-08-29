import {Hotel} from "../types/hotel.types.ts";
import location from "../assets/location.svg"
import stars from "../assets/stars.svg"
export const HotelCard = ({hotel, destination}: {hotel: Hotel, destination?: string}  ) => {
    return (
        <>
            <div style={{
                textAlign: "left",
                minHeight:"238px",
                display:"flex",
                flexDirection: "row",
                border: "1px solid #E0E3EB",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                overflow:"hidden",
                marginBottom: "20px",
                flexWrap:"wrap",
            }}>
                    <img width="380px" height="238px" src={hotel.HotelDescriptiveContent?.Images?.[0]?.URL} alt={hotel.HotelName}/>
                <div style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    padding:"20px",
                    flexGrow: 12
                }}>
                    <div style={{flexGrow: 12, color: "#525D7A"}}>
                        <div style={{ fontSize: "18px", color: "#000000", fontWeight: "500"}}>
                            {hotel.HotelName}
                        </div>
                        <div style={{
                            textAlign: "left",
                            display: "flex",
                            flexDirection:"column"
                        }}>
                            <div style={{padding: "10px 0"}}>
                                <img src={stars} alt={hotel.HotelName}/>
                            </div>
                            <div>
                                <img src={location} alt={hotel.HotelName}/> {destination}
                            </div>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "right",
                        borderTop: "1px solid #E0E3EB",
                        paddingTop: "20px",
                        color: "#525D7A"
                    }}><span style={{fontSize: "28px", color: "#000000"}}>£{hotel.PricesInfo?.AmountAfterTax} </span>/per person</div>
                </div>
            </div>
        </>
    )
}

