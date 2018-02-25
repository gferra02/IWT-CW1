# IWT-CW1
Internet and Web Technologies Coursework 1

The purpose of this coursework is to help you learn about using Javascript to process JSON documents. The coursework will be assessed and counts 10% of the final mark for this module.

## The task

The JSON document you will be working with is [nobel.json](http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/coursework/nobel.json), which is a JSON representation of information about the winners of the Nobel prize. Each entry in the `prizes` array consists of a `year`, a `category`, and an array of `laureates` (winners). Each entry in a `laureates` array has a `firstname`, `surname` and a `share` (the number of people sharing the prize), among other information.

The product of the coursework should be an HTML page which a user can use to query information about Nobel prize winners. In other words, the HTML page should read the file and provide an interface through which the user can query the data. You should use JavaScript and HTML forms to implement your solution, which should work with _both_ Firefox _and_ Chrome. The techniques you need to use are discussed in the [Client-side processing](http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/client.html) part of the course. You can use the [jQuery](http://jquery.com/) library in your solution if you wish. You can also use a library such as [JSPath](https://github.com/dfilatov/jspath) to filter the data based on user input. Here are the latest versions of the jQuery and JSPath libraries: <a href="http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/coursework/jquery-3.3.1.min.js">jquery-3.3.1.min.js</a> and <a href="http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/coursework/jspath.js">jspath.js</a> (right-click and save-as). Extra information is given <a href="#hints">below</a>.

Create a web page which will allow a user to query the data as follows:

1. The user should be able to enter a category value (e.g. literature) and retrieve the corresponding prize winners.
2. The user should be able to enter a year value (e.g. 1991) as well as an operator (<, = or >) and retrieve the prize winners for the years specified.
3. The user should be able to enter a share value (e.g. 2) as well as an operator (<, = or >) and retrieve the prize winners who shared the prize among the number of people specified by the condition.
4. The user should be able to enter part of a surname value (e.g. Curie) and retrieve the corresponding prize winners.
5. The user should be able to enter conditions for any combination of the properties mentioned above. If no conditions are entered, all prizes and winners should be returned.

You will need to use a form on the page you create. The form will contain text boxes for user input, possibly drop-down lists for operator selection, and a button to retrieve the corresponding results. A fancy interface is not expected. You can separate the input region from the output region on the page by using a div element to hold the output. The output should comprise an HTML table, with column headers Year, Category, First name and Surname. The idea is that you should use JavaScript (and the JSON file) to output the rows of prize winners that satisfy the user's query.

I would recommend developing your solution in stages. This is particularly important since debugging Javascript can be very time-consuming and frustrating. All browsers provide a "developer console" or something similar which you can use to view error messages, set breakpoints allowing you to view the values of variables, and so on. Frequent use of `console.log` in your code to output values of variables etc. helps.

## Handing in the coursework

The deadline for submission is _**6pm on Tuesday 20th March 2018**_. Please submit the coursework via Moodle as _**a single zip file**_ containing a single HTML file and any Javascript files used (including library files you referenced locally), so that no extra files are needed (unless they are on the web) to test your solution. You should not submit any instructions or explanations in a separate file. Instead, the interface should be self explanatory and the code should be commented appropriately.

Remember that plagiarism is taken very seriously by the Department and the College (see the relevant section in your programme booklet). Consequently, **you are required to state the following in your HTML submission (either as a comment, or visible on the displayed page): _I confirm that this coursework submission is entirely my own work, except where explicitly stated otherwise._** (Of course, you are welcome to reuse code presented during lectures.) Your submission may be submitted to an online plagiarism detection service. The College's disciplinary procedure will be invoked in any cases of suspected plagiarism.

The College policy with regard to late submission of coursework is described in the MSc/MRes programme booklet. No extensions will be granted. The cut-off date for submissions is _6pm on Tuesday 27th March 2018_. Submissions after this date will not be marked. Those submitted after 6pm on the 20th and before 6pm on the 27th March, where mitigating circumstances are not accepted, will receive a maximum mark of 50%.

## Marking guide

Your program should be properly structured and should include comments and some simple error checking. The user interface does not need to be elaborate, but it should be clear to the user how to use it.

Marks will be awarded out of 20. The areas in which marks will be awarded and the maximum mark possible in each case are as follows:

| Criteria                           | Marks |
|:-----------------------------------|:-----:|
| friendliness of the user interface |   2   |
| code structure and documentation   |   2   |
| error handling in the code         |   2   |
| part 1                             |   2   |
| part 2                             |   3   |
| part 3                             |   3   |
| part 4                             |   4   |
| part 5                             |   2   |

Full marks for the first 3 items above will not be awarded if only a partial solution is provided for the others.

Comments on your coursework, along with the mark you were awarded, should be returned to you within 4 weeks of the cut-off date.

<a id ="hints"></a>
## Hints and useful information

If you use the XMLHttpRequest object to retrieve the JSON file (as used on slides <a href="http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/client.html#(23)">23</a> and <a href="http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/client.html#(24)">24</a>), you should note that Firefox and Chrome have different requirements. Both work fine if you perform the retrieval over the Internet, e.g. if your HTML and XML files are in your DCS web space and you load the HTML file over the web. Firefox (and Safari) will also work if you load the file _locally_, i.e. you change to your web space folder and load the file by double-clicking on it. Chrome will return an error if you try to do this.

Some features of JavaScript which you might find useful are given below (depending on the approach you take, some of the following may not be relevant):

* to reserve an area for output, you can have a part of your document identified for example as follows
    ```
    <div id="resultArea">
    </div>
    ```

    and then use the innerHTML property to insert HTML into it

* to test whether two values are equal, use `===`; to test whether _both_ of a pair of conditions is true, use `&&`; to test whether either of a pair of conditions is true, use `||`

* to concatenate two strings together, use the `+` operator; so if `str1` contains `"Hello"` and `str2` contains `"world"`, then `str1 + str2` will produce `"Helloworld"`

* to test whether a string contains a given substring, you can use the `indexOf(.)` method of Javascript. For example, `myString.indexOf(mySubstring)` returns the starting index where `mySubstring` occurs in `myString` (starting from index 0), or returns -1 if `mySubstring` does not occur in `myString`.

The links on the <a href="http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/client.html#(34)">Links to more information page</a> might also be useful.
