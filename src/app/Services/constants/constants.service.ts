import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  jsonConstants = {};

  getConstants() {

    this.jsonConstants = {
      routesV1 : {
        urlEmail : 'api/v1/sendmail',
        urlServer : 'http://localhost:3000/',
        urlPos : 'api/v1/po'
      }
    };

    return this.jsonConstants;
  }

}
