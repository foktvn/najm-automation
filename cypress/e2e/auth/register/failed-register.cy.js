describe("Failed Register", () => {
  const baseUrl = "https://cat.najmcourse.com/auth/register";

  it("should show error if required fields are empty", () => {
    cy.visit(baseUrl);
    cy.contains("Daftar").click();
    cy.contains("Kolom ini wajib diisi").should("be.visible");
    cy.contains("Email wajib diisi").should("be.visible");
    cy.contains("Nomor Telepon wajib diisi").should("be.visible");
    cy.contains("Password wajib diisi").should("be.visible");
    cy.contains("Konfirmasi Password wajib diisi").should("be.visible");
    cy.contains("Syarat dan Ketentuan wajib disetujui").should("be.visible");
  });

  it("should show error if email is already used", () => {
    cy.visit(baseUrl);
    cy.get('input[placeholder="Masukan Nama Lengkap"]').type("Akun Testing");
    cy.get('input[type="email"]').type("foktvn04@gmail.com");
    cy.get('input[placeholder="08xxxxxxxxxx"]').type("081234567890");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");
    cy.get('input[placeholder="Masukkan"]').type("Instagram");
    cy.get('input[placeholder="Masukan Kode Referal"]').type("REF123");
    cy.get("select").select(1);
    cy.get('input[type="checkbox"]').check();
    cy.contains("Daftar").click();

    cy.contains("Email sudah digunakan").should("be.visible");
  });

  it("should show error if password and confirm password do not match", () => {
    cy.visit(baseUrl);
    cy.get('input[placeholder="Masukan Nama Lengkap"]').type("AKun Test");
    cy.get('input[type="email"]').type("testing@example.com");
    cy.get('input[placeholder="08xxxxxxxxxx"]').type("081234567890");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("WrongPassword!");
    cy.get('input[placeholder="Masukkan"]').type("Instagram");
    cy.get('input[placeholder="Masukan Kode Referal"]').type("REF123");
    cy.get("select").select(1);
    cy.get('input[type="checkbox"]').check();
    cy.contains("Daftar").click();

    cy.contains("Password dan Konfirmasi Password tidak cocok").should(
      "be.visible"
    );
  });
});
