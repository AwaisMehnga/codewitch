import React from "react";

function ContactPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Get in Touch</h1>
      <p>
        Feel free to reach out if you have any questions or projects in mind.
      </p>
      <ul style={{ listStyleType: "none", padding: "0", margin: "20px 0" }}>
        <li style={{ marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Name:</span> Muhammad Awais
        </li>
        <li style={{ marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
          awaismehngaa@gmail.com
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/awaismehnga/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Muhammad Awais (linkedIn.com)
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ContactPage;
