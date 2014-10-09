var libFunction = (function($){
	return {
		validateTextFields :function(inputFieldObj,inputFieldMap){
			var $inputField = inputFieldObj,
					inputFieldVal = $inputField.value,
					inputFieldId = $(inputFieldObj).attr('id'),
					errorEv = $.Event('validationError');
					$testObj = inputFieldMap[inputFieldId];


			if($testObj.required){

				if(inputFieldVal.length < $testObj.length){
					errorEv.error_message = $testObj.errmsg;
					$(inputFieldObj).trigger(errorEv);
					return;
				}

			}

			$(inputFieldObj).trigger('validationSuccess');
			return true;

		}
	}
}(jQuery));


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

	var $errorContainer = $('#error_msg'),
			errorMessage = {};

function validate(){
	$('.txtField').trigger('validateInput');
	// $('.txtField').each(function(){
	// 	$(this).trigger('validateInput');
	// });
	$('#userForm .err').eq(0).trigger('showError');
	$('#userForm .err').not($('#userForm .err').eq(0)).parent().removeClass('err-pr');
	$('#userAge .err').not($('.userForm .err').eq(0)).removeClass('err');
	if($('#userForm .err').length){
		return false;
	}else{
		return true;
	}
}

function displayError(errmsg){
	$errorContainer.text(errmsg);
	$errorContainer.show();
}

function hideError(){
	$errorContainer.text('');
	$errorContainer.hide();
}

$('.txtField').on('validateInput',function(){
	libFunction.validateTextFields.apply(this,[this,formFieldsMap]);
});

$('#userForm').on('showError','.err',function(e){
	displayError(errorMessage[this.id]);
});
	
$(".txtField").on('validationError',function(e){
	$(this).parent().addClass('err-pr');
	$(this).addClass('err');
	errorMessage[this.id] = e.error_message;
});

$('.txtField').on('validationSuccess',function(e){
	$(this).parent().removeClass('err-pr');
	$(this).removeClass('err');
	hideError();
});

$('#btnSubmit').on('click',function(){
	if(validate()){
		alert('All Validations fine...Form can now be submitted');
	}
});



}(jQuery));