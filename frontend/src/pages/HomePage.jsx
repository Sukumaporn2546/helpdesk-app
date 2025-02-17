import { Container, Table, Text, VStack, Box, Spinner, NativeSelectRoot, NativeSelectField, Button, Field, DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogActionTrigger, Input, Textarea } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useTicketStore } from '@/store/ticketStrore';
import { useState } from 'react';
import { toaster } from "@/components/ui/toaster"
const HomePage = () => {

    //fetch tickets
    const { tickets, fetchTickets, setFilterStatus, setSortBy, filterStatus, sortBy, isLoading, error, UpdateTicket } = useTicketStore();
    useEffect(() => {
        fetchTickets();
    }, [filterStatus, sortBy]);
    if (isLoading) return <Spinner size="xl" />;
    console.log("Tickets", tickets);

    const [open, setOpen] = useState(false);

    // สร้าง state สําหรับเก็บ ticket ที่จะอัปเดต แสดงค่าเดิมของ ticket ก่อน update
    const [selectedTicket, setSelectedTicket] = useState(tickets);

    // ฟังก์ชันเพื่อเปิด dialog และเลือก ticket ที่จะอัปเดต
    const handleUpdate = (ticket) => {
        setSelectedTicket(ticket); // ตั้งค่า ticket ที่จะอัปเดต
        setOpen(true); // เปิด dialog
    };

    // ฟังก์ชันเพื่ออัปเดต ticket and toast
    const handleUpdateTicket = async (ticketId, selectedTicket) => {
        console.log("Updating ticket:", selectedTicket);
        console.log("Ticket ID:", ticketId);
        const { success, message } = await UpdateTicket(ticketId, selectedTicket);
        if (!success) {
            toaster.create({
                title: "Cannot update ticket",
                description: message,
                type: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toaster.create({
                title: "Update Successful",
                description: message,
                type: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        setOpen(false);
        console.log("Success", success)
        console.log("Message", message)
    }


    return (
        <Container maxW='container.xl' py={3}>
            <VStack spacing={8}>
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    color="black"
                >
                    All Tickets
                </Text>

                {/*  Filter  */}
                <form style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px', marginTop: '-5px', marginBottom: '5px' }} >
                    <Field.Root style={{ display: 'flex', flexDirection: 'row' }}>
                        <Field.Label style={{ marginRight: '5px' }} w={"90px"} className='mt-2'>Filter By</Field.Label>
                        <NativeSelectRoot value={filterStatus || "all"}
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("🔄 Changing filterStatus to:", value);
                                // รีเซ็ตเป็น null เมื่อเลือก "All"
                                setFilterStatus(value === "all" ? null : value);
                            }} borderRadius="md" border={"1px"} borderColor={"#666666"} bg={"white"}>
                            <NativeSelectField color={"black"}
                                bg={
                                    filterStatus === "Pending" ? "#ffcd55" :
                                        filterStatus === "Accepted" ? "green.400" :
                                            filterStatus === "Resolved" ? "blue.400" :
                                                filterStatus === "Rejected" ? "red.400" :
                                                    "white" // กรณีที่ไม่มีการเลือก (ค่าปกติ)
                                }
                            >
                                <option value="null">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Rejected">Rejected</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </Field.Root>

                    {/* Sort */}
                    <Field.Root style={{ display: 'flex', flexDirection: 'row' }}>
                        <Field.Label mr={"5px"} w={"90px"} className='mt-2'>Sort By</Field.Label>
                        <NativeSelectRoot value={sortBy} onChange={(e) => setSortBy(e.target.value)} borderRadius="md" border={"1px"} borderColor={"#666666"} bg={"white"}>
                            <NativeSelectField bg={"white"} color={"black"} >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </Field.Root>
                </form>

                {/* Data of Ticket */}
                <Table.Root size={"sm"} variant="outline" bg="white" border="5px" borderColor="black"
                    borderRadius="md" boxShadow="lg">
                    <Table.Header fontSize={"15px"} fontWeight={"bold"} bg={"#e3b3d0"} >
                        <Table.Row>
                            <Table.ColumnHeader pl={8}>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Description</Table.ColumnHeader>
                            <Table.ColumnHeader>Contact</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Latest Update</Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tickets.map((ticket) => (
                            <Table.Row key={ticket._id} className='border-bottom p-0' >
                                <Table.Cell p={"10px"} pl={8} fontSize={"md"} fontWeight={"medium"}>{ticket.title}</Table.Cell>
                                <Table.Cell>{ticket.description}</Table.Cell>
                                <Table.Cell>{ticket.contactInfo}</Table.Cell>
                                <Table.Cell>
                                    <Box
                                        px={3} py={1}
                                        //display="inline-flex"
                                        borderRadius="md"
                                        textAlign="center"
                                        fontWeight={"medium"}
                                        color={"#3D3D3D"}
                                        bg={
                                            ticket.status === "Pending" ? "#ffcd55" :
                                                ticket.status === "Accepted" ? "green.400" :
                                                    ticket.status === "Resolved" ? "blue.400" :
                                                        "red.400"
                                        }
                                    >
                                        {ticket.status}
                                    </Box>
                                </Table.Cell>
                                <Table.Cell textAlign="center">{new Date(ticket.createdAt).toLocaleString()}</Table.Cell>
                                <Table.Cell pr={8}>
                                    <Button
                                        bg="#e3b3d0"
                                        color="black"
                                        _hover={{ bg: "#cf3090", transform: "scale(1.05)", transition: "all 0.2s ease" }}
                                        borderRadius="md"
                                        boxShadow="lg"
                                        p={4}
                                        border={"5px"}
                                        onClick={() => handleUpdate(ticket)}
                                    >
                                        Update
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                {/* Dialog Update Ticket */}
                <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} >
                    <DialogContent bg="#EBC9DE"
                        style={{
                            zIndex: 9999, // เพิ่ม z-index เพื่อให้มันอยู่เหนือองค์ประกอบอื่น
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)", //ให้มันอยู่ตรงกลาง
                            maxHeight: "80vh",
                            overflowY: "auto",
                        }}
                    >

                        <DialogHeader textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"} mt={3}>Update Ticket</DialogHeader>
                        <DialogBody mb={0}>
                            <VStack>

                                <Field.Root>
                                    <Field.Label >Title</Field.Label>
                                    <Input size="lg"
                                        name="title"
                                        bg="white"
                                        value={selectedTicket.title}
                                        onChange={(e) => setSelectedTicket({ ...selectedTicket, title: e.target.value })}
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Description</Field.Label>
                                    <Textarea size="lg"
                                        name="description"
                                        bg="white"
                                        value={selectedTicket.description}
                                        onChange={(e) => setSelectedTicket({ ...selectedTicket, description: e.target.value })}
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Contact Info</Field.Label>
                                    <Input size="lg"
                                        name="description"
                                        bg="white"
                                        value={selectedTicket.contactInfo}
                                        onChange={(e) => setSelectedTicket({ ...selectedTicket, contactInfo: e.target.value })}
                                    />
                                </Field.Root>

                                <Field.Root style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Field.Label w={"50px"} className='mt-3'>Status</Field.Label>
                                    <NativeSelectRoot
                                        borderRadius="md" border={"1px"} borderColor={"#666666"} mt={2} w={"22%"} bg="white">
                                        <NativeSelectField
                                            value={selectedTicket.status} // ตั้งค่า value เพื่อให้แสดงค่าปัจจุบัน
                                            onChange={e => setSelectedTicket({ ...selectedTicket, status: e.target.value })} // ใช้ onChange 
                                            bg={selectedTicket.status === 'Pending' ? '#ffcd55' : selectedTicket.status === 'Accepted' ? 'green.400' : selectedTicket.status === 'Resolved' ? 'blue.400' : 'red.400'} // เปลี่ยนสีตามสถานะ
                                            color={"black"}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Rejected">Rejected</option>
                                        </NativeSelectField>
                                    </NativeSelectRoot>
                                </Field.Root>
                            </VStack>
                        </DialogBody>

                        {/* button in dialog */}
                        <DialogFooter>
                            <DialogActionTrigger asChild>
                                <Button variant="outline" onClick={() => setOpen(false)}
                                    size="lg"
                                    bg="#edebec"
                                    color="black"
                                    _hover={{ bg: "white", transform: "scale(1.05)", transition: "all 0.2s ease" }}
                                    borderRadius="md"
                                    boxShadow="lg"
                                    p={3}
                                    w={"90px"}
                                    border={"none"}
                                >Cancel</Button>
                            </DialogActionTrigger>
                            <Button size="lg"
                                bg="#ed5fb5"
                                color="black"
                                _hover={{ bg: "#D555A2", transform: "scale(1.05)", transition: "all 0.2s ease" }}
                                borderRadius="md"
                                boxShadow="lg"
                                border={"none"}
                                w={"90px"}
                                p={3}
                                onClick={() => handleUpdateTicket(selectedTicket._id, selectedTicket)}
                            >Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </DialogRoot>

            </VStack>
        </Container>
    )
}

export default HomePage