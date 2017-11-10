import { Injectable } from '@angular/core';

@Injectable()
export class PdfCreatorService {

  constructor() { }

  createPdfType1(pdfData) {

    const pdfJson = {
      content:
      [
        {
          table :
          {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body:
            [
              [ 'id', 'name', 'podesc', 'ponum' ]
            ]
          }
        }
      ]
    };

    pdfData.forEach( function (arrayItem)
    {
        pdfJson.content[0].table.body.push([arrayItem.id, arrayItem.name, arrayItem.podesc, arrayItem.ponum]);
    });

    return pdfJson;
  }

}
