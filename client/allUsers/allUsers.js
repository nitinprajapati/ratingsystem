Meteor.subscribe('allUsers');
Template.UserList.helpers({
    UserList: ()=> {
        if(Meteor.userId())
            return Meteor.users.find().fetch();
    }
});

Template.UserList.events({
    'click .btn': function (evt) { //Bind click event on rate button(R)
        var user_id = "", user_rating = 0;
        user_id       =   $(evt.target).attr("userid");
        user_rating   =   parseFloat($(evt.currentTarget).siblings().val());

        if(user_rating != NaN && user_rating <= 10 && user_rating >= 0 ){
            Meteor.users.find({_id: {$eq: user_id}}).observe({
                 added:  (doc) => {
                     var rating = "", ori_rating = "", rating_sum =   0, avgrating = 0;
                     ori_rating =   doc.rating;
                     if(ori_rating != undefined){
                         if(typeof(ori_rating) != "object"){
                            rating =   ori_rating.split(",");
                         }
 
                        for(var i=0; i<rating.length; i++){
                            rating_sum  += parseFloat(rating[i]);
                        }
                        rating_sum  +=  parseFloat(user_rating);
                        ori_rating  +=  ","+user_rating;
                        avgrating    =   rating_sum/(rating.length+1);
                        avgrating    =   avgrating.toFixed(1);
                        rating       =   ori_rating;
                     }
                     else{
                         rating     =   user_rating.toString();
                         avgrating  =   rating;
                     }
                    Meteor.users.update({_id:user_id}, { $set: {"rating": rating, "avgrating" : avgrating}});
               }
           });          
        }
        else{
            alert("Please enter a rating between 0 to 10");
            return false;
        }
    }
});
