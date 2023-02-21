import { PartialType } from '@nestjs/mapped-types';
import { CreateCoincidenceDto } from './create-table.dto';

export class UpdateCoincidenceDto extends PartialType(CreateCoincidenceDto) {
    
}
