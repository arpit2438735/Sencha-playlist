Ext.define("PlayListApp.view.Login", {
    extend: "Ext.Container",
       
    config:{ 
        scrollable: 'vertical',

        items: [
            {
                docked: 'top',
                xtype: 'toolbar'
                
            }
        ]
    },

    showLoginText: function() {
         //console.log("LoginText");
        var redirectUrl = Ext.Object.toQueryString({
            redirect_uri: window.location.protocol + "//" + window.location.host + window.location.pathname,
            client_id: PlayListApp.app.facebookAppId,
            response_type: 'token'
        });

        this.setHtml([
            '<h2>Welcome to PlayList App</h2>',
            '<p>With this app you can edit playlist</p>',
            '<p>In order to use this app you must sign in with your Facebook account.</p>',
            '<a class="fbLogin" href="https://m.facebook.com/dialog/oauth?' + redirectUrl + '"></a>',
            '<div class="fb-facepile" data-app-id="' + PlayListApp.app.facebookAppId + '" data-max-rows="2" data-width="300"></div>'
        ].join(''));

         FB.XFBML.parse(document.getElementById('splash'));
    }
});