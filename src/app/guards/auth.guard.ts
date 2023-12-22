import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router=new Router();
  const sweetMessage=new MessageService();
    if(localStorage.getItem("currentUser")==null || localStorage.getItem("currentUser")==undefined){
      router.navigate(['authentification']);
      sweetMessage.showMessage('error','Veuillez vous reconnecter svp!');
      return false;
    }else{
      return true;
    }
};


