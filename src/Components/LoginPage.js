import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/UserInfo";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import toast from "react-hot-toast";
const LoginPage = () => {
  const { userId, setUserId } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("test@gmail.com");
  // const [password, setPassword] = useState("12345678a");
  const [users, setUsers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [findUser, setFindUser] = useState(false);
  const [finalVerify, setfinalVerify] = useState("");

  useEffect(() => {
    axios
      .get("https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/allUser")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setFindUser(true);
        await verifyUser();
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const verifyUser = async () => {
    let findUser = users.find((user) => user.email === email);
    if (findUser) {
      // Perform password comparison securely (you should use bcrypt or a similar library)
      if (findUser.password === password) {
        setfinalVerify("User Found");
        setUserId(findUser._id);
        toast.success("Successfully Sign-In");
        navigate(`/home/${findUser._id}`);
      } else {
        setfinalVerify("Invalid Password");
        toast.error("Invalid Password");
      }
    } else {
      setfinalVerify("User Not Found");
      toast.error("User Not Found");
    }
  };

  return (
    <>
      <div className="bg">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "45px",
          }}
        >
          <div
            style={{
              width: "500px",
              backgroundColor: "black",
              padding: "15px",
              borderRadius: "15px",
              color: "white",
            }}
            className="formWidth"
            id="formWidth"
          >
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h2 className="mb-5 text-light">Sign-In</h2>
              <Row>
                {" "}
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom01"
                  autoComplete="off"
                >
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    className="form-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-warning"
                  >
                    Please Enter Your Email
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    className="form-field"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-warning"
                  >
                    Please Enter Password Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="pt-2">
                <Link
                  to="/Register"
                  className="text-decoration-none text-light"
                >
                  Click here to Sign-Up page
                </Link>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} md="12">
                  <Button type="submit" variant="light">
                    Sign-In
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "500px",
            }}
          >
            {findUser && (
              <Alert
                variant={finalVerify === "User Found" ? "success" : "danger"}
                className="alert"
              >
                {finalVerify}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
