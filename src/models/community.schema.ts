import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CommunityDocument = Community & Document;

@Schema({ timestamps: true })
export class Community {
  @Prop({ type: Number, required: true, unique: true, index: true })
  communityId: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  deleted?: boolean;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
CommunitySchema.index({ communityId: 1 }, { unique: true });
CommunitySchema.index({ name: "text" });
CommunitySchema.index({ description: "text" });
