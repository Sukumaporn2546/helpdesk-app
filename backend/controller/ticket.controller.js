import Ticket from "../models/ticket.model.js";
import mongoose from "mongoose";
export const getTickets = async (req, res) => {
    try {
        const { status, sort } = req.query; // รับค่าจาก Query Parameters
        let query = {}; // สร้าง Object สำหรับค้นหา

        // ถ้ามีการเลือก Filter ตามสถานะ
        if (status && status !== "null") {
            query.status = status; // กรองเฉพาะสถานะที่ต้องการ
        }

        // ตั้งค่าเรียงลำดับข้อมูล 
        let sortOption = {};
        if (sort === "latest") {
            sortOption.updatedAt = -1; // เรียงจากใหม่ไปเก่า
        } else if (sort === "oldest") {
            sortOption.updatedAt = 1; // เรียงจากเก่าไปใหม่
        }

        // ค้นหาข้อมูลจาก MongoDB ตามเงื่อนไขที่กำหนด
        const tickets = await Ticket.find(query).sort(sortOption);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createTicket = async (req, res) => {
    const ticket = req.body;
    if (!ticket.title || !ticket.description || !ticket.contactInfo)
        return res.status(400).json({ success: false, message: "Please fill in all fields" });

    const newTicket = new Ticket(ticket);

    try {
        await newTicket.save();
        res.status(201).json({ success: true, data: newTicket });
    } catch (error) {
        console.error("Error in create ticket", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const ticket = req.body;
    
    // wrong id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID" });
    }
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(id, ticket, { new: true });
        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        console.error("Error in update ticket", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



/*
export const deleteTicket = async (req, res) => {
        const {id} = req.params;
        try{
            await Ticket.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Ticket deleted"});
        } catch (error) {
            console.error("Error in delete ticket", error.message);
            res.status(500).json({success: false, message: "Server error " });
        }
};
*/