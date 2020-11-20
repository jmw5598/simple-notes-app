import { AllowIn } from 'ng-keyboard-shortcuts';

export enum ShortcutAction {
  CREATE_CALENDAR_EVENT = "Create Calendar Event",
  CREATE_TOPIC = "Create Topic",
  SEARCH_TOPICS = "Search Topics"
}

export const DEFAULT_KEYBOARD_SHORTCUTS: any[] = [
  {  
    key: "alt + c",
    label: ShortcutAction.CREATE_CALENDAR_EVENT,
    description: 'Opens drawer with create calendar event form.',
    preventDefault: true,
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  },
  {  
    key: "alt + t",
    preventDefault: true,
    label: ShortcutAction.CREATE_TOPIC,
    description: 'Opens drawer with create topic form.',
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  },
  {  
    key: "alt + s",
    preventDefault: true,
    label: ShortcutAction.SEARCH_TOPICS,
    description: 'Opens drawer with search topics form.',
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  }
]