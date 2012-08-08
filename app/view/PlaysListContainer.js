Ext.define("PlayListApp.view.PlaysListContainer", {
    extend: "Ext.Container",
    alias: "widget.playslistcontainer",

    initialize: function () {

        this.callParent(arguments);

        var newButton = {
            xtype: "button",
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            title: 'My Playlist',
            docked: "top",
            items: [
                { xtype: 'spacer' },
                newButton
            ]
        };

        var notesList = {
            xtype: "playslist",
            store: Ext.getStore("Plays"),
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        };

        this.add([topToolbar, notesList]);
    },
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    },
    config: {
        layout: {
            type: 'fit'
        }
    }
});