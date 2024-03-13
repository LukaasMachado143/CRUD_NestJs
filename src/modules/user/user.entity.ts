import { Role } from "src/enums/role.enums";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: "Users"
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: false,
  })
  id: number;

  @Column({
    length: 63
  })
  name: string;

  @Column({ unique: true, length: 127 })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({
    enum: Role,
    default: Role.User
  })
  role: number;

  @Column({
    default: "",
    nullable: true
  })
  profilePhotoPath: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}