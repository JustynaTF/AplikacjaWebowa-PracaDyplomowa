// QuoteDisplay.jsx

import React, { Component } from "react";

class QuoteDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuoteIndex: 0,
      quotes: [
        "„To nie pieniądze dają szczęście, ale to, co dzięki nim możesz zrobić ze swoim życiem” – Lois P. Frankel.",
        "„Zrobić budżet to wskazać swoim pieniądzom, dokąd mają iść,zamiast się zastanawiać, gdzie się rozeszły” – John C. Maxwell.",
        "„Nawyk zarządzania pieniędzmi jest ważniejszy niż ilość posiadanych pieniędzy” – T. Harv Eker",
        "„Na szczęście człowieka składają się nie tyle wspaniałe uśmiechy fortuny, które zdarzają się rzadko, ile drobne korzyści, które przytrafiają się na co dzień” - BENJAMIN FRANKLIN",
        "„Nie musisz być bogaty, żeby zacząć, ale musisz zacząć, żeby być bogaty” - AUTOR NIEZNANY",
        "„Sekret polega na wydawaniu tego, co zostaje po odłożeniu oszczędności, a nie oszczędzaniu tego, co nie zostało wydane” - FRANK I MURIEL NEWMAN",
        // Add other quotes
      ],
    };
  }

  componentDidMount() {
    this.quoteRotationInterval = setInterval(() => {
      this.rotateQuote();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.quoteRotationInterval);
  }

  rotateQuote = () => {
    this.setState((prevState) => {
      const nextIndex =
        (prevState.currentQuoteIndex + 1) % prevState.quotes.length;
      return {
        currentQuoteIndex: nextIndex,
      };
    });
  };

  render() {
    return (
      <p
        className={`quote ${
          this.state.currentQuoteIndex === 0 ? "active" : ""
        }`}
      >
        {this.state.quotes[this.state.currentQuoteIndex]}
      </p>
    );
  }
}
export default QuoteDisplay;
