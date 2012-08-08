Ext.define("PlayListApp.view.PlaysList", {
     extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.playslistview",
    config: {
       
        layout: {
            type: 'fit'
        },
        
        items: [{
            xtype: "toolbar",
            title: "My PlayList",
            docked: "top",
            items: [
                {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteButton"
                },
                
                {
                        xtype: "button",
                        iconCls: "download",
                        iconMask: true,
                        itemId: "overlayButton"
                },
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    iconCls:'add',
                    iconMask:true,
                    ui: 'action',
                    itemId: "newButton"
                },
                {
                    
                    id:'signout',
                    xtype: 'panel',
                    tpl:'<img src="https://graph.facebook.com/{profileId}/picture?type=square" />',
                   
                }     
            ]  
        },
        {
            xtype: "list",
            store: "Plays",
            itemId:"playsList",
			mode: 'MULTI',
            loadingText: "Loading PlaysList...",
            emptyText: '<div class="notes-list-empty-text">No PlayList found.</div>',
            itemTpl: '<div class="list-item-title">{title}</div><div class="list-item-narrative">{duration}</div><div class="list-item-hide">{hidden}</div>',
			grouped: true
        },
        ],
       
       
        listeners: [{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        },
        {
            delegate: "#playsList",
            event: "itemsingletap",
            fn: "onNotesListDisclose"
        },
        {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
        },
        {
            delegate: "#overlayButton",
            event: "tap",
            fn: "onOverlayButtonTap"
        },
        {
            delegate: "#saveButton",
            event: "tap",
            fn: "onEditButtonTap"
        },
       ]
    },
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        this.fireEvent("editNoteCommand",this,record,index);
       
        //this.fireEvent('editNoteCommand', this, record);
    },
    onDeleteButtonTap: function () {
        //console.log("deleteNoteCommand");
        
        this.fireEvent("deleteNoteCommand", this);
    },
    onOverlayButtonTap:function(){
        this.fireEvent("overlayNoteCommand",this);
    },
   initialize: function() {
        this.callParent();

        // Enable the Tap event on the profile picture in the toolbar, so we can show a logout button
        var meta = Ext.getCmp('signout');
        if (meta) {
            meta.element.on('tap', function(e) {
                meta.fireEvent('tap', meta, e);
            });
        }
    }

});