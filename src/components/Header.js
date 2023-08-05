import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/home">Podverse</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/watchlater">Watch Later</Link>
            </li>

            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <Link to="/add" className="btn btn-main">
                + Add
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};