var libFun = (function($){
	return {
		validateTxtFlds : function(txtFld,validMap){
			var txtFldId = $(txtFld).attr("id"),
					txtFldLen = $(txtFld).val().length,
					valErr    = $.Event('validationError');


			if(validMap[txtFldId].required){
				if(txtFldLen < validMap[txtFldId].length){
					valErr.errorMsg = validMap[txtFldId].errmsg;
					$(txtFld).trigger(valErr);
					return;
				}
			}

			$(txtFld).trigger('validationSuccess');
			return true;
		}
	}
}(jQuery))


;(function($){

	var formFieldsMap = {
			'userName':{
				required : true,
				length : 5,
				errmsg:'Name should be more than 4 characters'
			},
			'userAge':{
				required:true,
				length:2,
				errmsg:'Age should be more than 1 number'
			}
		}

	var errMessagesStore = {};

	var $userForm = $('#userForm'),
			$txtFields = $('#userForm .txtField'),
			$errorContainer = $('#error_msg');

	$('#userForm #btnSubmit').on('click',function(){
		if(!validateForm()){
			return false;
		}else{
			alert('validations success...you may now submit your form');
		}
	});


	function validateForm(){
		$('#userForm .txtField').each(function(){
			libFun.validateTxtFlds.apply(this,[this,formFieldsMap])
		});

		$('#userForm .err').not($('#userForm .err').eq(0)).parent().removeClass('err-pr');
		$('#userForm .err').not($('#userForm .err').eq(0)).removeClass('err');
		$('#userForm .err').eq(0).trigger('showError');
		return $('#userForm .err').length ? false : true;
	}

	$('#userForm .txtField').on('validationSuccess',function(e){
		$(this).removeClass('err');
		$(this).parent().removeClass('err-pr');
		hideError();
		return;
	});


	$('#userForm .txtField').on('validationError',function(e){
		$(this).addClass('err');
		$(this).parent().addClass('err-pr');
		errMessagesStore[this.id] = e.errorMsg;
		return;
	});

	$('#userForm').on('showError','.err',function(){
		showError(errMessagesStore[this.id]);
	});


	function showError(errmsg){
		$errorContainer.text(errmsg);
		$errorContainer.show();
	}

	function hideError(){
		$errorContainer.text('');
		$errorContainer.hide();
	}

}(jQuery));