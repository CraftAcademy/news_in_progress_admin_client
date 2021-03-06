/* eslint-disable no-undef */
describe("User can navigate to the app", () => {
  beforeEach(() => {
    cy.intercept("GET", "**api/articles", {
      fixture: "indexResponseFromAPI.json",
      statusCode: 200,
    });
    cy.intercept("POST", "**api/auth/sign_in", {
      fixture: "authenticationSuccess.json",
      headers: { uid: "user@email.com" },
    });
    cy.intercept("GET", "**api/auth/validate_token**", {
      fixture: "authenticationSuccess.json",
    });

    cy.visit("/");
    cy.get("[data-cy=btn-login]").click();
  });

  describe("and on the home page", () => {
    it("it is expected to display a header", () => {
      cy.get("[data-cy=header]").should("be.visible");
      cy.get("[data-cy=header]").should("contain", "- Admin Site");
    });

    it("is expected to display a add article button", () => {
      cy.get("[data-cy=add-article]").should("be.visible");
    });

    it("is expected to display a review articles button", () => {
      cy.get("[data-cy=review-articles]").should("be.visible");
    });
  });

  describe("and after clicking the add article button", () => {
    it("is expected to go to the create article page", () => {
      cy.get("[data-cy=add-article]").click();
      cy.url().should("eq", "http://localhost:3000/create-article");
    });
  });

  describe("and after clicking the review articles button", () => {
    it("is expected to go to the review articles page", () => {
      cy.get("[data-cy=review-articles]").click();
      cy.url().should("eq", "http://localhost:3000/review-articles");
    });
  });
});
