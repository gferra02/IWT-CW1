// Remember to check for case sensitive/insensitive
// https://github.com/dfilatov/jspath#string-comparison-operators

$(document).ready(function() {

    $('#trigger-results').click(function() {
        var jsonFile = $('#result-list');
        jsonFile.text('Loading...');

        $.ajax({
            type: 'GET',
            url: 'nobel.json',
            dataType: 'json',
            // crossDomain: 'true',
            // isLocal: 'true',

            // TODO: REFACTOR THIS
            success: function(data) {
                console.log(data);
                
                $('#result-list').html('<thead><tr><th>Category</th><th>Year</th><th>Name(s)</th><th>Motivation</th></tr></thead><tbody>');
                
                $.each(data.prizes, function(k, v) {
                    var firstLevelArray = this;
                    // $('#result-list').append('<tr><td>' + v.category + '</td><td>' + v.year+ '</td><td><ul class="names">');

                    // this groups the category, rather than outputting the details for that record
                    $.each(v.laureates, function(subk, subv) {
                        console.log(subv)
                        $('#result-list').append('<tr><td>' + firstLevelArray.category + '</td><td>' +
                        firstLevelArray.year + '</td><td>' + subv.firstname + ' ' + subv.surname +
                        '</td><td>' + subv.motivation + '</td></tr>');
                    });

                    // $('result-list').append('</ul></td></tr>');
                });

                $('#result-list').append('</tbody></table>');
            }
        });
    });

    var result='{"rates":[{"meter":"30","rate":"0.15060","ppd":"10.000"}]}';
    console.log(result);
    $.each($.parseJSON(result), function (item, value) {
        if (item == "rates") {
            $.each(value, function (i, object) {
                $.each(object, function (subI, subObject) {
                    console.log(subI + "=" + subObject);
                });
            });

        }
    });
});