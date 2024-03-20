import { AuthResetDTO } from "../../dto/auth-reset.dto";
import { resetTokenMock } from "./reset-token.mock";

export const authResetDTOMock: AuthResetDTO = {
  password: "987654321",
  token: resetTokenMock
}