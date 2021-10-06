import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [registerForm, SetRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const HandleOnChange = (e) => {
    SetRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      if (registerForm.password !== registerForm.confirmPassword){
        setAlert({ type: "danger", message: "Confirm password not marching !" });
        return;
      }
      const registerData = await registerUser(registerForm);
      console.log(registerData);
      if (registerData?.success) {
      } else {
        setAlert({ type: "danger", message: registerData.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={HandleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={HandleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={HandleOnChange}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <Row>
        <Col xs="auto">
          <p className="AskRegister"> Already have an account ?</p>
        </Col>

        <Col xs="auto">
          <Link to="login">
            <Button variant="info" size="sm" className="ml-2">
              Login
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default RegisterForm;
