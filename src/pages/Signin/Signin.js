import React, { useState, useEffect } from "react";
import { gql ,useMutation} from "@apollo/client";
import { Form } from "react-bootstrap";
// import Button from "@restart/ui/esm/Button";

// {
//   email:"moses@spazio.co.za",password:"0780431060"
// }

const SIGNIN = gql`
mutation Signin($email:String!,$password:String!){
  signin(credentials:{
    email:$email,
    password:$password
  }){
    userErrors {
      message
    }
    token
  }
}
`

export default function Signin() {
  const [signin,{data,loading}] = useMutation(SIGNIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(data);
  

  const handleClick = (e) => {
    e.preventDefault()
    signin({
      variables:{
        email,
        password
      }
    })
  };

  const [error, setError] = useState(null);
  useEffect(() =>{
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message)
      }
      if (data.signin.token) {
        localStorage.setItem("token",data.signin.token)
      }
    }
  },[data])
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <button onClick={handleClick}>Signin</button>
      </Form>
    </div>
  );
}
