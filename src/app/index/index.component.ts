import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  youtubeUrl: SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer) {
    this.youtubeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tGsKzZtRwxw?rel=0');
 }

  ngOnInit() {
  }

}
