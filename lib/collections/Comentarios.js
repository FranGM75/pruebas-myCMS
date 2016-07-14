

Comentarios = new Meteor.Collection('comentarios');


ComentariosSchema = new SimpleSchema({
    "author_id":{
        type:String,
        label:"autor"
    },
    "entrada_id":{
        type:String,
        label:"id entrada"
    },
    "title":{
        type:String,
        label:"titulo",
        max:255
    },
    "texto":{
        type:String,
        label:"texto"
    },
    "createdAt":{
        type:Date,
        label:"creation",
        autoValue:function(){
            return new Date;
        }
    }
});

Comentarios.attachSchema(ComentariosSchema);

Comentarios.after.insert(function(userId,doc){
    Entradas.update({_id:doc.entrada_id}, {$inc:{coments_num:1}},function(error,result){
        if (error)
            console.log('error update entradas :'+error.reason);
    });
});

Comentarios.after.remove(function(userId,doc){
    Entradas.update({_id:doc.entrada_id}, {$inc:{coments_num:-1}},function(error,result){
        if (error)
            console.log('error update entradas :'+error.reason);
    });
});
