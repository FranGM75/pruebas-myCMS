Meteor.publish('Entradas', function () {
  return Entradas.find();
});

Meteor.publish('Comentarios', function () {
  return Comentarios.find();
});

Meteor.publish('EntradasByName', function (name) {
  console.log(name);
  var entrada = Entradas.find({title:name});
  return entrada;
});

Meteor.publish('ComentariosByName', function (name) {
  console.log(name);
  var entrada = Entradas.findOne({title:name});
  var comentarios = Comentarios.find({entrada_id:entrada._id});
  return comentarios;
});
