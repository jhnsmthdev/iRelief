import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the StopWatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stop-watch',
  templateUrl: 'stop-watch.html',
})
export class StopWatchPage {
  cnv;
  h;
  m;
  s;
  ctx;
  status;
  fontType;
  time;
  dTime;
  duration;
  fontSize;
  font;
  r;
  btnLeft: String = "START";
  btnRight: String = "DONE";
  isStart: Boolean;
  isPause: Boolean;
  timeOnString: String;
  title: String = '';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public view: ViewController) {
    this.title = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopWatchPage');
    this.cnv = document.getElementById("chrono"); // canvas
    this.h = document.getElementById("hour");
    this.m = document.getElementById("minute");
    this.s = document.getElementById("second");
    //taille du canvas égal au dimension de l'écran
    this.cnv.width =  document.getElementsByClassName('canvas-container')[0].clientWidth; 
    this.cnv.height =  document.getElementsByClassName('canvas-container')[0].clientHeight;
    this.ctx = this.cnv.getContext("2d");
    //initialisation de variable
    this.status = 'w'; // this.status : w = waiting ; p = pause ; this.s = stop ; this.r = run 
    this.fontType = "Arial"
    this.time = this.dTime = 0;
    this.duration = 60000;

    let x = this.cnv.width/2;
    let y = this.cnv.height/2;
    this.r = Math.min(this.cnv.width,this.cnv.height)/2; // rayon = la plus petite dimension de l'écran
    let e = this.r/8; //epaisseur du contour du cercle en fonction du rayon
    this.r = this.r - e; // on enlève l'épaisseur du trait pour ne pas dépasser la taille du canvas
    this.fontSize = this.computeFontSize("00:00:00", this.fontType); //adapter le texte du chrono au rayon du cercle
    this.font = this.fontSize + "px " + this.fontType;
    // this.h.addEventListener("change", this.computeDuration);
    // this.m.addEventListener("change", this.computeDuration);
    // this.s.addEventListener("change", this.computeDuration);
    this.init();
  }

 computeDuration() {
    let d = 0;
    if (this.h && this.m && this.s) {
      this.duration = this.h.value*3600000+this.m.value*60000+this.s.value*1000;
    }
  }
 computeFontSize(text,fontface){
     let maxWidth = this.r*2 * 0.8;   
      this.fontSize=300;
      do{
          this.fontSize--;
          this.ctx.font=this.fontSize+"px "+fontface;
      }while(this.ctx.measureText(text).width>maxWidth)
      return this.fontSize;
  }
  /*
  *
  * fonctions de formattage
  *
  */
 formatTime (time) {
     let tmp = Math.floor(time/ 1000);
     let second: any = tmp % 60
      if (second < 10) {second = '0' + second};
      tmp = Math.floor(tmp / 60);
     let minute: any = tmp % 60;
      if (minute < 10) {minute = '0' + minute};
      tmp = Math.floor(tmp / 60);
     let hour: any = tmp;
      if (hour < 10) {hour = '0' + hour}; 
      this.timeOnString = hour + ':' + minute + ':' + second;
      return hour + ':' + minute + ':' + second;
  }
  /*
  *
  * fonctions création d'objet
  *
  */
 createCircle() {
    // return {
    //   centerX: this.cnv.width/2,
    //   centerY: this.cnv.height/2,
    //   radius: Math.min(this.cnv.width,this.cnv.height)/2-(Math.min(this.cnv.width,this.cnv.height)/2)/8,
    //   startAngle: 1.5 * Math.PI,
    //   endAngle: 3.5 * Math.PI,
    //   lineWidth: (Math.min(this.cnv.width,this.cnv.height)/2)/8,
    //   color: 'rgba(255,255,255,0.2)',
    // };
  }
  /*
  *
  * fonctions de canvas et dessins
  *
  */
 clearCanvas(context, canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
  }
 drawCircle(myCircle,ctx) {
  // ctx.beginPath();
  // ctx.arc(myCircle.centerX, myCircle.centerY, myCircle.radius, myCircle.startAngle, myCircle.endAngle);
  // ctx.lineWidth = myCircle.lineWidth;
  // ctx.strokeStyle = myCircle.color;
  // ctx.stroke();
  }
 drawChrono(time, font, ctx){
     ctx.font = font;
      ctx.fillStyle = "#8C4CFA";
      ctx.textAlign = "center";
      ctx.fillText(this.formatTime(time),this.cnv.width/2,this.cnv.height/2+this.fontSize/4); 
  }
  /*
  *
  *animation
  *
  */
 animate() {
   let startTime = +new Date();
   let step = () => {
        if (this.status != 'p' && this.status != 'this.s') {
          this.time = +new Date() - startTime + this.dTime; 
          let perc = this.time / this.duration;
          if (perc > 1) {
            perc = 1;
          }
          let angle = 2 * Math.PI * perc;
          this.clearCanvas(this.ctx,this.cnv);
          let color = 'green';
          if(perc > (3/4 + 2/12)) {
            color = 'red';
          } else if (perc > (3/4 + 1/12)) {
              color = 'orange';
          } else if (perc > 3/4) {
              color = 'yellow';
          }
         let progCircle = this.createCircle();
          // progCircle.endAngle = progCircle.startAngle + angle;
          // progCircle.color = color;
          // let whiteCircle = this.createCircle();
          this.drawChrono(this.time, this.font, this.ctx);
          // this.drawCircle(whiteCircle,this.ctx);
          // this.drawCircle(progCircle, this.ctx);
          requestAnimationFrame(step)
        } else {
          this.status = 'w';
      }
      }
      step();
  };

  init() {
    this.drawCircle(this.createCircle(), this.ctx);
    this.drawChrono(0,this.font,this.ctx)
  }
  run() {
    this.status = 'r';
    this.isStart = true;
    this.btnLeft = 'PAUSE';
    this.btnRight = 'DONE';
    this.animate();
  }
  pause() {
    this.status = 'p';
    this.dTime = this.time;
    this.btnLeft = "RESUME";
    this.btnRight = "RESET"
  }
  stop() {
    this.status = 's';
    this.dTime = 0;
    this.isStart = false;
    this.btnLeft = 'START';
    this.clearCanvas(this.ctx,this.cnv);
    this.init();
  }
  done() {
    this.status = 'p';
    this.dTime = this.time;
    this.isStart = false;
    this.btnLeft = 'RESET';
    this.database.insertEntryLogs( this.navParams.get('data')+ ': ' + this.timeOnString).then(res => {
      console.log(res);
      this.database.refreshEntries();
    })
  }
  resume() {
    this.init();
    this.drawChrono(this.time, this.font, this.ctx);
    this.status = 'r';
    this.isStart = true;
    this.btnLeft = 'PAUSE';
    this.btnRight = 'DONE';
    this.animate();
  }

  doAction(action){
    console.log(action);
    if(action === 'START') {
      this.run();
    } else if(action === 'RESUME'){
      this.resume();
    } else if( action === 'PAUSE') {
      this.pause();
    } else if( action === 'RESET') {
      this.stop();
    } else {
      this.done();
      console.log('save');
    }
  }

}
