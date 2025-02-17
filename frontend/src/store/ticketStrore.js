import { create } from "zustand";

const API_URL = "http://localhost:5000/tickets"; 

export const useTicketStore = create((set, get) => ({
    tickets: [],
    filterStatus: "",
    sortBy: "latest",
    isLoading: false,
    error: null,
    setTickets: (tickets) => set({ tickets }),
    setFilterStatus: (status) => set({ filterStatus: status }), // ฟังก์ชันอัปเดต filter
    setSortBy: (sort) => set({ sortBy: sort }), // ฟังก์ชันอัปเดต sort

    fetchTickets: async () => {
        const { filterStatus, sortBy } = get();
    
        const queryParams = new URLSearchParams();
        if (filterStatus && filterStatus !== "all") {
            queryParams.append("status", filterStatus);
        }
        if (sortBy) queryParams.append("sort", sortBy);
    
        const queryString = queryParams.toString();
        console.log("🌍 API Request:", `${API_URL}${queryString ? `?${queryString}` : ""}`);
    
        const res = await fetch(`${API_URL}${queryString ? `?${queryString}` : ""}`);
        const data = await res.json();
        set({ tickets: data, isLoading: false });
    },
    
    createTicket: async (newTicket) => {
        if (!newTicket.title || !newTicket.description || !newTicket.contactInfo) {
            return { success: false, message: "Please fill in all fields" };
        }
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTicket)
        });
        const data = await res.json();
        set((state) => ({ tickets: [...state.tickets, data.data] }));
        return { success: true, message: "Ticket created successfully" }
    },

    UpdateTicket: async (ticketId, updatedTicket) => {
        const res = await fetch(`${API_URL}/${ticketId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTicket)
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        };

        //update the ui immediately, without needing refresh
        set((state) => ({ tickets: state.tickets.map((ticket) => (ticket._id === ticketId ? data.data : ticket)) }));
        return { success: true, message: "Ticket updated successfully" }
    }
}))
