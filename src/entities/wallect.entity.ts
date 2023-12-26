import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet")
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address?: string;
  @Column({ nullable: true })
  phone?: string;
  @Column({ nullable: true })
  certificate?: string;
  @Column({ nullable: true })
  password?: string;
}
