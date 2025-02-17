import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Resolved", "Rejected"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", TicketSchema);
//because package.json use "type":"module"
export default Ticket;