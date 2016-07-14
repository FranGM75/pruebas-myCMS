createdAtEs = function (sDate){
  return sDate.toLocaleDateString()+' '+sDate.toLocaleTimeString();
}

textoEs = function (sTexto){
    return Spacebars.SafeString(sTexto.replace(/(\n)+/g,'<br />'));
}
