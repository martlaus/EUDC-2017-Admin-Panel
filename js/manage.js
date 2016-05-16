$(function() { 

  $('#submit-card').on('click', function(event) {
    event.preventDefault();
    var worked = false;
    console.log('hakkan ajaxit yritama');
    
    $.ajax({
      url: 'http://localhost:7070/rest/card',
      type: 'POST',
      data: { json: JSON.stringify({
            title: "TERE",
            description: 'HOMMIKUST"
        })},
        dataType: 'json',
      async: false,
      success: function(data) {
           worked = true;
      }
    });
    
    if (worked == true) {
      alert("Saatmine õnnestus!");
      return false;
    }
    

  });

});