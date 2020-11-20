import { AllowIn } from 'ng-keyboard-shortcuts';

export enum KeyboardShortcutActionType {
  CREATE_CALENDAR_EVENT = "Create Calendar Event",
  CREATE_TOPIC = "Create Topic",
  SEARCH_TOPICS = "Search Topics"
}

export const DEFAULT_KEYBOARD_SHORTCUTS: any[] = [
  {  
    key: "alt + c",
    label: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
    description: 'Opens drawer with create calendar event form.',
    preventDefault: true,
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  },
  {  
    key: "alt + t",
    preventDefault: true,
    label: KeyboardShortcutActionType.CREATE_TOPIC,
    description: 'Opens drawer with create topic form.',
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  },
  {  
    key: "alt + s",
    preventDefault: true,
    label: KeyboardShortcutActionType.SEARCH_TOPICS,
    description: 'Opens drawer with search topics form.',
    allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
  }
]