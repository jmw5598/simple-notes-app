export interface ToolbarConfig {
  groups: ToolbarButtonGroupConfig[];
}

export interface ToolbarButtonGroupConfig {
  buttons: ToolbarButtonConfig[];
}

export interface ToolbarButtonConfig {
  iconClasses: string;
  tooltip: string;
  tooltipContainer: string;
  tooltipDelay: number;
  clickCallback: Function;
}

export const TOOLBAR_CONFIG: ToolbarConfig = {
  groups: [
    {
      buttons: [
        // Previous Page
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Next Page
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        }
      ]
    },
    {
      buttons: [
        // Create Topic
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Create Calendar Event
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Create Document
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Search Topics
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Create Flashcard Set
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        },
        // Create Todo List
        {
          iconClasses: '',
          tooltip: '',
          tooltipContainer: '',
          tooltipDelay: 500,
          clickCallback: () => {}
        }
      ]
    }
  ]
}