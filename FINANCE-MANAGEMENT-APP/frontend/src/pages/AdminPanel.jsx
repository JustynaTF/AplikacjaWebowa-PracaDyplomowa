// AdminPanel.js
import React, { useEffect, useState } from "react";
import AddArticle from "../components/AddArticle";
import axios from "axios";

const AdminPanel = () => {
  const [article, setArticle] = useState([]);

  const handleAddArticle = () => {
    getArticles();
  };

  const handleDeleteArticle = (index) => {
    axios
      .delete("http://localhost:3000/api/article/" + index, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        getArticles();
      });
  };

  const getArticles = () => {
    axios
      .get("http://localhost:3000/api/article/getAll", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setArticle(response.data);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <h1>Panel Admina</h1>
      <AddArticle onAddArticle={handleAddArticle} />
      <h2> Artykuły</h2>
      <ul>
        {article.map((article, index) => (
          <li key={index}>
            {article.title && (
              <h3>
                <strong>{article.title}</strong>
              </h3>
            )}
            <p>{article.content}</p>
            <button
              className="btn1"
              onClick={() => handleDeleteArticle(article.id)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default AdminPanel;
