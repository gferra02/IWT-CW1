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

                // Get all results only if *every* input field is empty
                // Setting empty to true since initially all fields will be blank
                var empty = true;
                var inputs = document.getElementsByTagName('input');

                // Check all input fields and setting the empty flag to false if
                // any input field is not empty
                $.each(inputs, function(k, v) {
                    if (v.value != '') {
                        empty = false;
                    }
                });

                // Finally retrieving all results if all input fields are empty
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
                } else {
                    // 1) The user should be able to enter a category value (e.g.
                    // literature) and retrieve the corresponding prize winners.

                    if (!isEmpty($('#category'))) {
                        console.log($('#category').val());

                        var userInput = $('#category').val();
                        var arrayOfCategories = JSPath.apply('.prizes.category', data);

                        for (i = 0; i < arrayOfCategories.length; i++) {
                            if (userInput === arrayOfCategories[i]) {
                                // List all winners in that category
                                var path = '.prizes{.category == $userInput}.year';

                                var arrayOfWinners = JSPath.apply(path, data, { category: userInput });

                                $('#result-list').append(
                                    '<tr><td>' + arrayOfCategories[i] +
                                    '</td><td>' + arrayOfWinners[0] +
                                    '</td><td>' + arrayOfWinners + '</td><td>' + 
                                    '</td></tr>');
                            }
                        }
                    }
                }

                // Close the table
                $('#result-list').append('</tbody></table>');
            }
        });
    });

    function isEmpty(obj) {
        if(obj.value != '') {
            return false;
        }

        return true;
    }
});