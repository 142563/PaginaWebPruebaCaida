// Por defecto prueba el index.html local.
// Para probar la página publicada: npm run test:web
const URL_PAGINA = Cypress.env("url") || "index.html";

function calcular(n1, n2, n3) {
  cy.get('[data-cy="nota1"]').clear().type(n1);
  cy.get('[data-cy="nota2"]').clear().type(n2);
  cy.get('[data-cy="nota3"]').clear().type(n3);
  cy.get('[data-cy="calcular"]').click();
}

describe("Página principal", () => {
  beforeEach(() => {
    cy.visit(URL_PAGINA);
  });

  it("carga el título y el estado del sitio", () => {
    cy.get('[data-cy="titulo"]').should("contain", "Ejercicio: Página Caída");
    cy.get('[data-cy="estado"]').should("contain", "El sitio está funcionando correctamente");
  });

  it("calcula el promedio de un alumno aprobado", () => {
    calcular("7", "8", "9");
    cy.get('[data-cy="resultado"]').should("be.visible");
    cy.get('[data-cy="promedio"]').should("have.text", "8.00");
    cy.get('[data-cy="condicion"]').should("have.text", "Aprobado");
  });

  it("calcula el promedio de un alumno reprobado", () => {
    calcular("4", "5", "6");
    cy.get('[data-cy="promedio"]').should("have.text", "5.00");
    cy.get('[data-cy="condicion"]').should("have.text", "Reprobado");
  });

  it("aprueba justo con 6", () => {
    calcular("6", "6", "6");
    cy.get('[data-cy="promedio"]').should("have.text", "6.00");
    cy.get('[data-cy="condicion"]').should("have.text", "Aprobado");
  });

  it("acepta notas con decimales", () => {
    calcular("9.5", "8.5", "10");
    cy.get('[data-cy="promedio"]').should("have.text", "9.33");
  });

  it("reinicia el contador de visitas", () => {
    cy.get('[data-cy="reiniciar"]').click();
    cy.get('[data-cy="contador"]').should("have.text", "0");
  });
});
