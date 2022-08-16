import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document;


@Schema({ timestamps: true })
export class Community {
  @Prop({ type: Number, required: false})
  communityId: number;
  
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({default: false})
  deleted: boolean;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
