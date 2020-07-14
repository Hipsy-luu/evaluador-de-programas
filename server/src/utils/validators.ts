
import { CreateEditUserDto } from '../modules/user/dto/createUser.dto';

export const validators = 
    {
      validateUser: (newUser : CreateEditUserDto) => {
        var errors = [];

        if(newUser.password){

        }

        if(errors.length == 0){
            return true;
        }else{
            return false;
        }
      }
    }
  ;