import React from "react";
import { Container, Form, Button, Input, Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import logo from "../img/logo-colourful.png";
import auth from "../modules/auth";
import delay from "delay";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const signInStatus = await auth.signIn(email, password);
      toast.success(t("signInMessage"));

      await delay(1000);
      dispatch({
        type: "SET_CURRENT_USER",
        payload: signInStatus.data,
      });
    } catch (error) {
      debugger;
      toast.error(error.response.data.errors[0]);
    }
  };

  return (
    <Container padded column="equal" stackable columns="2">
      <Grid>
        <Grid.Row>
          <Grid.Column width="8">
            <Image src={logo} size="large" />
          </Grid.Column>
          <Grid.Column width="8">
            <Form data-cy="sign-in-form" onSubmit={handleSignIn}>
              <Form.Field
                name="email"
                data-cy="email-input"
                control={Input}
                label="Email"
                placeholder="example@email.com"
              />
              <Form.Field
                name="password"
                data-cy="password-input"
                control={Input}
                label="Password"
                type="password"
              />
              <Form.Field
                data-cy="btn-sign-in"
                control={Button}
                content="Submit"
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Login;
