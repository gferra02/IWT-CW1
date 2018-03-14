// Remember to check for case sensitive/insensitive
// https://github.com/dfilatov/jspath#string-comparison-operators

$(document).ready(function() {

    $('#trigger-results').click(function() {
        var results = $('#result-list');
        results.text('Loading results...');

        // Smooth scroll to results once hitting the 'Search' button
        $('html, body').animate({
            scrollTop: $("#results").offset().top
        }, 500);

        $.ajax({
            type: 'GET',
            url: 'nobel.json',
            dataType: 'json',

            // TODO: REFACTOR THIS
            success: function(data) {

                // I was using this to debug in the browser
                window.data = data;                
                
                $('#result-list').html('<thead><tr><th>Category</th>' +
                                       '<th>Year</th><th>ID</th><th>Firstname</th>' +
                                       '<th>Surname</th><th>Share</th>' +
                                       '</tr></thead><tbody>');

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

                // Setting up for building the query string with JSPath library
                var path = '.prizes';
                var subpath = '..laureates';

                // 5)
                if (empty) {
                    // var jsonQuery = JSPath.apply(path, data);
                    results();
                }

                // If one or more input fields are not empty,
                // build the query string to retrieve the relevant data.

                // 1)
                if (!isEmpty($('#category').val())) {
                    // Getting user input, converting it to lower case to
                    // match lower and upper case
                    var userCategory = $('#category').val().toLowerCase();
                    path += '{.category == "' + userCategory + '"}'; 
                }

                // 2)
                if (!isEmpty($('#year').val())) {
                    // Getting user input.
                    // Won't check for range nor type, since already doing it
                    // in the html form
                    var userYear = $('#year').val();

                    var userYearOperator = $('select#year-range option:selected').val();

                    // Defaulting to === if none selected.
                    if (userYearOperator == "") {
                        userYearOperator = "==";
                    }

                    path += '{.year ' + userYearOperator + ' "' + userYear + '"}';
                }

                // 3)
                if (!isEmpty($('#share').val())) {
                    // Getting user input.
                    // Won't check for range nor type, since already doing it
                    // in the html form
                    var userShare = $('#share').val();

                    var userShareOperator = $('select#share-range option:selected').val();

                    // Defaulting to === if none selected.
                    if (userShareOperator == "") {
                        userShareOperator = "==";
                    }

                    subpath += '{.share ' + userShareOperator + ' "' + userShare + '"}';
                }

                // 4)
                if (!isEmpty($('#surname').val())) {
                    var userSurname = $('#surname').val();

                    // Using *= operator to find partial matches
                    subpath += '{.surname *= "' + userSurname + '"}';
                }

                results();

                console.log(results());

                // $.each(JSPath.apply(path, data), function(i, prize) {
                //     $.each(JSPath.apply(subpath, prize), function(j, laureate) {
                //         $('#result-list').append('<tr><td>' +
                //            prize.category + '</td><td>' +
                //            prize.year + '</td><td>' +

                //            laureate.id + '</td><td>' +
                //            laureate.firstname + '</td><td>' +
                //            laureate.surname + '</td><td>' +
                //            laureate.share + '</td></tr>'
                //         );
                //     });
                // });

                // TODO
                // 1. Add general 'no match found' for no results in combination
                // or with text inserted that doesn't match anything.

                // Close the table
                $('#result-list').append('</tbody>');

                function results() {
                    // $.each(jsonQuery, function(k, v) {
                    //     $.each(v.laureates, function(subk, subv) {
                    //         $('#result-list').append('<tr><td>' +
                    //             v.category + '</td><td>' +
                    //             v.year + '</td><td>' +

                    //             subv.id + '</td><td>' +
                    //             subv.firstname + '</td><td>' +
                    //             subv.surname + '</td><td>' +
                    //             subv.share + '</td></tr>'
                    //         );
                    //     });
                    // });
                    $.each(JSPath.apply(path, data), function(i, prize) {
                        $.each(JSPath.apply(subpath, prize), function(j, laureate) {
                            $('#result-list').append('<tr><td>' +
                               prize.category + '</td><td>' +
                               prize.year + '</td><td>' +

                               laureate.id + '</td><td>' +
                               laureate.firstname + '</td><td>' +
                               laureate.surname + '</td><td>' +
                               laureate.share + '</td></tr>'
                            );
                        });
                    });
                }
            }
        });
    });

    // Basic function to check for empty value in fields
    function isEmpty(obj) {
        if (obj == '') {
            return true;
        }

        return false;
    }
});

