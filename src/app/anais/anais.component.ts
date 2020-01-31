
import { Component, OnInit, ViewChild,
  ElementRef, Renderer, NgZone, Inject } from '@angular/core';
import { DomHandler } from '../dom-handler.service';
import { GeralService, ThematicGroup, GT, News, Submission} from '../geral.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-anais',
  templateUrl: './anais.component.html',
  styleUrls: ['./anais.component.scss']
})
export class AnaisComponent implements OnInit {
  private Submissions: Array<Submission> = [];
  private allGts: Array<ThematicGroup> = [];
  arrayResult:any = [];
  constructor(
    private _geralService: GeralService,
  ) { }

  ngOnInit() {
    this.fillSubmissions();
    this.Submissions.map( sub => {
      console.log('submissons' + sub)
    })
  }
  public fillSubmissions(){
    console.log('fill all :')
    this._geralService.getGts2().
    subscribe((gt) =>{
      gt.map((res)=>{
        res.tgs.map((tg)=>{
          this.arrayResult.push(tg)
        })
      })

    }
  )

    console.log(this.allGts)
    console.log('fill all subs:')
    this._geralService.getSubmissions()
    .subscribe( sub =>{
        sub.map( (ob:Submission)=>{
          this.Submissions.push(ob);
        });
    });
    let count;
    this.arrayResult.map(gt => {
      console.log('nao sei: ')
    })
      this.arrayResult.map(tg=>{
        this.Submissions.map( sub => {
          if(tg.id == sub.tg){
            tg.full = true;
          }
        })
      })

  }
}
