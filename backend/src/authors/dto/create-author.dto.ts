import { Column } from 'typeorm';

export class CreateAuthorDto {
  @Column({ nullable: false })
  name: string;
  
  bio?: string;
}
