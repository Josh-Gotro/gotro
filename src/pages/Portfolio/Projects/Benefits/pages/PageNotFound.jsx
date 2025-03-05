import React from "react";

function PageNotFound() {

  return (
    <div className="not-found-page">
      <div className="content base">
        <h1 className="title">404</h1>
        <p className="message">Page not found</p>
        <a href="/" className="home-link">Return Home</a>
      </div>
    </div>
  );
}

export default PageNotFound;
