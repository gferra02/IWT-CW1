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
                $('#result-list').html('<thead><tr><th>Category</th>' +
                                       '<th>Year</th><th>Name(s)</th>' +
                                       '<th>Motivation</th></tr></thead><tbody>');


                /*
                // TODO: refine, but KEEP, it works
                // Experimenting with JSPath for filtering
                var arrayOfResults = JSPath.apply('.prizes..firstname', data);

                // console.log(arrayOfResults.length);
                // console.log(arrayOfResults[1]);

                for (i = 0; i < arrayOfResults.length; i++) {
                    console.log('test' + [i]);
                    $('#result-list').append(
                        '<tr><td>' +
                        arrayOfResults[i] +
                        '</td></tr>');
                }
                */

                // Get all results only if *every* field is empty

                var empty = true;
                var inputs = document.getElementsByTagName('input');

                // Check all input fields
                $.each(inputs, function(k, v) {
                    if (v.value != '') {
                        empty = false;
                    }
                });

                if (empty) {

                    $.each(data.prizes, function(k, v) {
                        var firstLevelArray = this;

                        $.each(v.laureates, function(subk, subv) {
                            $('#result-list').append('<tr><td>' + firstLevelArray.category +
                                '</td><td>' + firstLevelArray.year + '</td><td>' +
                                subv.firstname + ' ' + subv.surname +
                                '</td><td>' + subv.motivation + '</td></tr>');
                        });
                    });
                }

                // Close the table
                $('#result-list').append('</tbody></table>');
            }
        });
    });
});