import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import ticketRoutes from "./routes/ticket.route.js";
import path from 'path';

//set up database
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(cors());
app.use(express.json()); //allow us to accept JSON data in the req.body

app.use("/tickets", ticketRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT)
});

