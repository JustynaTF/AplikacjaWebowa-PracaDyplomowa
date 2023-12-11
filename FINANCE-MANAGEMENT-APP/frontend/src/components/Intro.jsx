import "../styles/styles.css";
import React, { Component } from "react";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import QuoteDisplay from "../components/QuoteDisplay";
import Footer from "./Footer";
function navigate(link) {
  const navigate = useNavigate();
  navigate(link);
}

async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem("token", json.token);
      console.log(jwt_decode(json.token));
      localStorage.setItem(
        "userName",
        JSON.stringify(jwt_decode(json.token).login)
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    return false;
  }
}

async function registerUser(name, email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    return false;
  }
}

class Intro extends Component {
  constructor() {
    super();
    this.state = {
      registration: {
        name: "",
        email: "",
        password: "",
      },
      login: {
        email: "",
        password: "",
      },
      isRegistering: false,
    };
  }

  handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      registration: {
        ...prevState.registration,
        [name]: value,
      },
    }));
  };

  handleLoginChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      login: {
        ...prevState.login,
        [name]: value,
      },
    }));
  };

  handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    console.log("Rejestracja - E-mail:", this.state.registration.email);
    console.log("Rejestracja - Hasło:", this.state.registration.password);

    const registerSuccessful = await registerUser(
      this.state.registration.name,
      this.state.registration.email,
      this.state.registration.password
    );
    if (registerSuccessful) {
      this.props.navigate("/");
    }
  };

  handleLoginSubmit = async (event) => {
    event.preventDefault();

    console.log("Logowanie - E-mail:", this.state.login.email);
    console.log("Logowanie - Hasło:", this.state.login.password);

    const loginSuccessful = await loginUser(
      this.state.login.email,
      this.state.login.password
    );
    if (loginSuccessful) {
      this.props.navigate("/monthlyBudget");
    }
  };

  toggleRegistering = () => {
    this.setState((prevState) => ({
      isRegistering: !prevState.isRegistering,
    }));
  };

  render() {
    return (
      <div className="intro">
        <h1>
          Witaj w aplikacji do{" "}
          <span className="accent">zarządzania finansami osobistymi! </span>
        </h1>
        <QuoteDisplay />
        <div className="loginAndRegistrationForm">
          {this.state.isRegistering ? (
            <div>
              <h2>REJESTRACJA</h2>
              <form className="form1" onSubmit={this.handleRegistrationSubmit}>
                <label htmlFor="registration-email">Imię :</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Podaj swoje imię"
                  value={this.state.registration.name}
                  onChange={this.handleRegistrationChange}
                  required
                />
                <label htmlFor="registration-email">E-mail:</label>
                <input
                  type="email"
                  id="registration-email"
                  name="email"
                  placeholder="Podaj e-mail"
                  value={this.state.registration.email}
                  onChange={this.handleRegistrationChange}
                  required
                />
                <label htmlFor="registration-password">Hasło:</label>
                <input
                  type="password"
                  id="registration-password"
                  name="password"
                  placeholder="Podaj hasło"
                  value={this.state.registration.password}
                  onChange={this.handleRegistrationChange}
                  required
                />
                <button type="submit" className="btn1 btn--dark">
                  Zarejestruj się
                </button>
              </form>
              <p>
                Masz już konto?{" "}
                <button className="btn2" onClick={this.toggleRegistering}>
                  Zaloguj się
                </button>
              </p>
            </div>
          ) : (
            <div>
              <h2>Logowanie</h2>
              <form className="form1" onSubmit={this.handleLoginSubmit}>
                <label htmlFor="login-email">E-mail:</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Podaj e-mail"
                  value={this.state.login.email}
                  onChange={this.handleLoginChange}
                  required
                />
                <label htmlFor="login-password">Hasło:</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Podaj hasło"
                  value={this.state.login.password}
                  onChange={this.handleLoginChange}
                  required
                />
                <button type="submit" className="btn1">
                  Zaloguj się
                </button>
              </form>
              <p>
                Nie masz jeszcze konta?{" "}
                <button className="btn2" onClick={this.toggleRegistering}>
                  Zarejestruj się
                </button>
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export function IntroWithRouter(props) {
  const navigate = useNavigate();
  return <Intro navigate={navigate}></Intro>;
}

export default Intro;
