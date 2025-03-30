import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobListService {
  private API_URL= environment.apiUrl;

  constructor(private http : HttpClient) { }

  jobList(pageNo:number,pageSize:number){
    const Url=this.API_URL+'/api/JobApplications?pageNumber='+pageNo+'&pageSize='+pageSize;
    return this.http.get(Url);
  }
  jobAdd(Req : any){
    const Url=this.API_URL+'/api/JobApplications';
    return this.http.post(Url,Req);
  }
  jobUpdate(id : any,Req : any){
    const Url=this.API_URL+'/api/JobApplications/'+id;
    return this.http.put(Url,Req);
  }
  statusUpdate(id : any,Req : any){
    const Url=this.API_URL+'/api/JobApplications/'+id+','+Req;
    return this.http.put(Url,Req);
  }
  getJobData(id:any){
    const Url=this.API_URL+'/api/JobApplications/'+id;
    return this.http.get(Url);
  }
}
