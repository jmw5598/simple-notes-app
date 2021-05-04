import { TopicDto } from "src/topics/dtos/topic.dto";
import { Topic } from "src/topics/entities/topic.entity";

export class DocumentBuilderUtility {
  public static LINE_BREAK: string = '\n\n';
  public static topicToMarkdown(topic: Topic): string {
    const topicHeading: string = `# ${topic.title} ${DocumentBuilderUtility.LINE_BREAK} > ${topic.synopsis}`;

    const sections = topic.sections.map(section => {
      const sectingHeading: string = `## ${section.title} ${DocumentBuilderUtility.LINE_BREAK} *${section.synopsis}*`;
      return `${sectingHeading} ${DocumentBuilderUtility.LINE_BREAK} ${section.notes}`;
    }).join(DocumentBuilderUtility.LINE_BREAK);
    return `${topicHeading} ${DocumentBuilderUtility.LINE_BREAK} ${sections}`;
  }
}
