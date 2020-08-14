import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-glosary',
  templateUrl: './glosary.component.html',
  styleUrls: ['./glosary.component.css']
})
export class GlosaryComponent implements OnInit {

  constructor(public apiDataService : ApiDataService) { }

  ngOnInit(): void {
  }

}
