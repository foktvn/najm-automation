describe("Login Failed Flow", () => {
  it("should not allow login with incorrect credentials", () => {
    cy.intercept("**/v1/auth/login").as("loginRequest");

    cy.visit("https://cat.najmcourse.com/auth/login");

    cy.get('input[name="email"]').type("beastzte@email.com");
    cy.get('input[name="password"]').type("salah123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest", { timeout: 8000 })
      .its("response.statusCode")
      .should("eq", 401);

    cy.wait(500);
    cy.contains("Email or password invalid").should("be.visible");

    cy.url().should("include", "/login");
  });
});
