$('#confirm-delete, #confirm-enable, #remainder-email').one('show.bs.modal', function(e) {
	$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
});

$("#login_form").submit(function(){
	$('#login__block__btn').attr('disabled', true);
});

$("#kyc_form_data").submit(function(){
	$('#btn_submit').html("Verifying...");
	$('#btn_submit').attr('disabled', true);
});

$("#trade_pairs_add_form").submit(function(){
	$('#btn_add_trade_pair').html("Loading...");
	$('#btn_add_trade_pair').attr('disabled', true);
});


function pageredirect(self){
	window.location.href = self.value;
}

$(".allletterwithnumberspace").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^A-Za-z0-9 ]+(?: \S+)/g, ''));
	if ((event.which > 30 && event.which < 48) || (event.which > 57 && event.which < 65) || event.which == 46 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});

$(function() {
	$('.allow_decimal').on('input', function() {
		this.value = this.value
		.replace(/[^\d.]/g, '')             // numbers and decimals only
		.replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
		.replace(/(\.[\d]{2})./g, '$1');   // not more than 4 digits after decimal
		if(this.value == '0.000' || this.value == '.000'){
			this.value = '0.00';
		}
	});
});

$(function() {
	$('.alloweight_decimal').on('input', function() {
		this.value = this.value
		.replace(/[^\d.]/g, '')             // numbers and decimals only
		.replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
		.replace(/(\.[\d]{8})./g, '$1');   // not more than 4 digits after decimal
		if(this.value == '0.0000' || this.value == '.0000'){
			this.value = '0.000';
		}
	});
});

$(function() {
	$('.allowfif_decimal').on('input', function() {
		this.value = this.value
		.replace(/[^\d.]/g, '')             // numbers and decimals only
		.replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
		.replace(/(\.[\d]{15})./g, '$1');   // not more than 4 digits after decimal
		if(this.value == '0.0000000000000000' || this.value == '.0000000000000000'){
			this.value = '0.000000000000000';
		}
	});
});

$("#btc_debosit_bitcoins").submit(function(){
	$('#confirm_cancel_order').attr('disabled', true); 
	$('#confirm_cancel_order').val('Loading...'); 
});

$("#currency_form").submit(function(){
	$('#btn_update').attr('disabled', true);
});

$(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^0-9\.]/g,''));
	if((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57) && (event.which != 8) && event.which != 37) {
		event.preventDefault();
	}
});

$("#allownumericwithoutdecimal").on("keypress keyup blur",function (event) {    
	$(this).val($(this).val().replace(/[^\d].+/, ""));
	if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 46) {
		event.preventDefault();
	}
});

