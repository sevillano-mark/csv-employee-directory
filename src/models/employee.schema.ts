import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Community } from './community.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: number;

  @Prop({ type: Date, required: true })
  hiredate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Community' })
  community: Community;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
