module.exports = (res, req, next) => {
  const { frase } = res.body;
  
  if(!frase) {
    return req.status(400).json({erro: 'Parametro frase não encontrado'});
  }
  
  return next();
}