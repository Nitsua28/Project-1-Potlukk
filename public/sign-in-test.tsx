import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../src/App"

test("signin page", async ()=>{
    render(<App/>)
    const heading1 = await screen.findByText(/Sign/);
    const label1 = await screen.findByText(/Username/);
    const label2 = await screen.findByText(/Password/);
    const label3 = await screen.findByText(/Sign In/);
})

test("route to signup",async () => {
    render(<App/>)
    const button1 = await screen.findByText(/Sign Up/);
    userEvent.click(button1);
    //check the regitrstion page renders
    const label1 = await screen.findByText(/Confirm Passwrod/)
})