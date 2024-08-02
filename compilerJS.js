var http = require('http');
var fs = require('fs');
var readline = require('readline-sync');
const path = require('path');

//one-file convertion
let oneFile = readline.question("One-file? (Y/n): ", "")
if(oneFile == "Y" || oneFile == "" || oneFile == "y"){
    oneFile=true;
}
else if(oneFile == "n"){
    oneFile = false;
}
else{
    console.log("Response not defined. It should be 'y', 'n' or '' for pre-defined response ('y')")
    oneFile = false;
}
if(oneFile){
    var filePath = readline.question("File path: ");
    console.log("Loading file...")
    fs.readFile(filePath, "utf-8", function(err, data){
        if(err){
            console.log(err)
        }
        console.log("File loaded")
        CreateFile(compile(data))
    });
}

//compile one file
function compile(dt){
    console.log("Compiling file...")
    let data = dt.split("\n");
    for(let line in data){
        //get line
        let dt = data[line].replaceAll(" ","");
        //fn - function
        if(dt.startsWith("fn")){
            data[line] = data[line].replace("fn ","function ")
        }
        //output - console.log
        if(dt.startsWith("output")){
            data[line] = data[line].replace("output(","console.log(")
        }
    }
    //add main function running
    data.push("main()")

    //Create compiled file
    return data;
}

function CreateFile(data){
    console.log("Exporting compiled file...")
    var writeStream = fs.createWriteStream(filePath.replaceAll(".omni",".js"));
    writeStream.write(data);
    writeStream.end();
    console.log("File created at " + filePath.replaceAll(".omni",".js"));
}