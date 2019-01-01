# graphicupload
plugin for ckeditor allowing single image upload
1- extract the folder under ckeditor/plugins
2- new tree:ckeditor
              |-plugins
                  |-graphicupload
3- add graphicupload to your toolbar
4- Declare these configuration parameters
	-> guCKEUploadUrl   (url to post image to server)
	   Exemple guCKEUploadUrl: "/uploads/upload.php"     
	   This parameter is required
	   
	-> guCKEPrePostFunc  (javascript function to be executed before file submit. Note inputId is the DOM ID of file input to be sent to server)
	   Exemple:
            guCKEPrePostFunc: "function guCKEPrePostFunc(inputId){console.log('pre');}"
		This parameter is optional and could not be declared
		
	-> guCKECallbackSuccessFunc  (javascript function to be executed after submit success. Note inputId is the DOM ID of file input to be sent to server)
	   Exemple:
            guCKECallbackSuccessFunc: "function guCKECallbackSuccessFunc(inputId){console.log('success');}"
		This parameter is optional and could not be declared		
		
	-> guCKECallbackFailureFunc  (javascript function to be executed when the submit failed. Note inputId is the DOM ID of file input to be sent to server)
	   Exemple:
            guCKECallbackFailureFunc: "function guCKECallbackFailureFunc(inputId){console.log('failure');}"
		This parameter is optional and could not be declared			
            
			
    ** Note signatures and spelling of previous functions names must be respected


Configuration of graphicupload plugin on  symfony 3.x
config.yml file
....
....
fos_ck_editor:
    default_config: dashboard
    input_sync: true        
    configs:
        dashboard:
            toolbar:
            - [Bold, Italic, Underline, -, graphicupload,-,Cut, Copy, Paste, -, Undo, Redo, -,
              NumberedList, BulletedList, -, Outdent, Indent, -,
              Blockquote, -, Link, Unlink, source]
            extraPlugins: "graphicupload"        
            guCKEUploadUrl: "/uploads/upload.php"     
            guCKEPrePostFunc: "function guCKEPrePostFunc(inputId){console.log('pre');}"
            guCKECallbackSuccessFunc: "function guCKECallbackSuccessFunc(inputId){console.log('success');}"
            guCKECallbackFailureFunc: "function guCKECallbackFailureFunc(inputId){console.log('failure');}"

