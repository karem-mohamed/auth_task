import { JwtService } from '@nestjs/jwt';

export const generateToken = (
  jwtService: JwtService,
  payload: { userId: string },
): string => {
  return jwtService.sign(payload);
};
