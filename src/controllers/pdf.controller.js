// var PdfPrinter = require('pdfmake');
const path = require('path');
var fonts = {
    Roboto: {
        normal: path.resolve('src/public') + '/assets/fonts/roboto/Roboto-Regular.ttf',
        bold: path.resolve('src/public') + '/assets/fonts/roboto/Roboto-Medium.ttf',
        italics: path.resolve('src/public') + '/assets/fonts/roboto/Roboto-Italic.ttf',
        bolditalics: path.resolve('src/public') + '/assets/fonts/roboto/Roboto-MediumItalic.ttf',
    }
};


var fs = require('fs');
class PdfController {

    async downloadPdf(req, res) {
        var printer = new PdfPrinter(fonts);
        var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id semper massa, nec dapibus mauris. Mauris in mattis nibh. Aenean feugiat volutpat aliquam. Donec sed tellus feugiat, dignissim lectus id, eleifend tortor. Ut at mauris vel dui euismod accumsan. Cras sodales, ante sit amet varius dapibus, dolor neque finibus justo, vel ornare arcu dolor vitae tellus. Aenean faucibus egestas urna in interdum. Mauris convallis dolor a condimentum sagittis. Suspendisse non laoreet nisl. Curabitur sed pharetra ipsum. Curabitur aliquet purus vitae pharetra tincidunt. Cras aliquam tempor justo sit amet euismod. Praesent risus magna, lobortis eget dictum sit amet, tristique vel enim. Duis aliquet, urna maximus sollicitudin lobortis, mi nunc dignissim ligula, et lacinia magna leo non sem.';
        var docDefinition = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
        };
        // var doc = printer.createPdfKitDocument(docDefinition);
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
        pdfDoc.end();
        res.send({
            success: true,
            message: "Success"
        })
        // var chunks = [];
        // var result;
        // doc.on('data', function (chunk) {
        //     chunks.push(chunk);
        // });
        // doc.on('end', function () {
        //     result = Buffer.concat(chunks);
        //     callback('data:application/pdf;base64,' + result.toString('base64'));
        // });
        // doc.end();
        // res.send(result)
        // var docDefinition = {
        //     // ...
        // };

        // var options = {
        //     // ...
        // }
        // var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        // pdfDoc.pipe(fs.createWriteStream('document.pdf'));
        // pdfDoc.end();
    }

}

module.exports = new PdfController()