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
                                       '<th>Year</th><th>Firstname(s)</th>' +
                                       '<th>Surname(s)</th></tr></thead><tbody>');

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
                    if (!isEmpty(v)) {
                        empty = false;
                    }
                });

                // checking the flag changes accordingly
                // console.log(empty);

                // Finally retrieving all results if all input fields are empty
                if (empty) {

                    $.each(data.prizes, function(k, v) {
                        var firstLevelArray = this;

                        $.each(v.laureates, function(subk, subv) {
                            $('#result-list').append('<tr><td>' +
                                firstLevelArray.category + '</td><td>' +
                                firstLevelArray.year + '</td><td>' +
                                subv.firstname + '</td><td>' + 
                                subv.surname + '</td></tr>');
                        });
                    });
                } else {
                    // 1) The user should be able to enter a category value (e.g.
                    // literature) and retrieve the corresponding prize winners.

                    if (!isEmpty($('#category'))) {
                        // Getting user input, converting it to lower case to
                        // match lower and upper case
                        var userCategory = $('#category').val().toLowerCase();

                        filteredResults(userCategory, 'category');
                    }

                    // 2) The user should be able to enter a year value (e.g.
                    // 1991) as well as an operator (<, = or >) and retrieve the
                    // prize winners for the years specified.
                    if (!isEmpty($('#year'))) {
                        // Getting user input.
                        // Won't check for range nor type, since already doing it
                        // in the html form
                        var userYear = $('#year').val();

                        var userYearOperator = $('select#year-range option:selected').val();

                        if (userYearOperator === '' || userYearOperator === '=') {
                            filteredResults(userYear, 'year');
                        } 
                        // else if (firstLevelArray.year > userYear &&
                        //         userYearOperator === ">") {
                        //         $.each(v.laureates, function(subk, subv) {
                        //             $('#result-list').append('<tr><td>' +
                        //                 firstLevelArray.category + '</td><td>' +
                        //                 firstLevelArray.year + '</td><td>' +
                        //                 subv.firstname + '</td><td>' +
                        //                 subv.surname + '</td></tr>');
                        //         });
                        //     }
                    }

                    if (!isEmpty($('#share'))) {

                    }

                    if (!isEmpty($('#surname'))) {

                        // Using this to test if I can build a query string from all input fields
                        // It works, add substitution!
                        var testJSP = JSPath.apply('.prizes{.year < "2017" && .category == "chemistry" && ..firstname *= "otto"}', data);

                        $.each(testJSP, function(k, v) {
                            $.each(v.laureates, function(subk, subv) {
                                $('#result-list').append('<tr><td>' +
                                    v.category + '</td><td>' +
                                    v.year + '</td><td>' +
                                    subv.firstname + '</td><td>' +
                                    subv.surname + '</td></tr>');
                            });
                        });
                    }
                }

                // Close the table
                $('#result-list').append('</tbody>');

                // Function to retrieve results
                function filteredResults(userInput, jsonObj) {
                    $.each(data.prizes, function(k, v) {
                        var firstLevelArray = this;

                        if (firstLevelArray[jsonObj] === userInput) {
                            $.each(v.laureates, function(subk, subv) {
                                $('#result-list').append('<tr><td>' +
                                    firstLevelArray.category + '</td><td>' +
                                    firstLevelArray.year + '</td><td>' +
                                    subv.firstname + '</td><td>' + 
                                    subv.surname + '</td></tr>');
                            });
                        }
                    });
                }
            }
        });
    });

    // Basic function to check for empty value in fields
    function isEmpty(obj) {
        if (obj.value == '') {
            return true;
        }

        return false;
    }
});