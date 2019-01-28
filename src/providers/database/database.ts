// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var PouchDB;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  db;
  constructor() {
    console.log('Hello DatabaseProvider Provider');
  }

  createDatabase() {
    this.db = new PouchDB('db', { skip_setup: true });
    return this.db.info();
  }


  // postData(){
  //   this.db.post({
  //     title: 'Ziggy Stardust'
  //   }).then(function (response) {
  //     // handle response
  //     console.log(response);
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  
  // }
  insertUser(user) {
   return this.db.post( {
      name: user.name,
      gender: user.gender,
      type: 'user'
    });
  }
  insertEntry(entry) {
    return this.db.post( {
       emotion: entry.emotion,
       activities: entry.activities,
       note: entry.note || '',
       date: new Date().getTime(),
       type: 'entry'
     });
   }
   deleteEntry(docId, docRev) {
     return this.db.remove(docId, docRev);
   }
  getAllDocs(){
    return this.db.allDocs({include_docs: true, attachments: true})
  }

}
