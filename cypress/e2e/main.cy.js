describe("Main App Test", () => {
  it("Should load the app homepage", () => {
    cy.visit("https://cat.najmcourse.com");
    cy.contains("Masuk");
  });
});
