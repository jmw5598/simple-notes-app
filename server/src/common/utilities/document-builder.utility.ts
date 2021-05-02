import { TopicDto } from "src/topics/dtos/topic.dto";
import { Topic } from "src/topics/entities/topic.entity";

export class DocumentBuilderUtility {
  public static topicToMarkdown(topic: Topic): string {
    const topicHeading: string = `# ${topic.title} \n > ${topic.synopsis}`;

    const sections = topic.sections.map(section => {
      const sectingHeading: string = `## ${section.title} \n\n *${section.synopsis}*`;
      return `${sectingHeading} \n\n ${section.notes}`;
    });
    return `${topicHeading} \n\n ${sections}`;
  }
}
