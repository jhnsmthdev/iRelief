import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public database: DatabaseProvider) {

    this.database.getAllDocs().then(res => {
      const rows: Array<any> = res.rows;
      this.database.userSource.next( rows.filter(row => row.doc.type === 'user')[0].doc);
    })  
    
    this.database.getAllAdvices().subscribe( res => {
      this.database.advicesSource.next(res);
    } )
    this.database.getAllMotivations().subscribe( res => {
      this.database.motivationsSource.next(res);
    })
    this.database.getAllStrechMuscles().subscribe( res => {
      this.database.strecthMusclesSource.next(res);
    })
    this.database.getAllRelax().subscribe( res => {
      this.database.relaxSource.next(res);
    })
    this.database.getAllVideos().subscribe( res => {
      this.database.videosSource.next(res);
    })
    this.database.getAllMusics().subscribe( res => {
      console.log(res, 'musics')
      this.database.musicsSource.next(res);
    })
  }
}
