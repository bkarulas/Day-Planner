//the variable for the current day on the index page
var today = $("#currentDay");
//the variable for the event during a current hour
var timeBlockDiv = $(".time-block")

//function runs when the page is loaded or refreshed
function startSch(){
    //gets todays date
    today.text(moment().format('dddd, MMMM Do'));
    //starts the following functions
    setTextClass();
    loadLocalSaved();
}

//function to change the backround colour of the text feild depending on the time
function setTextClass(){
    //runs throough every time-block div and compairs the vaule for time with the current hour
    $.each(timeBlockDiv, function(index, value){
        //class value of the text feild
        var textClass = "";
        //if the time vaule and the current hour are equal
        if ($(value).attr('time') == moment().format('HH')){
            //the class for the text feild is set to the present class
            textClass="present";
        }
        //if the time value is less then the current hour
        else if($(value).attr('time') < moment().format('HH')){
            //the class for that text feild is set to the past class
            textClass="past";
        }
        //if the time value is more then the current hour
        else if ($(value).attr('time') > moment().format('HH')){
            //the class for that text feild is set to the future class
            textClass="future";
        }
        //the class is added to the html file
        $(value).addClass(textClass);
    });
}

//function to load what is saved localaly for each time value in the time-block div
function loadLocalSaved(){
    $.each(timeBlockDiv, function(index, value){
        $(value).find("textarea").val(localStorage.getItem($(value).attr('time')))
    });
}

//when the save button is clicked the following will be saved to local storage
$('.saveBtn').on('click',function() {
    localStorage.setItem(
        //time value associcated where the save button was pressed will be saved as the key
        $(this).parent().attr('time')
        //text area associated where the save button was pressed will be saved as the value
        ,$(this).parent().find('textarea').val());
});
    
//calls the star schedule function every time the page is loaded or refreshed
startSch();
