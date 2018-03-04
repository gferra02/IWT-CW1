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
                
                $('#result-list').html('<thead><tr><th>Category</th>' +
                                       '<th>Year</th><th>Name(s)</th>' +
                                       '<th>Motivation</th></tr></thead><tbody>');
                
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

                $('#result-list').append('</tbody></table>');
            }
        });
    });
});