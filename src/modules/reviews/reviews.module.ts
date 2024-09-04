import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/reviews.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
