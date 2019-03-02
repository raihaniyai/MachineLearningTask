const csv=require('csvtojson')
const path = require('path');
const fs = require('fs');
const stringify = require('csv-stringify');
const trainSetFile = path.join(__dirname, '/TrainsetTugas1ML');
const testSetFile = path.join(__dirname, '/TestsetTugas1ML');

function main(trainSet, testSet){
  up = trainSet.filter(function(x) {return x.income == '>50K';}).length
  don = trainSet.filter(function(x) {return x.income == '<=50K';}).length
  upper = up / trainSet.length
  under = don / trainSet.length
  result = []

  for (var data in testSet) {
    pAge1 = trainSet.filter(function(x) {return x.income == '>50K' && x.age == testSet[data].age;}).length / up
    pAge2 = trainSet.filter(function(x) {return x.income == '<=50K' && x.age == testSet[data].age;}).length / don
    pWorkclass1 = trainSet.filter(function(x) {return x.income == '>50K' && x.workclass == testSet[data].workclass;}).length / up
    pWorkclass2 = trainSet.filter(function(x) {return x.income == '<=50K' && x.workclass == testSet[data].workclass;}).length / don
    pEducation1 = trainSet.filter(function(x) {return x.income == '>50K' && x.education == testSet[data].education;}).length / up
    pEducation2 = trainSet.filter(function(x) {return x.income == '<=50K' && x.education == testSet[data].education;}).length / don
    pMarital1 = trainSet.filter(function(x) {return x.income == '>50K' && x['marital-status'] == testSet[data]['marital-status'];}).length / up
    pMarital2 = trainSet.filter(function(x) {return x.income == '<=50K' && x['marital-status'] == testSet[data]['marital-status'];}).length / don
    pOccupation1 = trainSet.filter(function(x) {return x.income == '>50K' && x.occupation == testSet[data].occupation;}).length / up
    pOccupation2 = trainSet.filter(function(x) {return x.income == '<=50K' && x.occupation == testSet[data].occupation;}).length / don
    pRelation1 = trainSet.filter(function(x) {return x.income == '>50K' && x.relationship == testSet[data].relationship;}).length / up
    pRelation2 = trainSet.filter(function(x) {return x.income == '<=50K' && x.relationship == testSet[data].relationship;}).length / don
    pTime1 = trainSet.filter(function(x) {return x.income == '>50K' && x['hours-per-week'] == testSet[data]['hours-per-week'];}).length / up
    pTime2 = trainSet.filter(function(x) {return x.income == '<=50K' && x['hours-per-week'] == testSet[data]['hours-per-week'];}).length / don

    p1 = pAge1 * pWorkclass1 * pEducation1 * pMarital1 * pOccupation1 * pRelation1 * pTime1 * upper
    p2 = pAge2 * pWorkclass2 * pEducation2 * pMarital2 * pOccupation2 * pRelation2 * pTime2 * under
    // console.log(p1 + " - " + p2)

    if (p1 > p2) result.push(['>50K'])
    else result.push(['<=50K'])
  }

  stringify(result, function(err, output) {
    fs.writeFile('TebakanTugas1ML.csv', output, 'utf8', function(err) {
      if (err) console.log('Some error occured - file either not saved or corrupted file saved.');
      else console.log('File TebakanTugas1ML.csv berhasil disimpan kak :D');
    });
  });
}

csv().fromFile(trainSetFile).then((trainSet)=>{
  csv().fromFile(testSetFile).then((testSet)=>{
    main(trainSet, testSet)
  })
})
