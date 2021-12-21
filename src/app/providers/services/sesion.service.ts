import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../utils/response";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class SesionService  extends EntityDataService<IResponse>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.admin.sesion);
  }

  public getByCapacitacion(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endPoint}/capacitacion/${id}`);
  }
}
