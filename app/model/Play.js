Ext.define("PlayListApp.model.Play", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name:'profieId',type: 'string' }, 
            { name: 'title', type: 'string' },
            { name: 'duration', type: 'int'},
            { name: 'hidden', type: 'string' },
            { name: 'linkId', type: 'string' }
        ],
        validations: [
            
            { type: 'presence', field: 'title', message: 'Please enter a link in playlist.' },
            { type: 'format', name: 'duration',matcher:/^[0-9]*$/, message:  'Please enter duration in playlist'},
            //{ type: 'length', name:'duration', min:'1', max:'3', message:'Please enter digit between 1 and 3'}
        ]
    }
});