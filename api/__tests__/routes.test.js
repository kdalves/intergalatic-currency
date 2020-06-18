const request = require('supertest');
const app = require('../src/app');

describe('GET /listar', () => {
  it('Deve retornar uma lista com as moedas cadastradas', async () => {
    const response = await request(app)
      .get('/listar');

    expect(response.status).toEqual(200);
  });
});

describe('POST /inserir', () => {
  it('Deve inserir a moeda no banco', async () => {
    const response = await request(app)
      .post('/inserir')
      .send({ frase: 'teste vale I'});

    expect(response.status).toEqual(200);
  });

  it('Deve retornar erro quando não tiver o parametro frase', async () => {
    const response = await request(app)
      .post('/inserir');

    expect(response.error.status).toEqual(400);
  });
});

describe('POST /calcular/creditos', () => {
  it('Deve inserir a o crédito no banco', async () => {
    const response = await request(app)
      .post('/calcular/creditos')
      .send({ frase: 'Dabu Dabu prata vale 34 créditos'});

    expect(response.status).toEqual(200);
  });

  it('Deve retornar erro quando não tiver o parametro frase', async () => {
    const response = await request(app)
      .post('/calcular/creditos');

    expect(response.error.status).toEqual(400);
  });
});

describe('POST /calcular', () => {
  it('Deve retornar o calculo da frase', async () => {
    const response = await request(app)
      .post('/calcular')
      .send({ frase: 'Quantos créditos tem Dabu Swobu prata ?'});

    expect(response.body).toEqual({ moedas: 'dabu swobu prata', valor: 68 });
    expect(response.status).toEqual(200);
  });

  it('Deve retornar erro quando não tiver o parametro frase', async () => {
    const response = await request(app)
      .post('/calcular');

    expect(response.error.status).toEqual(400);
  });
});

describe('POST /calcular/conhecido', () => {
  it('Deve retornar o calculo da frase', async () => {
    const response = await request(app)
      .post('/calcular/conhecido')
      .send({ frase: "Quanto vale Lok'tar Mok'ra Dabu Dabu ?"});
  
    expect(response.body).toEqual({ moedas: "lok'tar mok'ra dabu dabu", valor: 42 });
    expect(response.status).toEqual(200);
  });

  it('Deve retornar erro quando não tiver o parametro frase', async () => {
    const response = await request(app)
      .post('/calcular/conhecido');

    expect(response.error.status).toEqual(400);
  });
});
