
// Check to see if weight is over limit for letter class
$("#weight").keyup( function () {
   if (parseInt(this.value) > 100) {
     $("option[value='letter']").prop('disabled', true);
     destroyReBuild();
   } else{
     $("option[value='letter']").prop('disabled', false);
     destroyReBuild();
   }
});

// Destroy and Rebuild Select Input
function destroyReBuild(){
  $('.mdb-select').material_select('destroy');
  $(document).ready(function() {
     $('.mdb-select').material_select();
   });
}
