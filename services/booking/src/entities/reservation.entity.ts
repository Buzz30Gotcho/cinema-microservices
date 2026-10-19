import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Seance } from './seance.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Les colonnes SQL réelles sont userName / userEmail / seatCode
  @Column({ name: 'userName' })
  name: string;

  @Column({ name: 'userEmail', nullable: true })
  email: string;

  @Column({ name: 'seatCode', nullable: true })
  seatNumber: string;

  @Column({ nullable: true })
  seanceId: string;

  @ManyToOne(() => Seance, (seance) => seance.reservations)
  @JoinColumn({ name: 'seanceId' })
  seance: Seance;
}
