import React from 'react'
import { VStack ,FormControl,FormLabel,Input,InputRightElement,InputGroup,Button,useToast} from '@chakra-ui/react'
import { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../Context/ChatProvider';



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const [show, setShow] = useState(false);
  
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } 
    catch (error) {
    //   // const errorMessage = error.response?.data?.message || "An error occurred during login.";
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
     }
  };

  return (
    <VStack spacing="5px">

    <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
           value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
       variant="solid"
       colorScheme="red"
       width="100%"
       onClick={() => {
         setEmail("guest@example.com");
         setPassword("guest");
       }}
      >
        Get Guest User Credentials
      </Button>


    </VStack>
  )
}

export default Login
