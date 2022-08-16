import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Community } from './community.schema';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  employeeNumber: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: number;

  @Prop({ type: Date, required: true })
  hireDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Community' })
  community: Community;

  @Prop()
  deleted: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