$('#update_crypto_status').on('click', function(){
	$('#update_crypto_status').attr('disabled', true);
	$('#update_crypto_status').html('<i class="fa fa-spinner"></i> Loading...');
	var return_url = $('#return_url').val();
	var data_url = $('#data_url').val();
	$.ajax({
		type: "POST",
		url: data_url,
		data: $('#crypto_form').serialize(),
		dataType: "json",
		success: function(data){
			if(data.status == 'success')
			{
				if(data.check_status == 1)
				{
					$('#update_crypto_status').attr('disabled', true);
					$('#update_crypto_status').html('<i class="fa fa-edit"></i> Update');
					$('#withdraw_id').val(data.withdraw_id);
					$('#verificationModal').modal('show');
				}
				else
				{
					$('#hide_val').hide();
					$("#withdraw_result").html('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.msg+'</div>');
					window.setTimeout(function() {
						window.location.href = return_url;
					}, 1500);
				}
			}
			else
			{
				$('#update_crypto_status').attr('disabled', false);
				$('#update_crypto_status').html('<i class="fa fa-edit"></i> Update');
				$("#withdraw_result").html('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.msg+'</div>');
			}
		}
	});
	return false;
});

$('#verify_form').on('submit', function(){
	$('#verify_btn').attr('disabled', true);
});

$('#confirm_account_btn').on('click', function(){
	$('#confirm_account_btn').attr('disabled', true);
	$('#confirm_account_btn').html("Verifying....");
	var url = $('#current_url').val();
	var formData = $('#verify_form').serialize();
	var data_url = $('#confirm_data_url').val();
	$.ajax({
		type: "post",
		url: data_url,
		dataType: "json",
		data: formData,
		success: function(data){
			if(data.status == 'success')
			{
				$('#confirm_account_btn').attr('disabled', false);
				$('#confirm_account_btn').html("Verified");

				$("#confirm_msg_popup").html("");
				$("#confirm_data_shown").html('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.msg+'</div>');
				window.setTimeout(function() {
					window.location.href = url;
				}, 1500);
			}
			else
			{
				$('#confirm_account_btn').attr('disabled', false);
				$('#confirm_account_btn').html("Confirm your withdraw");
				$('#display_confirm_msg').show();
				$('#confirmMsg').html(data.msg);
			}
		}
	});
	return false;
});

$('#dashboard_status, #user_status, #trade_status, #deposit_status, #withdraw_status, #kyc_status, #support_status, #commission_status, #adminaccount_status').click(function()
{ 
	if($(this).is(':checked'))
	{
		$(this).val('1');
	}
	else
	{
		$(this).val('0');
	}
});

function sendEthCrypto(data_url)
{
	$('#send_btn').attr('disabled', true);
	$('#send_btn').html("Loading...");
	var send_form = $('#send_form').serialize();
	$.ajax({
		type: "POST",
		url: data_url,
		dataType: "json",
		data: send_form,
		success: function(data)
		{
			$('#send_btn').attr('disabled', false);
			$('#send_btn').html("Withdraw");
			if(data.status == 'success')
			{
				$("#amount_result").hide();
				$("#address_result").hide();
				$('#confirm_to_address').val(data.address);
				$('#confirm_amount').val(data.amount);
				$('#confirm_memo').val(data.memo);
				$('#verificationModal').modal('show');
			}
			else
			{
				if(data.msg.amount)
				{
					$("#amount_result").html('<div class="text text-danger">'+data.msg.amount+'</div>');
				}
				if(data.msg.to_address)
				{
					$("#address_result").html('<div class="text text-danger">'+data.msg.to_address+'</div>');
				}
				if(data.msg.pvtk)
				{
					$("#pvtk_result").html('<div class="text text-danger">The private/secret key filed is required</div>');
				}
				if(!data.msg.amount && !data.msg.to_address && !data.msg.pvtk)
				{
					$("#send_result").html('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+data.msg+'</div>');
				}
			}
		}
	});
	return false;
}

/* ------ letters and numbers only example username -------------*/
$(".allletterwithnumber").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^A-Za-z0-9]/g, ''));
	if ((event.which > 30 && event.which < 48) || (event.which > 57 && event.which < 65) || event.which == 46 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});

/* ------ letters only example username -------------*/
$(".allletter").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^A-Za-z]/g, ''));
	if ((event.which > 30 && event.which < 65) || event.which == 46 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});


/* ------ letters with single space -------------*/
$(".allletterwithspace").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^A-Za-z ]+(?: \S+)/g, ''));
	if ((event.which > 30 && event.which < 32) || (event.which > 32 && event.which < 65) || event.which == 46 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});

/* ------------ integer number only ----------------*/
$(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) {    
	$(this).val($(this).val().replace(/[^\d].+/, ""));
	if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 46 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});

// ------------ integer and float number ----------------
$(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
	$(this).val($(this).val().replace(/[^0-9\.]/g,''));
	if((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57) && (event.which != 8) && event.which != 37 || (event.which >= 123 && event.which <= 125) || (event.which >= 219 && event.which <= 221) || (event.which >= 91 && event.which <= 95) || event.which == 189) {
		event.preventDefault();
	}
});

/* ------------ integer number and minus only ----------------*/
$(".allownumericwithoutdecimalandsymbol").on("keypress keyup blur",function (event) {
	if (event.which != 46 && event.which != 45 && event.which != 46 &&
    !(event.which >= 48 && event.which <= 57)) {
       event.preventDefault();
    }
});

