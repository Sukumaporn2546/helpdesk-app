import express from "express";

import { createTicket, getTicketById, getTickets, updateTicket } from "../controller/ticket.controller.js";

const router = express.Router();

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);

//router.delete("/:id", deleteTicket);

export default router;

