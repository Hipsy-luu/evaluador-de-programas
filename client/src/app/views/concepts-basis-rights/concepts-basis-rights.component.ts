import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-concepts-basis-rights',
  templateUrl: './concepts-basis-rights.component.html',
  styleUrls: ['./concepts-basis-rights.component.css']
})
export class ConceptsBasisRightsComponent implements OnInit {

  constructor(public apiDataService : ApiDataService) { }

  ngOnInit(): void {
  }

}
