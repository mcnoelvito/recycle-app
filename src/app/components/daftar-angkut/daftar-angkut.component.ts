import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daftar-angkut',
  templateUrl: './daftar-angkut.component.html',
  styleUrls: ['./daftar-angkut.component.scss'],
})
export class DaftarAngkutComponent  implements OnInit {

  hasHeader: boolean = false;
  hasFooter: boolean = true;

  constructor() { }

  ngOnInit() {}

}
