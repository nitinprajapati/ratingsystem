FlowRouter.route('/', {
    name: 'home',
    action(){
        BlazeLayout.render('MainLayout', {main: 'UserList'});
    }
});
