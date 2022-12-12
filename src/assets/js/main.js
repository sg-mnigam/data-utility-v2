(function($) {
  "use strict"; // Start of use strict


  $(".circle-check-box").on('click', function(e) {
    $(this).toggleClass("checked");
  });
  
    $(".label-row").on('click', function(e) {
		$(".label-row").removeClass("Selected");
		$(this).toggleClass("Selected");
	
		
  });
	
	/*$(".table-hover tbody tr").on('click', function(e) {
		alert('fff')
		if($(this).find('.form-check-input').is(":checked")){
		
		
			$(this).find('.form-check-input').prop('checked', false)
			$(this).removeClass("selected");
			
            }
            else if($(this).find('.form-check-input').is(":not(:checked)")){
              
			$(this).find('.form-check-input').prop('checked', true)
			$(this).addClass("selected");
			//$("#txtAge").toggle(this.checked);
			
            }
		
  });*/
  
    $('.row-select-checkbox').click(function() {

        $(this).parent().parent().parent().toggleClass("selected");
    });

	
	$(document).on('click', '.all-select-checkbox', function(e) {
	if($('.all-select-checkbox').is(":checked")){
		
		
			$('.row-select-checkbox').prop('checked', true);
			//$("#txtAge").toggle(this.checked);
			$('.filesTable tbody tr').addClass("selected");
            }
            else if($('.all-select-checkbox').is(":not(:checked)")){
              
				$('.row-select-checkbox').prop('checked', false);
			//$("#txtAge").toggle(this.checked);
			$('.filesTable tbody tr').removeClass("selected");
            }
    });
	
	//row-select-checkbox
	
	
	$(function() {
	  $('input[name="daterange"]').daterangepicker({
		opens: 'left'
	  }, function(start, end, label) {
		console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
	  });
});

var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
removeItemButton: true,
maxItemCount:5,
searchResultLimit:5,
renderChoiceLimit:5
});
	
})(jQuery); // End of use strict
