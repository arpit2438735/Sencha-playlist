Ext.define("PlayListApp.view.PlayEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.playeditorview",
     config:{ 
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Edit PlayList",
                items: 
                    {
                        xtype: "button",
                        ui: "action",
                        iconCls:"home",
                        iconMask:true,
                        itemId: "backButton"
                    },
                    
                
            },
            
            { 
                xtype: "fieldset",
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Link',
                        placeHolder: 'http://yousite.com',
                        required: true,
                        id:"titleEvent"
                       
                    },
                    {
                        xtype: 'textfield',
                        name: 'duration',
                        label: 'Duration',
                        placeHolder:'99',  
                        required:true,
                        id:"durationEvent"
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'hidden'                                          
                    }
                ]
                

            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#titleEvent",
                event: "action",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#durationEvent",
                event: "action",
                fn: "onSaveButtonTap"
            },
            
            {
                delegate: "#popup",
                event: "action",
                fn: "onPopUpTap"
            }

            
        ]
    },
   onSaveButtonTap: function (list) {
        //console.log("saveNoteCommand");
        this.fireEvent("saveNoteCommand", this);
    },
   
    onBackButtonTap: function () {
        //console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    },
    onPopUpTap:function(list){
        console.log("PopUpcommand");
        this.fireEvent("popUpCommand",this);
    }
});