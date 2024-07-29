/* eslint-disable no-undef */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import NavBar from "../NavBar";
import { expect, describe, it } from "vitest";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Mock handler is not working as intended in testing yet.
 * That is because of how the AuthContext handles the user status
 * through local storage. So the workaround I've adopted to mock the
 * logged in status is to set the localStorage loggedInUser object
 * here in the test suite.
 *
 * It's not pretty but it works.
 */
describe("Logged in user", () => {
  it("Should see logged in navbar content", async () => {
    await act(async () => {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          pk: 1,
          username: "testuser",
          email: "",
          first_name: "",
          last_name: "",
          profile_id: 1,
          profile_image:
            "https://res.cloudinary.com/djmipr2p0/image/upload/v1/media/images/22Q",
        }),
      );
      localStorage.setItem("refreshTokenTimestamp", 123);

      render(
        <Router>
          <AuthProvider>
            <NavBar />
          </AuthProvider>
        </Router>,
      );
    });
    // Check if a logged in navbar link is displayed
    const homeLink = await screen.findByText("Home");
    const conversationsLink = await screen.findByText("Conversations");

    expect(homeLink).toBeInTheDocument();
    expect(conversationsLink).toBeInTheDocument();
  });
});

describe("Logged out user", () => {
  it("Should see logged out navbar content", async () => {
    render(
      <Router>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </Router>,
    );

    // Check if a logged out navbar link is displayed
    const homeLink = await screen.findByText("Home");
    const signInLink = await screen.findByText("Sign in");

    expect(homeLink).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
  });
});
