import { Controller, Request , Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessage } from './../../utils/dtos/serverMessages.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user-list')
  @UseGuards(AuthGuard())
  public async getUsers(): Promise<ServerMessage> {
    return this.userService.getAllUsers();
  }

  @Post('create-edit-user')
  @UseGuards(AuthGuard())
  public async createUser(@Body() body): Promise<ServerMessage> {
    return this.userService.createEditUser(body);
  }

  @Post('save-respuestas')
  @UseGuards(AuthGuard())
  public async saveRespuestas(@Body() respuestas): Promise<ServerMessage> {
    return this.userService.saveRespuestas(respuestas);
  }

  @Get('obtener-respuestas')
  @UseGuards(AuthGuard())
  public async getRespuestas(@Request() req): Promise<ServerMessage> {
    return this.userService.getAllRespuestas(req.user.dataValues.entidad);
  }

  @Get('user-responses')
  @UseGuards(AuthGuard())
  public async getUserResponses(@Request() req): Promise<ServerMessage> {
    return this.userService.getUserResponses(req.user.dataValues.idusuarios);
  }

  @Post('update-validaciones/:idrespuestas')
  @UseGuards(AuthGuard())
  async updateCreateValidation(@Param('idrespuestas') idrespuesta : number,@Body() validaciones): Promise<ServerMessage>{
      return await this.userService.upCreateValidations(validaciones,idrespuesta);
  }

  @Post('enviar-validacion')
  @UseGuards(AuthGuard())
  async sendPdfEmail(@Body() body): Promise<ServerMessage>{
      return await this.userService.sendEmailValidations(body);
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