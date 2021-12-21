import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../utils/response";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class RecursoService  extends EntityDataService<IResponse>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.admin.recurso);
  }



  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    const req = new HttpRequest('POST', `${this.endPoint}/upload`, formData,{
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  getFiles(){
    return this.httpClient.get(`${this.endPoint}/files`);
  }

  deleteFile(filename:String){
    return this.httpClient.get(`${this.endPoint}/delete/${filename}`)
  }
}
