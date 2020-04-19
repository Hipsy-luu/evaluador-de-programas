import { Controller, Request , Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../models/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessage } from './../../utils/dtos/serverMessages.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  /* @UseGuards(AuthGuard()) */
  public async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  public async createUser(@Body() body): Promise<ServerMessage> {
    return this.userService.createUser(body);
  }

  @Post('save-respuestas')
  /* @UseGuards(AuthGuard()) */
  public async saveRespuestas(@Body() respuestas): Promise<ServerMessage> {
    return this.userService.saveRespuestas(respuestas);
  }

  @Get('obtener-respuestas')
  /* @UseGuards(AuthGuard()) */
  public async getRespuestas(): Promise<ServerMessage> {
    return this.userService.getAllRespuestas();
  }

  @Post('update-validaciones/:idrespuestas')
  async updateCreateValidation(@Param('idrespuestas') idrespuesta : number,@Body() validaciones): Promise<ServerMessage>{
      return await this.userService.upCreateValidations(validaciones,idrespuesta);
  }

  /* @Post('testuserband')
  testUserWithBand( @Body() body : any){
    return this.userService.testUserWithBand(body.bandId);
  } */
  // This route will require successfully passing our default auth strategy (JWT) in order
  // to access the route
  /* @Get('testheader')
  @UseGuards(AuthGuard())
  testAuthRoute( @Request() req ){
    let user = req.user;

    return ServerMessages.messageResponse(false , "Acceso a ruta protegida correctamente", { user : user }); 
  } */
}