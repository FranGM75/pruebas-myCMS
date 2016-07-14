
entradas = [];



function random_string(len){
    var res="";
    var chars="0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (var i=0;i<len;i++){
        res += chars[Math.floor(Math.random()*chars.length)];
    }
    return res;
}

function lorem(){
    return "Maecenas mattis tincidunt turpis nec sodales. Donec diam leo, sagittis porttitor lectus ut, tempor pulvinar urna. Nam lobortis dui tortor, a vehicula leo varius ultricies. Maecenas rutrum dui a massa auctor imperdiet. Suspendisse potenti. Nullam elementum, odio ac facilisis condimentum, lectus dolor euismod dui, at commodo felis nisl in sapien. Donec in sem ligula. Etiam vel sem nec sem varius iaculis. Phasellus lacinia tincidunt eleifend. Nam ac arcu ante. Aliquam velit nisl, egestas ac lorem vel, fringilla tempus ante. Duis eu ligula augue. Curabitur fringilla faucibus justo sit amet accumsan. Ut eu augue dignissim, dictum turpis sit amet, mollis mi.\n"+

"Donec nec sagittis felis. Praesent ut ipsum ut metus porta elementum id vel felis. Donec maximus, orci sed posuere commodo, augue sapien auctor velit, nec aliquam tortor nunc non erat. Curabitur massa nibh, ornare vel ultrices non, rhoncus a justo. Ut vulputate vestibulum orci, a dapibus elit vehicula eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse bibendum posuere est ac pharetra.\n"+

"Nullam malesuada libero et euismod suscipit. Sed at urna bibendum, vestibulum lorem sagittis, facilisis massa. Integer felis tortor, vestibulum a tortor ac, rhoncus malesuada neque. Maecenas in nunc nec elit pellentesque eleifend. Vivamus id ultrices ipsum, sed convallis justo. Vivamus venenatis, nibh finibus eleifend laoreet, diam urna laoreet diam, id dignissim quam purus at est. Vestibulum enim nisi, faucibus pellentesque malesuada vehicula, condimentum eget lorem. Curabitur imperdiet, augue commodo feugiat condimentum, purus urna varius mauris, facilisis consectetur eros diam sed mauris. Praesent dignissim massa ut ipsum euismod venenatis. Suspendisse feugiat orci et ultricies imperdiet. Aenean tristique dapibus justo, nec pretium sapien blandit at.\n"+

" Duis dictum lorem ac enim congue accumsan.Donec at nunc mi. Sed tempor bibendum tellus, fermentum volutpat odio malesuada laoreet. Fusce sem sem, laoreet non mauris sed, pulvinar gravida sem. Aliquam auctor orci et enim condimentum laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus lacinia justo at volutpat. Donec tempor, urna vitae iaculis ultricies, erat velit tempor elit, at ullamcorper turpis diam non mi. Suspendisse feugiat eros sit amet consequat dictum. Curabitur sed consectetur magna. Nam congue enim a nibh pulvinar, et feugiat odio bibendum.\n"+

"Nulla ultricies massa eget tristique facilisis. Mauris vehicula ante ac massa pretium pulvinar. Nunc blandit, erat nec pellentesque convallis, ligula diam lobortis urna, nec aliquet eros quam sit amet felis. Donec et accumsan mauris. Proin lacinia ultricies metus, id tincidunt libero lobortis a. Integer porttitor at nibh vitae semper. Quisque faucibus consectetur consequat. Vestibulum sagittis risus orci, et convallis ligula commodo ac. Proin elementum elit libero, in viverra metus imperdiet porttitor. Ut sapien metus, ullamcorper scelerisque orci nec, porta lacinia massa.";

}

Meteor.startup(function(){
    if (!Meteor.users.findOne()){
        for (var i=1;i<101;i++){

            var options={};

            if (i==1){
                options = {
                    username:"user"+i,
                    email:"user"+i+"@test.com",
                    password:"123456",
                    profile:{
                        active:true,
                        roles:"admin"
                    }
                };
            }else{
                options = {
                    username:"user"+i,
                    email:"user"+i+"@test.com",
                    password:"123456",
                    profile:{
                        active:true,
                        roles:"user"
                    }
                };
            }

            var userId=Accounts.createUser(options);
            console.log("creado usuario con id : "+userId);
        }
    }

    //Entradas
    if (!Entradas.findOne()){
        for (var i=0;i<100;i++){
            var usr_count = Meteor.users.find().count();
            var j = Math.floor (Math.random()*usr_count);
            var user_name = "user"+j;
            var selector = {username:user_name};
            var user = Meteor.users.findOne(selector);
            if (user){
                var entrada = {
                    title:random_string(10),
                    texto:lorem(),
                    author_id:user._id,
                    active:true,
                    coments_num:0
                }
            }
            Entradas.insert(entrada, function(err,result){
                if(err){
                    throw new Meteor.Error(333, Entradas.simpleSchema().namedContext().invalidKeys());
                }else{
                    entradas[i]=result;
                }
            });
        }
        console.log(Entradas.simpleSchema().namedContext().invalidKeys());
    }

    //Comentarios
    if (!Comentarios.findOne()){
        for (var i=0;i<100;i++){
            var usr_count = Meteor.users.find().count();
            var j = Math.floor (Math.random()*usr_count);
            var user_name = "user"+j;
            var selector = {username:user_name};
            var user = Meteor.users.findOne(selector);
            if (user){
                var rand_entrada = Math.floor(Math.random()*entradas.length);
                var comentario = {
                    author_id:user._id,
                    entrada_id:entradas[rand_entrada],
                    title:random_string(25),
                    texto:lorem()
                };
                if (comentario.entrada_id){
                    Comentarios.insert(comentario, function(err,result){
                        if(err){
                            throw new Meteor.Error(333, Comentarios.simpleSchema().namedContext().invalidKeys());
                        }
                    });
                }

            }
        }
        console.log(Comentarios.simpleSchema().namedContext().invalidKeys());
    }

    console.log("FIN");


});
