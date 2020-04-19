

export const ServerMessages = 
    {
      messageResponse : ( err : boolean , mess : string , dat : any) => {
        return {
            error : err , message : mess , data : dat
        }
      }
    }
  ;