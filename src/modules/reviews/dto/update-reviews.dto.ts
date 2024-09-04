import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-reviews.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
