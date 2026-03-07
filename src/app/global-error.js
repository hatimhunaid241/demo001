"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f3ef", fontFamily: "Georgia, serif" }}>
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          <div style={{ maxWidth: "36rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.55em",
                color: "#b8952a",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Royal Chess Design
            </p>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: "normal",
                letterSpacing: "0.12em",
                color: "#1a1a1a",
                marginBottom: "1.5rem",
              }}
            >
              Something Went Wrong
            </h1>

            <div
              style={{
                width: "4rem",
                height: "1px",
                background: "linear-gradient(to right, transparent, #b8952a, transparent)",
                margin: "0 auto 2rem",
              }}
            />

            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: "300",
                lineHeight: "1.75",
                color: "#555",
                marginBottom: "3rem",
              }}
            >
              A critical error occurred. Please try again or contact us if the problem persists.
            </p>

            <button
              onClick={reset}
              style={{
                display: "inline-block",
                padding: "0.75rem 2.5rem",
                border: "1px solid #b8952a",
                background: "transparent",
                color: "#b8952a",
                fontSize: "0.6875rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
