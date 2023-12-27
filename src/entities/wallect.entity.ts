import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet")
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  certificate?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  bind_at: Date;
}
