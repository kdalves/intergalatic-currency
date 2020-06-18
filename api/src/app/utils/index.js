module.exports = {
  buscarPosicaoPalavra(frase, palavraBusca) {
    return frase.findIndex((palavra) => palavra === palavraBusca);
  },

  concataArrayEmFrase(frase) {
    let resposta = '';
    frase.forEach((palavra, index) => {
      const espaco = frase.length - 1 === index ? '' : ' ';
      resposta += palavra + espaco;
    });
    return resposta;
  },

  getNumerosRomanos() {
    return  [
      {
        key: 'I',
        value: 1
      },
      {
        key: 'V',
        value: 5
      },
      {
        key: 'X',
        value: 10
      },
      {
        key: 'L',
        value: 50
      },
      {
        key: 'C',
        value: 100
      },
      {
        key: 'D',
        value: 500
      },
      {
        key: 'M',
        value: 1000
      }
    ];
  }
}