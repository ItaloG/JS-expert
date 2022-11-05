const { evaluateRegex } = require("./util");
class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^ -> comoço da string
    // + -> um ou mais ocorrencias
    // (\w{1}) -> pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) encontra letras maiusculas ou minusculas, adicionamos o + para ele pegar todas as letras até o caracter especial
    // g -> todas as ocorrencias que encontrar
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    };

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    // \D -> tudo que não for digito
    // /g serve para remover todas as ocorrencias que encontrar
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    // começa a procurar depois do " a " e pega tudo que tem a frente
    // (?<= faz com que ignore tudo que tiver antes desse match)
    // conhecido como positive lookBehind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    // começa a buscar depois do espaço, pega qualquer letra ou digito até o fim da linha (poderia ser o \w+ tbm)
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    // remove o ponto literal (.) do fim da frase
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;
