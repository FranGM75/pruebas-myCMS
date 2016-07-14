


UserProfile = new SimpleSchema({
    active:{
        type:Boolean,
        optional:true
    },
    roles:{
        type:String,
        allowedValues:['admin','user'],
        optional:true
    }
});

UsersSchema = new SimpleSchema({
    username:{
        type:String,
        regEx:/^[a-z0-9A-Z_]{3,15}$/
    },
    emails:{
        type:[Object],
    },
    "emails.$.address":{
        type:String,
        regEx:SimpleSchema.RegEx.Email
    },
    "emails.$.verified":{
        type:Boolean
    },
    createdAt:{
        type:Date
    },
    profile:{
        type:UserProfile,
        optional:true
    },
    services:{
        type:Object,
        optional:true,
        blackbox:true
    }
});

Meteor.users.attachSchema(UsersSchema);
