import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders the Carousel without crashing", function() {
	render(<Carousel />);
});

it("matches snapshot", function() {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
	expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
	expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
	expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
	expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

	// move backward in the carousel
	const leftArrow = queryByTestId("left-arrow");
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
	expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});

it("hides the left arrow when on the first image", function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect leftArrow to not be in document
	expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("hides the right arrow when on the last image", function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// move forward in the carousel
	fireEvent.click(rightArrow);

	// expect rightArrow to not be in document
	expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
