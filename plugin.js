/*
 * graphicupload is a CKEditor plugin allows upload of image to server and insert it in the editor
 * By  wassim jied 
 * Blog http://coderspirit.blogspot.com
 * email wassim.jied@gmail.com
 * January 1st 2019
 */
CKEDITOR.plugins.add( 'graphicupload', {
    icons: 'graphicupload',
    init: function( editor ) {
        var randGUFrmId = '_' + Math.random().toString(36).substr(2, 14);
        var htmlGU="<form enctype='multipart/form-data' method='post' action='/uploads/upload.php' id='frm_"+randGUFrmId+"' style='display:none;'>";
            htmlGU+="<input type='file' name='upload' id='btn_file_"+randGUFrmId+"' accept='image/png, image/jpeg, image/gif'>";
            htmlGU+="</form>";
        $('body').prepend(htmlGU);
        /*var guCKEPrePostFunc;
        var guCKECallbackSuccessFunc;
        var guCKECallbackFailureFunc;*/
        if(editor.config.guCKEPrePostFunc !== 'undefined'){                    
            eval(editor.config.guCKEPrePostFunc);
        }
         if(editor.config.guCKECallbackSuccessFunc !== 'undefined'){        
            eval(editor.config.guCKECallbackSuccessFunc);
        }    
        if(editor.config.guCKECallbackFailureFunc !== 'undefined'){        
            eval(editor.config.guCKECallbackFailureFunc);
        }
        
        editor.addCommand('graphicupload', {
        exec: function (editor) {            
            $('#btn_file_'+randGUFrmId).click();
            
        }});
        $('#btn_file_'+randGUFrmId).change(function(){
          var file_data = $('#btn_file_'+randGUFrmId).prop('files')[0];
          var form_data = new FormData(); 
          form_data.append('upload', file_data);          
          if (typeof guCKEPrePostFunc == 'function') {
                guCKEPrePostFunc('btn_file_'+randGUFrmId);
            }
          $.ajax({
                url: editor.config.guCKEUploadUrl, // point to server-side PHP script
                dataType: 'text', // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(data){
                    if (typeof guCKECallbackSuccessFunc == 'function') {                    
                        guCKECallbackSuccessFunc('btn_file_'+randGUFrmId);
                    }

                    imgDomElem = CKEDITOR.dom.element.createFromHtml("<img src='"+data+"'/>")
                    editor.insertElement(imgDomElem);                    
                },
                failure:function(){
                   if (typeof guCKECallbackFailureFunc == 'function') {
                        guCKECallbackFailureFunc('btn_file_'+randGUFrmId);
                    }                    
                }
            });
            document.getElementById('btn_file_'+randGUFrmId).value = "";
       })

        editor.ui.addButton( 'graphicupload', {
            label: 'Insert Abbreviation',
            command: 'graphicupload',
            toolbar: 'insert'
        });
    }
});