import React from "react";

const NotFoundPage = () => {
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#171717",
  };

  const titleStyles = {
    fontSize: "72px",
    fontWeight: "bold",
    margin: 0,
  };

  const subtitleStyles = {
    fontSize: "24px",
    margin: "10px 0 20px",
  };

  const buttonStyles = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "orange",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>404</h1>
      <p style={subtitleStyles}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" style={buttonStyles}>
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
