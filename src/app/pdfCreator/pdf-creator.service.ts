import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// socketio
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';

@Injectable()
export class PdfCreatorService {

  //constructor() { }

  constructor(private http: Http) { }

  createPdfType1(pdfData)
  {

    var pdfJson = {
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
        //alert(JSON.stringify(arrayItem));
        pdfJson.content[0].table.body.push([arrayItem.id, arrayItem.name, arrayItem.podesc, arrayItem.ponum]);
    });
  
    
    return pdfJson;
  }

}
