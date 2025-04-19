
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  canActivate(
    contexto: ExecutionContext,
  ): boolean  {
    return true;
  }
}

/*

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
    //async canActivate(contexto: ExecutionContext): boolean {
      async canActivate(contexto: ExecutionContext): Promise<boolean> {
        //const requisicao contexto.switchToHttp().getRequest();
        const requisicao = contexto.switchToHttp().getRequest<Request>();
        const token = this.extrairTokenDoCabecalho(requisicao);

        if (!token) {
          throw new UnauthorizedException('Erro de autenticação');
        }

        return true;
    }
  
    //private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
      private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
          //formato do cabeçalho authorizathon: "Bearer <valor_do_jwt>" -> protocolo HTTP
          const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
          return tipo === 'Bearer' ? token : undefined;


    }

}
    */