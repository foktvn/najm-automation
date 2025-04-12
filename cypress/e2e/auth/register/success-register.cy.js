import { MailSlurp } from "mailslurp-client";

describe("Register with OTP Verification", () => {
  const apiKey =
    "4407e95063b50054d89c76b7343aaaca7edcce467ebf59a60ca7cedb53bc1aa1";
  const mailslurp = new MailSlurp({ apiKey });

  it("should register and verify with OTP from email", async () => {
    const inbox = await mailslurp.createInbox();
    const email = inbox.emailAddress;

    cy.visit("https://cat.najmcourse.com/auth/register");

    // Isi form register pakai email dari MailSlurp
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
    const emailObj = await mailslurp.waitForLatestEmail(inbox.id, 60000); // max 60 detik
    const otpMatch = emailObj.body.match(/\d{6}/); // cari 6 digit kode OTP
    const otpCode = otpMatch[0];

    // Input OTP ke halaman verifikasi
    cy.get('input[name="otp"]').type(otpCode);
    cy.get("button").contains("Verify").click();

    // Assertion
    cy.url().should("include", "/dashboard"); // ganti sesuai flow lo
    cy.contains("Welcome").should("be.visible");
  });
});
