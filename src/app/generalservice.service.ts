import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeneralserviceService {
 
  createUser: any;
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  searchTerm: string = '';
  
  page: number = 1;
  pageSize: number = 10; // Adjust as needed
  data: any;
  

 
  // deteleGlobal: any;
 
  resetPasswordData(): any {
    throw new Error('Method not implemented.');
  }
 
  setLoginDataList: any;
  userList: any;
  loginResponse: any;
  setTableData: any;
  

  
  constructor(private http: HttpClient) { }

  setLoginResponse(data){
    this.loginResponse = data;
}

getLoginResponse(){
   return this.loginResponse;
}
 

 

 
  userNewCreation(obj){
    return this.http.post(environment.baseUrl+'/onboard/UserCreation',obj);

  }

  UpdateExitUser(obj){
    return this.http.post(environment.baseUrl+'/onboard/UpdateExitUser',obj);
 
  }

  getAllUserList(){
    return this.http.get(environment.baseUrl+'/onboard/getAllUserList');
  }

  DeteleUser(obj){
    return this.http.post(environment.baseUrl+'/onboard/deteleUser',obj);
  }




  submitLogin(obj){
    return this.http.post(environment.baseUrl+'/onboard/authenticationLogin',obj);
  }

onBoardCreation(data:any){
        return this.http.post(environment.baseUrl+'/onboard/onBoardCreation',data)

  }
  updateVendorOnboard(data){
        return this.http.post(environment.baseUrl+'/onboard/onBoardUpdate',data)

  }

getAllOnboardingRecords(){
  return this.http.get(environment.baseUrl+'/onboard/GetAllOnboardingRecords');
}

downloadVendorProfile(payload: any) {
  return this.http.post(`${environment.baseUrl}/onboard/downloadVendorProfile`, payload, {
    responseType: 'blob' // Important to get file as blob
  });
}
 generateVendorLink() {
    return this.http.get(environment.baseUrl + '/onboard/generateVendorId');
  }
getVendorById(id: string) {
  return this.http.get(environment.baseUrl + '/onboard/getVendorById/' + id);
}

getUsercreation(){
  return this.http.get(environment.baseUrl+'/emil/getAllUserList');

}

getRoles(){
  return this.http.get(environment.baseUrl+'/emil/getAllRoles');

}
  

}
