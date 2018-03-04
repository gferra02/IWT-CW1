// Remember to check for case sensitive/insensitive
// https://github.com/dfilatov/jspath#string-comparison-operators

$(document).ready(function() {

    $('#trigger-results').click(function() {
        var results = $('#result-list');
        results.text('Loading results...');

        $.ajax({
            type: 'GET',
            url: 'nobel.json',
            dataType: 'json',

            // TODO: REFACTOR THIS
            success: function(data) {
                console.log(data); // checking the array in the console

                
                $('#result-list').html('<thead><tr><th>Category</th>' +
                                       '<th>Year</th><th>Name(s)</th>' +
                                       '<th>Motivation</th></tr></thead><tbody>');

                // Experimenting with JSPath
                // $.each(data.prizes, function(k, v) {
                //     $('#result-list').append('<tr><td>' +
                //         JSPath.apply('.prizes..firstname', data)
                //         + '</td></tr>');
                // });
                
                // Start displaying the table for results
                $('#result-list').html('<thead><tr><th>Category</th>' +
                                       '<th>Year</th><th>Name(s)</th>' +
                                       '<th>Motivation</th></tr></thead><tbody>');

                // Get all results if the query is empty
                var inputs = document.getElementsByTagName('input');
                for (var i = 0; i < inputs.length; i++) {
                    if(inputs[i].value == ""){
                        
                        $.each(data.prizes, function(k, v) {
                            var firstLevelArray = this;

                            $.each(v.laureates, function(subk, subv) {
                                console.log(subv)
                                $('#result-list').append('<tr><td>' + firstLevelArray.category +
                                    '</td><td>' + firstLevelArray.year + '</td><td>' +
                                    subv.firstname + ' ' + subv.surname +
                                    '</td><td>' + subv.motivation + '</td></tr>');
                            });
                        });
                    }
                }

                // Close the table
                $('#result-list').append('</tbody></table>');
            }
        });
    });
});