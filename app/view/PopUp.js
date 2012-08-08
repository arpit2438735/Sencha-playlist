Ext.define("PlayListApp.view.PopUp", {
    extend: "Ext.form.Panel",

    xtype: 'popupbox',  
      
    config:{  
      itemId: 'popbox',
      id: 'popbox',  
      floating: true,  
      centered: true,  
     modal: true,  
     height: 500,  
     width: 500,  
     showAnimation: { type: 'slide', direction: 'left'},  
     styleHtmlContent: true,  
     tpl: '<iframe style="width:100%;height:100%;" src={linkId}>Your device does not support iframes.</iframe>',  
     items:[  
       {  
         xtype: 'button',  
         action: 'hide',  
         text: 'Close',  
         ui: 'confirm',  
         docked: 'bottom',  
       }  
    ]  
    }  
  });  