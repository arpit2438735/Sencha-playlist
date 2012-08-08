Ext.application({
    name: "PlayListApp",

    models: ["Play"],
    stores: ["Plays"],
    controllers: ["Facebook","Plays"],
    views: ["PlaysList","PlayEditor","PopUp"],

     launch: function() {

        this.facebookAppId = '<app id>';

        if (this.facebookAppId == '') {
            Ext.create('Ext.Component', {
                fullscreen: true,
                padding: 20,
                html: [
                    '<p>Please read the source of app.js to set up this example locally.</p><br/>',
                    '<p>If it  work then contact me at arpit2438735@gmail.com</p>'
                ].join('')
            })
        }
    }
});