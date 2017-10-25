import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  // todo JSON?
  // jsonConstants = {};

  /*getConstants() {

    this.jsonConstants = {
      routesV1 : {
        urlEmail : 'api/v1/sendmail',
        urlServer : 'http://localhost:3000/',
        urlPos : 'api/v1/po'
      }
    };

    return ;
  }*/

  urlServer: string;
  urlEmail: string;
  urlEmailTo: string;
  urlPos: string;

  constructor() {
    this.urlServer = 'http://localhost:3000';
    this.urlEmail = '/api/v1/sendmail';
    this.urlEmailTo = 'name=anastasios.markos@cosmo-one.gr';
    this.urlPos = '/api/v1/po';
  }

}
