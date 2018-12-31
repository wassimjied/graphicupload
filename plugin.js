CKEDITOR.plugins.add( 'graphicsupload', {
    icons: 'graphicsupload',
    init: function( editor ) {
        var randGUFrmId = '_' + Math.random().toString(36).substr(2, 14);
        var htmlGU="<form enctype='multipart/form-data' method='post' action='/uploads/upload.php' id='frm_"+randGUFrmId+"' style='display:none;'>";
            htmlGU+="<input type='file' name='upload' id='btn_file_"+randGUFrmId+"'>";
            htmlGU+="</form>";
        $('body').prepend(htmlGU);
        editor.addCommand('graphicsupload', {
        exec: function (editor) {
            console.log('fired');
            $('#btn_file_'+randGUFrmId).click();
            
        }});
        $('#btn_file_'+randGUFrmId).change(function(){
          var file_data = $('#btn_file_'+randGUFrmId).prop('files')[0];
          var form_data = new FormData(); 
          form_data.append('upload', file_data);
          
          $.ajax({
                url: '/uploads/upload.php', // point to server-side PHP script
                dataType: 'text', // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(data){
                    // get server responce here
                    alert(data);
                    imgDomElem = CKEDITOR.dom.element.createFromHtml("<img src='"+data+"'/>")
                    editor.insertElement(imgDomElem);                    
                }
            });
            // clear file field
       })

        editor.ui.addButton( 'graphicsupload', {
            label: 'Insert Abbreviation',
            command: 'graphicsupload',
            toolbar: 'insert'
        });
    }
});