$('#kyc_btn').on('click', function(){
	$("#kyc_btn").attr('disabled', true);
	$("#kyc_btn").html('Loading...');
	var data_url = $('#data_url').val();
	var current_url = $('#current_url').val();
	$.ajax({
		type: "POST",
		url: data_url,
		dataType: "json",
		data: new FormData($('#kyc_form_data')[0]),
		processData: false,
		contentType: false,
		success: function(data){
			if(data.status == 'success')
			{
				$("#kyc_btn").attr('disabled', true);
				$("#kyc_btn").html('<i class="fa fa-pencil-square-o"></i> Update');
				$("#result").html('<span class="text-success"><b>'+data.msg+'</b></span>');
				setInterval(function(){
					window.location.href=current_url;
				}, 1500);
			}
			else
			{
				$("#kyc_btn").attr('disabled', false);
				$("#kyc_btn").html('<i class="fa fa-pencil-square-o"></i> Update');
				$("#result").html('<span class="text-danger">'+data.msg+'</span>');
			}
		}
	});
	return false;
});

$("#proof_upload1").change(function() {
	var limit_size = 3145728;
	var photo_size = this.files[0].size;
	if(photo_size > limit_size){
		$("#news_btn").attr('disabled',true);
		$('#proof_upload1').val('');
		alert('Image Size Larger than 3MB');
	}
	else
	{ 
		$("#proof_upload1").text(this.files[0].name);
		$("#news_btn").attr('disabled',false);

		var file = document.getElementById('proof_upload1').value;
		var ext = file.split('.').pop();
		switch(ext) {
			case 'jpg':
			case 'JPG':
			case 'Jpg':
			case 'jpeg':
			case 'JPEG':
			case 'Jpeg':
			case 'png':
			case 'PNG':
			case 'Png':
			readURL10(this);
			break;
			default:
			alert('Upload your proof like jpg, png, jpeg');
			break;
		}
	}
});

function readURL10(input) {
	var limit_size = 3145728;
	var photo_size = input.files[0].size;
	if(photo_size > limit_size){
		alert('Image Size Larger than 3MB');
	}
	else
	{
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#blah').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
}

$("#support_file").change(function() {
	var limit_size = 5242880;
	var photo_size = this.files[0].size;
	if(photo_size > limit_size){
		$("#submitTicket").attr('disabled',true);
		$('#support_file').val('');
		alert('Image / Document Size Larger than 5MB');
	}
	else
	{
		$("#support_file").text(this.files[0].name);
		$("#submitTicket").attr('disabled',false);

		var file = document.getElementById('support_file').value;
		var ext = file.split('.').pop();
		switch(ext) {
			
			case 'doc':
			case 'Doc':
			case 'DOC':
			case 'docx':
			case 'Docx':
			case 'DOCX':
			case 'pdf':
			case 'Pdf':
			case 'PDF':
			readUploadDoc(this);
			break;
			default:
			$('#support_file').val(null);
			alert('Upload your document like doc, pdf, docx');
			break;
		}
	}
});



function readUploadDoc(input) {
	var getCurrentUrl = $('#get_current_url').val();
	
	var limit_size = 5242880;
	var photo_size = input.files[0].size;
	if(photo_size > limit_size){
		alert('Image Size Larger than 5MB');
	}
	else
	{
		var file = document.getElementById('support_file').value;
		var images = file.replace(/^.*\\/, "");
		var ext = file.split('.').pop();

		ext = ext.toLowerCase();
		if(ext == 'doc' || ext == 'docx')
		{
			$('#blah').attr('src', getCurrentUrl+'/images/doc.svg');
			$('#imageview').append(images);
		
		}
		else if(ext == 'pdf')
		{
			$('#blah').attr('src', getCurrentUrl+'/images/pdf.svg');
			$('#imageview').append(images);
		}
		else if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#blah').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
}