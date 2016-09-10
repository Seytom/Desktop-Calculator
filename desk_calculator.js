//********Variables********// 
var operators = {
    '+': function(a, b) {
        return a + b
    },
    '-': function(a, b) {
        return a - b
    },
    "*": function(a, b) {
        return a * b
    },
    "/": function(a, b) {
        return a / b
    },
    "x<sup>2</sup>": function(a){
        return a*a
    }
}

var working_num = "";
var held_num = "";
var operator = "";
var display_num = "0";
var equals_flag = false;

//********Event handler for number buttons********//
$('.button.number').click(function() {
    if(equals_flag){ //Hitting a number after hitting the equals sign starts a new calculation
        held_num="";
        operator="";
        working_num="";
    }

    if(working_num.length<11) working_num += $(this).html(); //+= allows number to be punched in one digit at a time, as a string
    display_num = working_num;
    $('#display').html(display_num); //display the number as it's entered
    equals_flag=false;
});

//*****Event handler for operator buttons*******//
$(".button.operator").click(function() {

    if ($(this).html()=="x<sup>2</sup>" && display_num){
        //The squares operator comes first and is handled separately because it squares the working number in place
        working_num = operators[$(this).html()](parseFloat(display_num));
        working_num = working_num.toString();
        display_sanity();

        display_num = working_num;
        $('#display').html(display_num);
        equals_flag=false;
        return;
    }
    if (operator && held_num && working_num) {
        /*If an operator has been previously punched,
         perform the calculation on held_num and working_num */
        held_num = operators[operator](parseFloat(held_num), parseFloat(working_num));
        held_num = held_num.toString();
    }

    else if (operator && held_num){
        operator = $(this).html();
        equals_flag=false;
        return;
    }

    else {
        /* Otherwise, just store the current working_num */
        if(working_num)  held_num = working_num;
    };

    working_num = ""; //clear working_num for entry of a new number
    operator = $(this).html();

    display_sanity();

    display_num = held_num;
    $('#display').html(display_num);
    equals_flag=false;
});

//********Event handler for equals button********//
$(".button.equals").click(function() {
    if (operator && held_num && working_num) {
        held_num = operators[operator](parseFloat(held_num), parseFloat(working_num));
        held_num = held_num.toString();
        display_sanity();
        display_num = held_num;
        $('#display').html(display_num);
    }
    operator="";
    equals_flag=true;
    working_num="";
});

//********Event handler for clear buttons********//
$(".button.clear").click(function() {
    working_num = "";
    display_num=held_num;
    if ($(this).html() === 'AC') {
        held_num = "";
        display_num="0";
        operator = "";
        equals_flag=false;
    }
    $('#display').html(display_num);

});

//Miscellany
function display_sanity(){
//this function keeps the number from getting too large for the display screen
    if(parseFloat(held_num)>99999999999){
        held_num=held_num.slice(0,4);
        held_num+="... error";}

    else if(held_num.toString().length>11){
        held_num = held_num.toString();
        held_num=held_num.slice(0,12);
    }
}

$('#calculator').draggable();