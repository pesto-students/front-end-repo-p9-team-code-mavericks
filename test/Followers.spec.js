import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional DOM matchers
import Followers from "../src/components/Followers"; // Replace with the actual path to your Followers component

// Mock the global fetch function
global.fetch = jest.fn();

describe("Followers Component", () => {
  // Helper function to set up mock response for fetch
  const mockFetchResponse = (data, isError = false) => {
    const jsonPromise = Promise.resolve(data);
    const fetchPromise = isError
      ? Promise.reject(new Error("Mock fetch error"))
      : Promise.resolve({
          json: () => jsonPromise,
        });
    global.fetch.mockImplementation(() => fetchPromise);
  };

  test("renders loading message while fetching followers list", async () => {
    // Mock the API call to return an empty list of followers
    mockFetchResponse({ followers: [] });

    render(<Followers />);
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();

    // Wait for the followers list to be fetched and isLoading to be false
    // For example, you can use `waitFor` from '@testing-library/react'
    // to wait for an element to disappear
  });

  test('renders "No followers" message when the followers list is empty', async () => {
    // Mock the API call to return an empty list of followers
    mockFetchResponse({ followers: [] });

    render(<Followers />);
    const noFollowersElement = await screen.findByText("No followers");
    expect(noFollowersElement).toBeInTheDocument();
  });

  test("renders followers list correctly", async () => {
    // Mock the API call to return a list of followers
    const mockFollowers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    mockFetchResponse({ followers: mockFollowers });

    render(<Followers />);
    const followersList = await screen.findAllByRole("listitem");
    expect(followersList).toHaveLength(2);
  });
});
