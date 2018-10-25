const experss = require('express');
const app = experss();
const bodyParser = require('body-parser');
const XmlReader = require('xml-reader');
const reader = XmlReader.create();
var parser = require('xml2json');
const format = require('xml-formatter');

const fs = require('fs')
const xmlParser = require('xml2json');

const path = require('path');

app.get("/index", (request, response) => {
    response.sendFile(path.join(__dirname + "/index.html"));
});
;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.get('/xml', (req, res) => {


    let xml = ""
    fs.readFile('./xmlFiles/sitemap.aspx.xml', "utf8", (err, data) => {

        if (err) {
            console.log(err)
        } else {
            xml = data
        }
        reader.on('done', (data) => {
            res.send(xmlParser.toJson(xml))
            console.log(xmlParser.toJson(xml))
        });
        reader.parse(xml)
    })
});


// const xml2 =
//     `<?xml version="1.0" encoding="UTF-8"?>
//     <TestScenario>
//        <TestSuite name="TS_EdgeHome">
//           <TestCaseName name="tc_Login">dt_EdgeCaseHome,dt_EdgeCaseRoute</TestCaseName>
//           <TestCaseName name="tc_Logout">dt_EdgeCaseRoute</TestCaseName>
//        </TestSuite>
//        <TestSuite name="TS_EdgePanel">
//           <TestCaseName name="tc_AddContract">dt_EdgeCaseHome,dt_EdgeCaseSpectrum</TestCaseName>
//        </TestSuite>
//           <TestSuite name="TS_EdgeRoute">
//           <TestCaseName name="tc_VerifyContract">dt_EdgeCaseRoute</TestCaseName>
//           <TestCaseName name="tc_Payment">dt_EdgeCaseRoute</TestCaseName>
//        </TestSuite>
//        <TestSuite name="TS_EdgeSpectrum">
//           <TestCaseName name="tc_ClientFeedback">dt_EdgeCaseSpectrum</TestCaseName>
//        </TestSuite>
//     </TestScenario>`;




app.listen(3000, function () {
    console.log("app listens to port 3000");
});


