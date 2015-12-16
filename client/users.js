Modal.allowMultiple = true;

var validador = $.validator;

validador.setDefaults({
  rules:{
    regnombre:{
      required:true,
      minlength:4,
      maxlength:24
    },
    regmail:{
      required:true,
      email:true
    },
    regclave1:{
      required:true,
      minlength:6
    },
    regclave2:{
      required:true,
      minlength:6,
      equalTo:'#regpass1'
    },
    lognombre:{
      required:true,
      minlength:4,
      maxlength:24
    },
    logclave1:{
      required:true,
      minlength:6
    },
    fgttemail:{
      required:true,
      email:true
    }
  },
  messages:{
    regnombre:{
      required:"Debes introducir un nombre",
      minlength:"como mínimo {0} carácteres",
      maxlength:"como máximo {0} carácteres"
    },
    regmail:{
      required:"Debes introducir un email",
      email:"Has introducido un email no valido"
    },
    regclave1:{
      required:"Debes introducir una contraseña",
      minlength:"como mínimo {0} carácteres"
    },
    regclave2:{
      required:"Debes repetir tu contraseña",
      minlength:"como mínimo {0} carácteres",
      equalTo:'Ambas claves deben ser iguales'
    },
    lognombre:{
      required:"Debes introducir un nombre",
      minlength:"como mínimo {0} carácteres",
      maxlength:"como máximo {0} carácteres"
    },
    logclave1:{
      required:"Debes introducir una contraseña",
      minlength:"como mínimo {0} carácteres"
    },
    fgttemail:{
      required:"Debes introducir un email",
      email:"Has introducido un email no valido"
    }
  }
  });

Template.register.events({
  "click a#reglogin": function(event, template){
     event.preventDefault();
     Modal.hide(template);
     Modal.show('login');
  },
  "submit #register-form":function(event,template){
    var user=template.find('#regnombre').value;
    var email=template.find('#regemail').value;
    var pass1=template.find('#regpass1').value;
    var pass2=template.find('#regpass2').value;

    var userObject = {
      username: user,
      mail: email,
      password: pass1
    };

    Accounts.createUser(userObject, function (err) {
      if (err) {
        console.log(err.reason);
        //Username already exists.
        if(err.reason == "Username already exists."){
            validador.showErrors({
                regnombre: "Ya existe un usuario con ese nombre."
            });
        }

        if(err.reason == "Email already exists."){
            validador.showErrors({
              regmail: "El email ya pertenece a un usuario registrado."
            });
        }
      } else {
        //Router
        console.log(Meteor.user());
        Modal.hide(template);
        }
      //return false;
    });
    console.log('submit form'+user+email+pass1+pass2);
    return false;
  }

   });

Template.register.onRendered(function () {
  validator=$('#register-form').validate();
});


Template.login.events({
  "click a#logreg": function(event, template){
     event.preventDefault();
      Modal.hide(template);
      Modal.show('register');
  },
  
  "click a#logolvid": function(event, template){
     event.preventDefault();
      Modal.hide(template);
      Modal.show('forgottenPassword');
  },
  
  
  "submit #login-form":function(event,template){
    var user = template.find("#lognombre").value;
    var pass = template.find("#logpass1").value;

    Meteor.loginWithPassword(user,pass,function(err){

      if(err){
        if(err.reason == "User not found"){
          validator.showErrors({
            lognombre: "Ese usuario no existe."
          });
        }
        if(err.reason == "Incorrect password"){
          validator.showErrors({
            logclave1: "Has entrado una contraseña incorrecta."
          });
        }
      }else{
        //route
        console.log(Meteor.user());
        Modal.hide(template);
      }
      });
    console.log('login form'+user+pass);
    return false;
  }
});

Template.login.onRendered(function () {
  validator=$('#login-form').validate();
});


Template.logout.events({
  "submit #logout-form":function(event,template){
      Meteor.logout(function(){
        Modal.hide(template);
      });
  }
});

Template.forgottenPassword.events({
  "submit #forgottenPassword-form":function(event,template){
    
  }
});

Template.forgottenPassword.onRendered(function(){
  validator=$('forgottenPassword-form').validate();
});