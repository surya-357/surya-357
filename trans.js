let fs = require('fs');
let frequency = {};
let filePath = './french_dictionary.csv';
// let english_words = null;
// let french_words = null;
// let french_dictionary = null;
function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = "english,french".split(',');
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}
const data = fs.readFileSync('./french_dictionary.csv',
{ encoding: 'utf8', flag: 'r' });
let shakespeareData = fs.readFileSync('./t8.shakespeare.txt',
{ encoding: 'utf8', flag: 'r' });
let french_dictionary_json = csvJSON(data)
let finalData = shakespeareData;


let getFrenchDictinary = function getFrenchDictinary() {
    console.log('dummy');
       // console.log(shakespeareData,'str');
    for (let i = 0; i < french_dictionary_json.length; i++) {
        if (french_dictionary_json[i] != undefined) {
            let count =shakespeareData.split(french_dictionary_json[i].english).length-1;
            frequency[french_dictionary_json[i].english]=count;
            let re = new RegExp('\\b'+french_dictionary_json[i].english+'\\b', 'gi');
            shakespeareData =shakespeareData.replace(re, french_dictionary_json[i].french);
            // if(frequency[french_dictionary_json[i].english])

            // console.log(french_dictionary_json[i].english,french_dictionary_json[i].french,'row')
        }
    }
    console.log(frequency,'frequency');
    fs.writeFileSync("./t8.shakespeare2.txt",shakespeareData);
    console.log("File written successfully\n");
    console.log("The written has the following contents:");

}
let min=0;
let sec=0;
let mem=0;
let perfomance =`Time to process: ${min} minutes ${sec} seconds Memory used: ${mem} MB`;
let createPerfomanceFile=function createPerfomanceFile() {
    let data = `The first line should have the time taken for the script to complete and the second line should have the memory used by your script.`;
let start =new Date().getTime();
for (let i = 0; i < french_dictionary_json.length; i++) {
    if (french_dictionary_json[i] != undefined) {

        let re = new RegExp('\\b'+french_dictionary_json[i].english+'\\b', 'gi');
        data =data.replace(re, french_dictionary_json[i].french);
    }
}
let end =new Date().getTime();

let used =process.memoryUsage().heapUsed/1024/1024;
console.log(end-start,'time',Math.round(used*100)/100,'memory');
mem=Math.round(used*100)/100;
min=Math.floor(end-start/60000);
sec=(((end-start)%60000)/1000).toFixed(0);
perfomance=`Time to process: ${min} minutes ${sec} seconds Memory used: ${mem} MB`;
data=`${data}

${perfomance}
`;
fs.writeFileSync("./performance.txt",data);

    
}

getFrenchDictinary();
createPerfomanceFile();
