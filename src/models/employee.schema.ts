import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Community } from './community.schema';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, unique: true })
  employeeNumber: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Date, required: true })
  hireDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Community', index: true })
  community: Community;

  @Prop({ default: false })
  deleted?: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
EmployeeSchema.index({ employeeNumber: 1 }, { unique: true });
EmployeeSchema.index({ community: 1 }, { unique: true });
EmployeeSchema.index({ firstName: "text" });
EmployeeSchema.index({ lastName: "text" });
