import { Route, Switch, HashRouter } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { useState as useStateMock } from "react";
import Home from "../../../src/UI/Pages/Home.jsx";
import { MainContext } from "../../../src/Infrastructure/App.jsx";


describe("Login page", () => {
    const setState = () => true

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })

    it("should display Login main elements correctly", async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);

        const [main, setMain] = useStateMock({
            reload: true,
            filter: null
        })

        render(
            <Home />
            ,
            root
        );

        screen.debug()
    })
})