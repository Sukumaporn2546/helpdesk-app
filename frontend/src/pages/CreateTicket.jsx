import { Container, VStack, Box, Button, Heading, Input, Field, Text, Textarea, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTicketStore } from '@/store/ticketStrore';
import { toaster } from "@/components/ui/toaster"

const CreatePage = () => {

  const { createTicket } = useTicketStore();

  //handle create ticket and toast 
  const handleAddTicket = async () => {
    const { success, message } = await createTicket(newTicket)

    if (!success) {
      toaster.create({
        title: "Cannot create ticket",
        description: message,
        type: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 5000,
        isClosable: true
      });
    }
    console.log("Success", success)
    console.log("Message", message)
  };

  //state cancel clear form
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    contactInfo: ""
  });
  const handleCancel = () => {
    setNewTicket({
      title: "",
      description: "",
      contactInfo: "",
    });
  };

  return <Container maxW={"container.sm"} pt={"8vh"} display="flex" alignItems="center" justifyContent="center">

    <VStack spacing={8}>
      <Box w={"700px"} bg="#e3b3d0"
        p={6} rounded={"lg"} shadow={"md"}
      >
        <VStack spacing={4}>
          <Text fontSize={"30px"} fontWeight={"bold"}>
            Create a new ticket
          </Text>

          <Field.Root>
            <Field.Label >Title</Field.Label>
            <Input size="lg" placeholder="Enter the title of your issue"
              name="title"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              bg="white"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea size="lg" placeholder="Enter the details of your request or problem"
              name="description"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              bg="white"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Contact Info</Field.Label>
            <Input size="lg" placeholder="example@example.com"
              name="description"
              value={newTicket.contactInfo}
              onChange={(e) => setNewTicket({ ...newTicket, contactInfo: e.target.value })}
              bg="white"
            />
          </Field.Root>

          {/* ใช้ HStack ให้ปุ่ม อยู่ในแนว row เดียวกัน */}
          <HStack spacing={4} mt={3} justifyContent={"center"}>
            <Button
              size="lg"
              bg="#edebec"
              color="black"
              _hover={{ bg: "white", transform: "scale(1.05)", transition: "all 0.2s ease" }}
              borderRadius="md"
              boxShadow="lg"
              p={3}
              border={"none"}
              w="full"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              size="lg"
              bg="#ed5fb5"
              color="black"
              _hover={{ bg: "#cf3090", transform: "scale(1.05)", transition: "all 0.2s ease" }}
              borderRadius="md"
              boxShadow="lg"
              border={"none"}
              p={3}
              w="full"
              onClick={() => { handleAddTicket(); handleCancel(); }}
            >
              Create
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default CreatePage