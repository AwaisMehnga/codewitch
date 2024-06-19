import React from "react";
import { NavLink } from "react-router-dom";
function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#ffcc00",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section style={{ padding: "50px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", margin: "0", fontWeight: "bold" }}>
          Codewitch
        </h1>
        <h2 style={{ fontSize: "24px", margin: "10px 0", color: "#333" }}>
          Turn your UI designs into code instantly
        </h2>
        <NavLink to="/ai">
          <button
            style={{
              backgroundColor: "#fff",
              color: "#ffcc00",
              padding: "15px 30px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Get Started Now
          </button>
        </NavLink>
      </section>
      <section style={{ padding: "50px", textAlign: "center" }}>
        <h3 style={{ fontSize: "24px", margin: "0", fontWeight: "bold" }}>
          How Codewitch Works
        </h3>
        <p style={{ fontSize: "18px", margin: "10px 0", color: "#333" }}>
          Simply provide your UI design (screenshot, image, or sketch) and
          Codewitch will use its powerful AI to generate the corresponding HTML
          and CSS code, saving you hours of development time.
        </p>
        <ul style={{ listStyleType: "none", padding: "0", margin: "20px 0" }}>
          <li style={{ marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Easy to Use:</span> Upload your
            design and let Codewitch do the magic.
          </li>
          <li style={{ marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Fast and Efficient:</span>{" "}
            Generate code in seconds, freeing you to focus on other aspects of
            your project.
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Accurate Results:</span>{" "}
            Codewitch produces high-quality code that closely resembles your
            design.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default LandingPage;
