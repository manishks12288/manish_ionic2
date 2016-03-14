/* global http */
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BlogData {
    http;
    data;
    limit;
    limitstart;
    url;
    callingurl;
  constructor(http:Http) {
    this.http = http;
    this.data = null;
    this.limit=5;
    this.limitstart=0;
    this.url="http://demo.appcarvers.com/junite/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key=c2ecb0c473849018bf97b67302f42caebc08ee1e&user_id=";
  }

  load(limitst) {
      this.callingurl = this.url + '&limit='+this.limit+'&limitstart='+limitst;
    // if (this.data && this.limitstart > 0 && this.limitstart == limitst) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(this.callingurl)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

