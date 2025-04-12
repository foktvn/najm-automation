describe("Login Success Flow", () => {
  it("User should be able to login with valid credentials", () => {
    cy.intercept("POST", "/v1/auth/login").as("loginRequest");

    cy.visit("https://cat.najmcourse.com/auth/login");

    cy.get('input[name="email"]').type("beastzte@gmail.com");
    cy.get('input[name="password"]').type("waduh123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/student/dashboard");
    cy.contains("Dashboard").should("be.visible");
  });
});
