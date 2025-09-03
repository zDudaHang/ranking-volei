import { asWeekDay } from "../date-format";

describe("asWeekDay", () => {
  it("deve retornar Segunda-feira quando for uma segunda", () => {
    const segunda = new Date(2025, 8, 1);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Segunda-feira");
  });

  it("deve retornar Terça-feira quando for uma terça", () => {
    const segunda = new Date(2025, 8, 2);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Terça-feira");
  });

  it("deve retornar Quarta-feira quando for uma quarta", () => {
    const segunda = new Date(2025, 8, 3);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Quarta-feira");
  });

  it("deve retornar Quinta-feira quando for uma quinta", () => {
    const segunda = new Date(2025, 8, 4);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Quinta-feira");
  });

  it("deve retornar Sexta-feira quando for uma sexta", () => {
    const segunda = new Date(2025, 8, 5);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Sexta-feira");
  });

  it("deve retornar sábado quando for um sábado", () => {
    const segunda = new Date(2025, 8, 6);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Sábado");
  });

  it("deve retornar Domingo quando for uma domingo", () => {
    const segunda = new Date(2025, 8, 7);
    const result = asWeekDay(segunda);
    expect(result).toEqual("Domingo");
  });
});
