`client/src/app`
[_] application
  [_] components
    [X] navigation
    [_] toolbar
  [_] modules
    [_] accounts
      [X] components
        [X] account-user-card
      [X] guards
        [X] account-details
        [X] account-profile
      [X] modules
        [X] account-settings-general
          [X] components
            [X] account-details-display
            [X] account details-form
          [X] pages
            [X] account-settings-general        
        [X] account-settings-integrations
          [X] components
            [X] calendar-integration
          [X] guards
            [X] calendar-integration-grouped-by-type
          [X] pages
            [X] account-settings-integrations
          [_] store (?)
        [X] account-settings-security
          [X] pages
            [X] account-settings-security
        [X] account-settings-toolbar
          [X] components
            [X] configure-keyboard-shortcut
            [X] toolbary-keyboard-shortcut-list
          [X] pages
            [X] account-settings-toolbar
      [X] pages
        [X] account-settings
      [_] store (?)
    [_] calendar
      [X] components
        [X] calendar-event-details
        [X] calendar-event-update
        [X] calendar-event-view
      [_] pages
        [TODO] view-calendar
      [_] store (?)
    [X] dashboard
      [X] components
        [X] recent-topics-list
        [X] todays-calendar-events-list
      [X] pages
        [X] dashboard-overview
      [_] store (?)
    [_] documents
      [_] pages
        [_] document-builder
      [_] store (?)
    [_] topics
      [X] components
        [X] section-create
        [X] section-form
        [X] section-list
        [X] section-update
        [X] topic-export
        [X] topic-list
        [X] topic-update
      [X] guards
        [X] section-by-id
        [X] sections-search
        [X] topic-by-id
        [X] topics-search
      [_] pages
        [X] edit-section-notes
        [_] topic-details
        [X] view-topics
      [_] store (?)
  [_] store (?)

[_] auth

[_] core
  [_] guards
    [_] plans
  [_] interceptor
    [_] jwt-token
  [_] services
    [_] accounts
    [_] authenticaiton
    [_] calendar-events
    [_] calendar-integrations
    [_] documents
    [_] plans
    [_] profiles
    [_] sections
    [_] settings
    [_] topics
  [_] store (?)
  [_] 

[_] shared
  [X] components
    [X] calendar-event-create
    [X] debounced-search
    [X] drawer
    [X] empty-data
    [X] layout
    [X] loading-spinner
    [X] page-header
    [X] paginator
    [X] spinner
    [-] tag-input (THIS IS GOING TO BE REBUILT)
    [X] topic-create
    [X] topic-search
  [_] forms
    [X] calendar-event-form
    [_] topic-form
  [X] directives
    [X] debounce


`server/src/`
[_] TODO
