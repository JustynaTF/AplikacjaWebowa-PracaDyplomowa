import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Intro } from "./Intro";

describe("Intro Component Tests", () => {
  it("renders without crashing", () => {
    // Renderujemy komponent
    render(<Intro />);
    // Sprawdzamy, czy istnieje element z danym tekstem
    expect(screen.getByText("Witaj w aplikacji do")).toBeInTheDocument();
  });

  it("handles registration form submission", async () => {
    // Renderujemy komponent
    render(<Intro />);

    // Klikamy w przycisk "Zarejestruj się"
    fireEvent.click(screen.getByText("Zarejestruj się"));

    // Wprowadzamy dane do formularza rejestracji
    fireEvent.change(screen.getByLabelText(/Imię/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Hasło/i), {
      target: { value: "password123" },
    });

    // Klikamy w przycisk "Zarejestruj się"
    fireEvent.click(screen.getByText("Zarejestruj się"));

    // Czekamy na pojawienie się określonego tekstu po rejestracji
    await waitFor(() => {
      expect(screen.getByText("Witaj, John!")).toBeInTheDocument();
    });
  });

  it("handles login form submission", async () => {
    // Renderujemy komponent
    render(<Intro />);

    // Wprowadzamy dane do formularza logowania
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Hasło/i), {
      target: { value: "password123" },
    });

    // Klikamy w przycisk "Zaloguj się"
    fireEvent.click(screen.getByText("Zaloguj się"));

    // Czekamy na pojawienie się określonego tekstu po zalogowaniu
    await waitFor(() => {
      expect(screen.getByText("Witaj, John!")).toBeInTheDocument();
    });
  });

  // Dodaj więcej testów w miarę potrzeb
});
