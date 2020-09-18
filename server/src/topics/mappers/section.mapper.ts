import { Section } from '../entities/section.entity';
import { SectionDto } from '../dtos/section.dto';

export class SectionMapper {
  public static toSectionDto(section: Section): SectionDto {
    return {
      id: section.id,
      title: section.title,
      synopsis: section.synopsis,
      notes: section.notes,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt
    } as SectionDto;
  }

  public static toSectionDtoList(topics: Section[]): SectionDto[] {
    return topics.map(topic => SectionMapper.toSectionDto(topic));
  }
}