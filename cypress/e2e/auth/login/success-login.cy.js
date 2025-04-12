describe("Login Success Flow", () => {
  it("User should be able to login with valid credentials", () => {
    cy.visit("https://cat.najmcourse.com/auth/login");

    cy.get('input[name="email"]').type("beastzte@gmail.com");
    cy.get('input[name="password"]').type("waduh123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/student/profil");
    cy.contains("Lengkapi Profil");
  });
});
