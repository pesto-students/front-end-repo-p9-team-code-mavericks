import "@testing-library/jest-dom/extend-expect"; // Import the extension for custom matchers
import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMsgBox from "./ErrorMsgBox";

// Test the ErrorMsgBox component
test('renders error message correctly', () => {
    const errorMsg = 'This is an error message';
    render(<ErrorMsgBox errorMsg={errorMsg} />);
  
    // Verify that the error message is present in the component
    const errorMessageElement = screen.queryByText(/Error:/i);
    expect(errorMessageElement).toBeInTheDocument();
  
    // Verify that the small element contains the error message
    const smallElement = screen.queryByText(errorMsg);
    expect(smallElement).toBeInTheDocument();
  
    // Verify that the small element has the class 'error-msg-css'
    expect(smallElement).toHaveClass('error-msg-css');
  });
