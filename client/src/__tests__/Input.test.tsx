import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Input from "../components/input/Input";
import type { ICardForm } from "../components/addCard/AddCard";
import { useForm } from "react-hook-form";

afterEach(cleanup);

jest.mock("react-hook-form", () => ({
    ...jest.requireActual("react-hook-form"),
    Controller: () => <></>,
    useForm: () => ({
        register: () => jest.fn(),
    }),
}));

describe("Input", () => {
    beforeEach(() => {
        const { register } = useForm<ICardForm>();
        render(
            <Input register={register} name="input-test" type="text" placeholder="test-text-1" />
        );
    });

    it("Should exists placeholder on screen", () => {
        expect(screen.getByPlaceholderText("test-text-1")).toBeTruthy();
    });

    it("Should exists className named as input in input component", () => {
        expect(screen.getByPlaceholderText("test-text-1").className).toBe("input");
    });
});
