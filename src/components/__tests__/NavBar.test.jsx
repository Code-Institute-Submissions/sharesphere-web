/* eslint-disable no-undef */
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { expect, describe, it, vi } from "vitest";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { axiosReq } from "../../axios/axiosDefaults";

/**
 * Mock handler is not working as intended in testing yet.
 * That is because of how the AuthContext handles the user status
 * through local storage. So the workaround I've adopted to mock the
 * logged in status is to set the localStorage refreshTokenTimestamp object
 * here in the test suite so that the AuthContext checkLoginStatus returns a
 * value for the user data.
 *
 * It's not pretty but it works.
 *
 * Mock axiosReq.get and .post for the /dj-rest-auth/user/ and
 * /dj-rest-auth/logout/ endpoints.
 */
vi.mock("../../axios/axiosDefaults", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    axiosReq: {
      ...actual.axiosReq,
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe("Logged in user", () => {
  it("Should instantly see logged in navbar", async () => {
    // Mock the response for the user data fetched on mount
    axiosReq.get.mockResolvedValue({
      data: {
        pk: 1,
        username: "testuser",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/djmipr2p0/image/upload/v1/media/images/22Q",
      },
    });
    axiosReq.post.mockResolvedValue({
      status: 200,
    });

    await act(async () => {
      // Set item to trigger login status check
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

    // Confirm link existence
    expect(conversationsLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it("Should see logged out navbar after signing out", async () => {
    await act(async () => {
      render(
        <Router>
          <AuthProvider>
            <NavBar />
          </AuthProvider>
        </Router>,
      );
    });

    // Opens sign out modal
    const signOutButton = screen.getAllByTitle("Sign out")[0];
    fireEvent.click(signOutButton);

    // Confirms sign out in modal
    const signOutConfirmButton = await screen.findByTitle("Confirm sign out");
    await act(async () => {
      fireEvent.click(signOutConfirmButton);
    });

    // Checks for logged out updated navbar content
    const homeLink = await screen.findByText("Home");
    const signInLink = await screen.findByText("Sign in");
    expect(homeLink).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
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

  it("Should see logged in navbar content after signing in", async () => {
    await act(async () => {
      // Set item to trigger login status check as if the user just signed in
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
    const createPostLink = await screen.findByText("Create post");

    expect(homeLink).toBeInTheDocument();
    expect(createPostLink).toBeInTheDocument();
  });
});
