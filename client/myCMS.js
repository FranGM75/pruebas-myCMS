

Meteor.subscribe('Entradas');
Meteor.subscribe('Comentarios');


Template.topBar.events({
  "click a#register":function(event,template){
    event.preventDefault();
    Modal.show('register');
  },
  "click a#login":function(event,template){
    event.preventDefault();
    Modal.show('login');
  },
  "click a#logout":function(event,template){
    event.preventDefault();
    Modal.show('logout');
  },
});

Template.home.helpers({
    entradas:function(){
        return Entradas.find({});
    },
    comentarios:function(_id){
        return Comentarios.find({entrada_id:_id});
    }

});
