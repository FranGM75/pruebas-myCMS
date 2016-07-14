
Router.configure({
    layoutTemplate:"layoutTemplate",
    notFoundTemplate:"notFoundTemplate"
});

Router.route("/", {
    name:"home",
    template:"home",
    waitOn:function(){
        return Meteor.subscribe('Entradas');
    },
    data:function(){
         return Entradas.find({});
    }
});


Router.route("/register");

Router.route("/login");

Router.route("/entrada/:_name", {
    name:"entrada",
    template:"entradaTemplate",
    waitOn:function(){
        return[Meteor.subscribe('EntradasByName',this.params._name),
                Meteor.subscribe('ComentariosByName',this.params._name)];
    },
    data : function () {
         return Entradas.findOne({title : this.params._name});
    }
});
