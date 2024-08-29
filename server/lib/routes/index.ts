import hotelRoutes from "./hotelsRoutes"
import express from 'express';
const routes = express();

routes.use('/api/hotels', hotelRoutes);


export default routes;
