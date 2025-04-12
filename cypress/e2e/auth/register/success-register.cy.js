import { MailSlurp } from "mailslurp-client";

describe("Register and Verify OTP with MailSlurp", () => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env("MAILSLURP_API_KEY") });

  it("should register user and verify OTP from email", () => {
    // Step 1: Create inbox and save email
    cy.then(() => {
      return mailslurp.createInbox().then((inbox) => {
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("email");
      });
    });

    // Step 2: Register with saved email
    cy.get("@email").then((email) => {
      cy.visit("https://cat.najmcourse.com/auth/register");

      cy.get('input[placeholder="Masukan Nama Lengkap"]').type("Akun Test");
      cy.get('input[type="email"]').type(email);
      cy.get('input[placeholder="08xxxxxxxxxx"]').type("081234567890");
      cy.get('input[name="password"]').type("Password123!");
      cy.get('input[name="confirmPassword"]').type("Password123!");
      cy.get('input[placeholder="Masukkan"]').type("Instagram");
      cy.get('input[placeholder="Masukan Kode Referal"]').type("REF123");
      cy.get("select").select(1);
      cy.get('input[type="checkbox"]').check();
      cy.contains("Daftar").click();
      cy.wait("@registerRequest").its("response.statusCode").should("eq", 201);
      cy.url().should("include", "/verify-email");
    });

    cy.get("@inboxId").then((inboxId) => {
      cy.wrap(null).then(async () => {
        const emailObj = await mailslurp.waitForLatestEmail(inboxId, 60000);
        const otpMatch = emailObj.body.match(/\\d{6}/);

        if (!otpMatch) {
          throw new Error("OTP not found in the email body");
        }

        const otpCode = otpMatch[0];
        cy.log("OTP received:", otpCode);

        otpCode.split("").forEach((digit, index) => {
          cy.get('input[type="tel"]').eq(index).type(digit);
        });

        cy.contains("Verify").click();
        cy.url().should("include", "/auth/login");
        cy.contains("Masuk").should("be.visible");
      });
    });
  });
});
