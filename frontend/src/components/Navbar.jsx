import { Box, HStack, Flex, Link, Text, Button, Container } from "@chakra-ui/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";


const Navbar = () => {

    return (
        <Box
            as="nav"
            bg="#cf3090"
            w="full"
            zIndex={1000} // ให้ Navbar อยู่ด้านบนสุด
            boxShadow="md"
            color="white"
        >
            <Container maxW="full" px={4} pr={8} pt={2}>
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                    flexDir={{ base: "column", md: "row" }}
                >
                    {/* Title */}
                    <Text
                        fontSize={26}
                        fontWeight="medium"
                        color="white"
                    >
                        🖥️ Helpdesk Support Ticket Management
                    </Text>

                    {/* Button */}
                    <HStack spacing={2} alignItems="center">
                        <Link href="/" className="text-decoration-none">
                            <Button
                                bg="#61baae"
                                color="white"
                                _hover={{ bg: "#33beae", transform: "scale(1.05)", transition: "all 0.2s ease" }}
                                borderRadius="md"
                                boxShadow="lg"
                                border={"none"}
                                p={3}
                            >
                                <IoTicketOutline size={30} />
                                All Tickets
                            </Button>
                        </Link>

                        <Link href="/create" className="text-decoration-none">
                            <Button
                                bg="#61baae"
                                color="white"
                                _hover={{ bg: "#33beae", transform: "scale(1.05)", transition: "all 0.2s ease" }}
                                borderRadius="md"
                                boxShadow="lg"
                                border={"none"}
                                p={4}
                            >
                                <CiSquarePlus size={28} />
                                New Ticket
                            </Button>
                        </Link>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}

//export default only 1 component
export default Navbar;
