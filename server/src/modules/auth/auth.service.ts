import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { User } from '../../models/user.entity';

import { ServerMessages } from './../../utils/serverMessages';

@Injectable()
export class AuthService {

    constructor(private usersService: UserService, private jwtService: JwtService,
        @Inject('UserRepository') private readonly userRepository: typeof User, ) { }

    async validateUserByPassword(loginAttempt: LoginUserDto) {
        // This will be used for the initial login
        let userToAttempt: User = await this.usersService.findOneByUsername(loginAttempt.username);

        return new Promise(async (resolve, reject) => {
            let response: any;
            if (loginAttempt.username == "admin" && userToAttempt == null) {
                try {
                    var adminUser = {
                        usuario: "admin",
                        password: "admin",
                        entidad: "105",
                        extension: "12698",
                        rolusuario: 0
                    };

                    var newAdmin = await this.userRepository.create<User>(adminUser, {
                        fields: ['usuario', 'password', 'entidad', 'extension', 'rolusuario']
                    });

                    response = this.createJwtPayload(adminUser.usuario);
                    response.user = newAdmin;

                    resolve(ServerMessages.messageResponse(false, "Usuario admin creado", response));
                } catch (error) {
                    resolve(ServerMessages.messageResponse(true, "A ocurrido un error", error));
                }

            } else if ( userToAttempt == null){
                resolve(ServerMessages.messageResponse(true, "Usuario y/ó contraseña invalidos", {}));
            } else {
                // Check the supplied password against the hash stored for this username
                let checPass = await userToAttempt.validPassword(loginAttempt.password);
                if (checPass) {
                    // If there is a successful match, generate a JWT for the user
                    response = this.createJwtPayload(userToAttempt.usuario);
                    response.user = userToAttempt;

                    resolve(ServerMessages.messageResponse(false, "Inicio Exitoso", response));
                } else {
                    resolve(ServerMessages.messageResponse(true, "Usuario y/ó contraseña invalidos", new UnauthorizedException()));
                }
            }
        });

    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        let user: any;
        user = await this.usersService.findOneByUsername(payload.usuario);

        if (user) {
            // If there is a successful match, generate a JWT for the user
            //let token = this.createJwtPayload(user.email);
            //return  ServerMessages.messageResponse(false , "Inicio Exitoso", response ) ;
            return user;
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(usuario) {

        let data: JwtPayload = {
            usuario: usuario
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt
        }

    }

}