Ext.define("PlayListApp.store.Plays", {
    extend: "Ext.data.Store",
    
    config: {
        model: "PlayListApp.model.Play",
        proxy:{
              type:'ajax',
              id:'note-app-store',
              url:'json.php',
              method:'POST',
              //type: 'localstorage',
               reader:{
                type: 'json'                   

              },        
            
             }, 
            
        //sorters: [{ property: 'dateCreated'}],
         grouper: {
            //sortProperty: "dateCreated",
            //direction: "DESC",
            groupFn: function (record) {

                if (record) {
                    return record.get('title')[24].toUpperCase();
                } else {
                    return '';
                }
            }
        }
    }
	
});