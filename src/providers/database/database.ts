import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var PouchDB;
import { BehaviorSubject } from 'rxjs';
import { Journal } from '../../model/journal';
import { ModalController } from 'ionic-angular';
import { Entry } from '../../model/entry';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  db;
  entriesSource = new BehaviorSubject([]);
  entries = this.entriesSource.asObservable();
  journalsSource = new BehaviorSubject([]);
  journals = this.journalsSource.asObservable();
  userSource = new BehaviorSubject({});
  user = this.userSource.asObservable();
  selectedEmotion: String;
  advicesSource = new BehaviorSubject({});
  advices = this.advicesSource.asObservable();
  motivationsSource = new BehaviorSubject({});
  motivations = this.motivationsSource.asObservable();
  strecthMusclesSource = new BehaviorSubject({});
  strecthMuscles = this.strecthMusclesSource.asObservable();
  relaxSource = new BehaviorSubject({});
  relax = this.relaxSource.asObservable();
  videosSource = new BehaviorSubject({});
  videos = this.videosSource.asObservable();
  musicsSource = new BehaviorSubject({});
  musics = this.musicsSource.asObservable();
  currentEntry: Entry;
  currentEntryId: String;
  constructor(public http: HttpClient, public modal: ModalController) {
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
    const newEntry = {
      emotion: entry.emotion,
      activities: entry.activities,
      note: entry.note || '',
      date: new Date().getTime(),
      logs: [],
      type: 'entry'
    };
    this.currentEntry = newEntry;
    return this.db.post( newEntry );
   }
   deleteEntry(docId, docRev) {
     return this.db.remove(docId, docRev);
   }
  async insertEntryLogs(log) {
    const entry = await this.db.get(this.currentEntryId);
    entry.logs.push({
      activity: log,
      date: new Date().getTime()
    });
    return this.db.put({
      _id: this.currentEntryId,
      _rev: entry._rev,
      emotion: entry.emotion,
      activities: entry.activities,
      note: entry.note || '',
      date: entry.date,
      logs: entry.logs,
      type: 'entry'
    });
   }
  getAllDocs() {
    return this.db.allDocs({include_docs: true, attachments: true})
  }
  insertJournal(journal: Journal) {
    return this.db.post( {
      title: journal.title,
      content: journal.content,
      date: new Date().getTime(),
      type: 'journal'
    });
  }
  updateJournal(journal: Journal) {
    return this.db.put({
      _id: journal._id,
      _rev: journal._rev,
      title: journal.title,
      content: journal.content,
      type: 'journal',
      date: journal.date
    });
  }
  deleteJournal(docId, docRev) {
    return this.db.remove(docId, docRev);
  }
  createJournalPassword(user) {
    return this.db.put({
      _id: user._id,
      _rev: user._rev,
      name: user.name,
      gender: user.gender,
      type: 'user',
      password: user.password
      
    })
  }
  getAllAdvices() {
    return this.http.get('assets/json/advices.json');
  }
  getAllMotivations(){
    return this.http.get('assets/json/motivateyourself.json');
  }
  getAllStrechMuscles(){
    return this.http.get('assets/json/stretchyourmuscles.json');
  }
  getAllRelax(){
    return this.http.get('assets/json/relax.json');
  }
  getAllVideos(){
    return this.http.get('assets/json/videos.json');
  }
  getAllMusics(){
    return this.http.get('assets/json/musics.json');
  }

  createModal(page, params?) {
    return this.modal.create(page, params);
  }
  refreshJournal(){
    this.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
     const journals = rows.filter(row => row.doc.type === 'journal');
      this.journalsSource.next(journals);
    })
  }
  refreshEntries() {
    this.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
     const entries = rows.filter(row => row.doc.type === 'entry').reverse();
     this.entriesSource.next(entries);
    })  
    }
  }