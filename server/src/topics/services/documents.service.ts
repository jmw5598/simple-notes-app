import { Injectable } from '@nestjs/common';
import { TopicDto } from '../dtos/topic.dto';
import { SectionDto } from '../dtos/section.dto';
import { ExportConfig } from '../models/export-config.model';
import * as pandoc from 'node-pandoc-promise';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class DocumentsService {
  public async exportTopic(topicDto: TopicDto, config: ExportConfig): Promise<Readable> {
    try {
      const tempfile: string = uuidv4();
      const markdown: string = await this._topicDtoToString(topicDto, config);  
      const args: string[] = ['-f','markdown','-t',`${config.format}`,'-o',`./${tempfile}`];
      await pandoc(markdown, args);
      const file = await fs.createReadStream(tempfile);
      fs.unlink(tempfile, function() {});
      return file;
    } catch (error) {
      throw error;
    }
  }

  public async getFilename(title: string, config: ExportConfig): Promise<string> {
    const date: Date = new Date();
    const filename: string = title.toLowerCase().replace(/\s/gs, '-');
    return `${date.getTime()}-${filename}.${config.format}`;
  }

  private async _topicDtoToString(topicDto: TopicDto, config: ExportConfig): Promise<string> {
    const topicTitle: string = config.includeTopicTitle ? `# ${topicDto.title}\n\n` : '';
    const topicSynopsis: string = config.includeTopicSynopsis ? `${topicDto.synopsis}` : '';
    
    const topicBody: string = topicDto.sections
      .map((sectionDto: SectionDto) => {
        const sectionTitle: string = config.includeSectionTitle ? `\n\n## ${sectionDto.title}` : '';
        const sectionSynopsis: string = config.includeSectionSynopsis ? `\n\n${sectionDto.synopsis}` : '';
        return `${sectionTitle}${sectionSynopsis}\n\n${sectionDto.notes}`;
      }).join('');

    return `${topicTitle}${topicSynopsis}${topicBody}`;
  }
}
