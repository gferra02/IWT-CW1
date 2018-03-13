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

                var path = '.prizes';

                // checking the flag changes accordingly
                // console.log(empty);

                if (empty) {
                    // 5) Second part: If no conditions are entered, all prizes
                    // and winners should be returned.
                    // Retrieving all results if all input fields are empty
                    var jsonQuery = JSPath.apply(path, data);
                    results(jsonQuery);
                }

                // If one or more input fields are not empty,
                // build the query string to retrieve the relevant data.

                // 1) The user should be able to enter a category value (e.g.
                // literature) and retrieve the corresponding prize winners.

                if (!isEmpty($('#category'))) {
                    // Getting user input, converting it to lower case to
                    // match lower and upper case
                    var userCategory = $('#category').val().toLowerCase();
                    path += '{.category == "' + userCategory + '" }'; 
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

                    if (userYearOperator == "") {
                        userYearOperator = "==";
                    }

                    path += '{.year ' + userYearOperator + ' "' + userYear + '" }';
                    console.log(path);
                }

                // path = '.prizes{.category == $userCat && .year == $userY }';

                jsonQuery = JSPath.apply(path, data);

                if (!isEmpty($('#share'))) {

                }

                if (!isEmpty($('#surname'))) {

                    // Using this to test if I can build a query string from all input fields
                    // It works, add substitution!
                    // var testJSP = JSPath.apply('.prizes{.year < "2017" && .category == "chemistry" && ..surname *= "man"}', data);

                    // $.each(testJSP, function(k, v) {
                    //     $.each(v.laureates, function(subk, subv) {
                    //         $('#result-list').append('<tr><td>' +
                    //             v.category + '</td><td>' +
                    //             v.year + '</td><td>' +
                    //             subv.firstname + '</td><td>' +
                    //             subv.surname + '</td></tr>');
                    //     });
                    // });
                }

                results(jsonQuery);

                // Close the table
                $('#result-list').append('</tbody>');

                // Function to retrieve results
                // function filteredResults(userInput, jsonObj) {
                //     $.each(data.prizes, function(k, v) {
                //         var firstLevelArray = this;

                //         if (firstLevelArray[jsonObj] === userInput) {
                //             $.each(v.laureates, function(subk, subv) {
                //                 $('#result-list').append('<tr><td>' +
                //                     firstLevelArray.category + '</td><td>' +
                //                     firstLevelArray.year + '</td><td>' +
                //                     subv.firstname + '</td><td>' + 
                //                     subv.surname + '</td></tr>');
                //             });
                //         }
                //     });
                // }

                function results(jsonQuery) {
                    var query = jsonQuery;

                    $.each(query, function(k, v) {
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