Ext.define("PlayListApp.controller.Plays", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            notesListView: "playslistview",
            noteEditorView: "playeditorview",
            notesList: "#playsList",
            popUp: {
            selector: 'formpanel #popbox',  
                      xtype: 'popupbox',  
                     autoCreate: true,  
                  
        }
        },
        control: {
            notesListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                overlayNoteCommand: "onOverlayNoteCommand",

            },
            noteEditorView: {
        // The commands fired by the note editor.
                 
                 saveNoteCommand: "onSaveNoteCommand",
                 backToHomeCommand: "onBackToHomeCommand",
                 
        },
        
        }
    },
    //radom
    getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
},
    // Transitions
    slideUpTransition: { type: 'slide', direction: 'up' },
    slideDownTransition: { type: 'slide', direction: 'down' },

    activatePlayEditor: function (record) {

        var noteEditor = this.getNoteEditorView();
        noteEditor.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditor, this.slideUpTransition);
    },
    activateNotesList: function () {
    Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideDownTransition);
    }, 
    // Commands.
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");        
        var newNote = Ext.create("PlayListApp.model.Play", {
        title: "",
        duration: "",
        hidden: "",
    });

    this.activatePlayEditor(newNote);
},
  
    onEditNoteCommand: function (list,record,index) {
       Ext.apply(this, { itemTpl:Ext.XTemplate(
    '<tpl if="editing == false"><input type="text" name="title" value="{title}" disabled/><tpl else><input type="text" name="title" value="{title}"/></tpl>'
    )});
     //this.getNotesList().setRecord(itemTpl);

    },
    onSaveNoteCommand: function () {

    //console.log("onSaveNoteCommand");

    var noteEditor = this.getNoteEditorView();

    var currentNote = noteEditor.getRecord();
    var newValues = noteEditor.getValues();
    //hidden=newValues.title;
    // Update the current note's fields with form values.
   currentNote.set("title", newValues.title);
   currentNote.set("duration", newValues.duration);
   currentNote.set("hidden",newValues.hidden);
   title=newValues.title;
   duration=newValues.duration;
   hidden=newValues.hidden;
   var errors = currentNote.validate();
    msg='';
    if (!errors.isValid()) {
        //Ext.Msg.alert('Wait!','Please fill all the fields',Ext.emptyFn);
        //Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
       errors.each(function (err) {
                                        msg += err.getMessage() + '<br/>';
                                  }); // each()
                                Ext.Msg.alert('ERROR!', msg);                              
      currentNote.reject();
      return;
   }

    var notesStore = Ext.getStore("Plays");   

    //notesStore.sync();
    Ext.Ajax.request({
                    url:'saves.php',
                    params : { html :title,duration : duration,hidden: hidden},
                    method: 'POST',
                    timeout:3000,
                    success: function(e) {
                        Ext.Msg.alert(e.responseText,"");
                    },
                    failure:function(e)
                    {
                       Ext.Msg.alert('Failed!','Due to some technical issues');
                    }
                },1000);
    notesStore.load();
   // notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

    this.activateNotesList();
},
onDeleteNoteCommand: function () {

    console.log("onDeleteNoteCommand");
    
   var record= this.getNotesList().getSelection();
   //console.log(record);
   for(i=0;i<record.length;i++)
   {
    var title = record[i].data["title"];
    var duration = record[i].data["duration"];
    var hidden = record[i].data["hidden"];
    Ext.Ajax.request({
                    url:'delete.php',
                    params : { html :title,duration : duration,hidden: hidden},
                    method: 'POST',
                    timeout:3000,
                    success: function(e) {
                       //Ext.Msg.alert(e.responseText);
                    },
                    failure:function(e)
                    {
                       Ext.Msg.alert('Failed!','Due to some technical issues');
                    },
                  },3000);
   }
    //var currentNote = noteEditor.getRecord();
    //var newValues = noteEditor.getValues();
    //title=newValues.title;
    //duration=newValues.duration;
    //hidden=newValues.hidden;
    
    var notesStore = Ext.getStore("Plays");

    //notesStore.remove(currentNote);
    //notesStore.sync();
    //Ext.Ajax.request({
      //              url:'http://127.0.0.1/edit/delete.php',
        //            params : { html :title,duration : duration,hidden: hidden},
          //          method: 'POST',
            //        timeout:3000,
              //      success: function(e) {
                       //Ext.Msg.alert(e.responseText);
                //    },
                  //  failure:function(e)
                    //{
                      // Ext.Msg.alert('Failed!','Due to some technical issues');
                    //}
                //});
    //notesStore.sync();
    notesStore.load();
   this.getNotesList().refresh();
    
},

onBackToHomeCommand: function () {

//console.log("onBackToHomeCommand");
this.activateNotesList();
},
onPopUpCommand: function () {
  //console.log("onPopUpCommand");


},
onOverlayNoteCommand: function(){
  //console.log("onOverlayNoteCommand");
  if(!this.overlay){
    this.overlay= Ext.Viewport.add({
      xtype: 'panel',
      modal: true,
      hideOnMaskTap: true,
      centered: true,
      showAnimation:{
        type: 'popIn',
        duration: 250,
        easing: 'ease-out'
      },
      hideAnimation:{
        type: 'popOut',
        duration: 250,
        easing: 'ease-out'
      },
      width: Ext.os.DeviceType=='Phone'?260: 700,
      height: Ext.os.DeviceType=='Phone'?220: 500,
      styleHtmlContent: true,
      scrollable: true,
      html: '<iframe style="width:100%;height:100%;" src="http://carouselinfo.com">Your device does not support iframes.</iframe>',
    });
    
  }
  this.overlay.show();
},
onshowPopup: function(){  
          var popup = this.getPopUp();  
          Ext.Viewport.add(popup);
          var noteEditor = this.getNoteEditorView();
          var currentNote = noteEditor.getRecord();
          var newValues = noteEditor.getValues();
           title=newValues.title;
          var  getpopup= Ext.getCmp("popbox");
         // console.log(getpopup);
           getpopup.setData({linkId:title});
          popup.show();  
},
 hide: function(){  
          var popup = this.getPopUp();  
          popup.hide({type: 'slideOut', direction: 'Down'});  
},  
    
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Plays");
        notesStore.load();
        console.log("launch");

    },
    init: function () {
        Ext.Loader.setConfig({
       enabled: true,
       paths : {
       store : 'Plays'
        }
      });
        this.callParent(arguments);
        console.log("init");
        this.control({
        'button[action=showPopup]': {  
                  tap: 'onshowPopup'  
              },
         'button[action=hide]': {  
                  tap: 'hide'  
              }  
                 
    
           });
        }
});