import { MailSlurp } from "mailslurp-client";

describe("Register with OTP Verification", () => {
  const apiKey = process.env.MAILSLURP_API_KEY;
  const mailslurp = new MailSlurp({ apiKey });

  it("should register and verify with OTP from email", async () => {
    const inbox = await mailslurp.createInbox();
    const email = inbox.emailAddress;

    cy.visit("https://cat.najmcourse.com/auth/register");

    cy.get('input[placeholder="Masukan Nama Lengkap"]', { timeout: 10000 })
      .should("be.visible")
      .type("Fenny Oktaviani");
    cy.get('input[type="email"]').type(email);
    cy.get('input[placeholder="08xxxxxxxxxx"]').type("081234567890");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");
    cy.get('input[placeholder="Masukkan"]').type("Instagram");
    cy.get('input[placeholder="Masukan Kode Referal"]').type("REF123");
    cy.get("select").select(1);
    cy.get('input[type="checkbox"]').check();
    cy.get("button").contains("Daftar").click();

    // Tunggu email masuk
    const emailObj = await mailslurp.waitForLatestEmail(inbox.id, 60000);
    const otpMatch = emailObj.body.match(/\d{6}/);
    const otpCode = otpMatch[0];

    cy.get('input[name="otp"]').type(otpCode);
    cy.get("button").contains("Verify").click();

    cy.url().should("include", "/auth/login");
    cy.contains("Masuk").should("be.visible");
  });
});
