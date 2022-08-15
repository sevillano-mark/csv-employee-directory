import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: number;

  @Prop()
  community: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
