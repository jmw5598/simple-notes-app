import { Injectable } from '@nestjs/common';
import { Topic } from '../../../../topics/entities/topic.entity';
import { Document } from '../../../../documents/entities/document.entity';
import { ExportConfig } from '../models/export-config.model';
import { Readable } from 'stream';
import { ExportFormat } from '../enums/export-format.enum';
import { TopicDto } from 'src/topics/dtos/topic.dto';

@Injectable()
export class DocumentBuilderService {
  private readonly LINE_BREAK: string = '\n\n';

  public async exportTopic(topic: Topic, config: ExportConfig): Promise<Readable> {
    try {
      let readableTopic: Readable;
      switch (config.format) {
        case ExportFormat.MD:
          readableTopic = await this.exportTopicToMarkdown(topic, config);
          break;
        case ExportFormat.PDF:
          readableTopic = await this.exportTopicToPdf(topic, config);
          break;
        default:
            readableTopic = await this.exportTopicToMarkdown(topic, config);
            break;
      }
      return readableTopic;
    } catch (error) {
      console.log("error!!!!", error);
      throw error;
    }
  }

  public async exportDocument(document: Document, config: ExportConfig): Promise<Readable> {
    try {
      let readableDocument: Readable;
      switch (config.format) {
        case ExportFormat.MD:
          readableDocument = await this.exportDocumentToMarkdown(document, config);
          break;
        case ExportFormat.PDF:
          readableDocument = await this.exportDocumentToPdf(document, config);
          break;
        default: 
          readableDocument = await this.exportDocumentToMarkdown(document, config);
          break;
      }
      return readableDocument;
    } catch (error) {
      console.log("error!!!!", error);
      throw error;
    }
  }

  public documentToMarkdown(document: Document): string {
    const topicsToGenerateMarkdownFor = document.documentTopics.map(documentTopic => ({
      ...documentTopic.topic,
      sections: documentTopic.documentTopicSections
        .map(documentTopicSection => documentTopicSection.section)
    } as Topic));

    return topicsToGenerateMarkdownFor
      ?.map(topic => this.topicToMarkdown(topic)).join(`${this.LINE_BREAK}`) || '';
  }

  public topicToMarkdown(topic: Topic): string {
    const topicHeading: string = `# ${topic.title} ${this.LINE_BREAK}> ${topic.synopsis}`;
    const sections = topic.sections?.map(section => {
      const sectingHeading: string = `## ${section.title} ${this.LINE_BREAK}*${section.synopsis}*`;
      return `${sectingHeading} ${this.LINE_BREAK}${section.notes}`;
    }).join(this.LINE_BREAK);
    return `${topicHeading} ${this.LINE_BREAK}${sections}`;
  }

  public async getFilename(title: string, config: ExportConfig): Promise<string> {
    const date: Date = new Date();
    const filename: string = title.toLowerCase().replace(/\s/gs, '-');
    return `${date.getTime()}-${filename}.${config.format}`;
  }

  private async exportTopicToMarkdown(topic: Topic, config: ExportConfig): Promise<Readable> {
    const markdownString: string = this.topicToMarkdown(topic);
    return Readable.from([markdownString]);
  }

  private async exportTopicToPdf(topic: Topic, config: ExportConfig): Promise<Readable> {
    const markdownString: string = this.topicToMarkdown(topic);
    // TODO implement this....
    return Readable.from([markdownString]);
  }

  private async exportDocumentToMarkdown(document: Document, config: ExportConfig): Promise<Readable> {
    const markdownString: string = this.documentToMarkdown(document);
    return Readable.from([markdownString]);
  }

  private async exportDocumentToPdf(document: Document, config: ExportConfig): Promise<Readable> {
    const markdownString: string = this.documentToMarkdown(document);
    // TODO : Implement this.....
    return Readable.from([markdownString]);
  }
}
