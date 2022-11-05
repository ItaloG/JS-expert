const { evaluateRegex } = require("./util");
const Person = require("./person");
// O objetico do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrão Builder
// a diferença que aqui é sobre proecessos, o Builder sobre contrução
// de objetos
class TextProcessorFluentAPI {
  // propriedade privada!
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virão depois desse grupo
    // [contratante | contratado] ou um ou outro, (e tem a flag no fim da expressão para pegar maiusculo e minuculo)
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
    // tudo acima fica dentro de um paranteses para falar "vamos pegar daí para frente"

    // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele evita de ficar em loop

    // $ informa qua a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive

    const matchPerson = evaluateRegex(
      /(?<=[contratante | contratado]:\s{1})(?!\s)(.*\n.*?)$/gim
    );
    const onlyPerson = this.#content.match(matchPerson);
    // console.log(onlyPerson);
    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, ""))
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
