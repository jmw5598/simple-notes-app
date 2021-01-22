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
      [_] modules
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
        [_] account-settings-security
          [_] pages
            [_] account-settings-security
        [_] account-settings-toolbar
          [_] components
            [_] configure-keyboard-shortcut
            [_] toolbary-keyboard-shortcut-list
          [_] pages
            [_] account-settings-toolbar
      [X] pages
        [X] account-settings
      [_] store (?)
    [_] calendar
      [_] components
        [_] calendar-event-details
        [_] calendar-event-update
        [_] calendar-event-view
      [_] pages
        [_] view-calendar
      [_] store (?)
    [_] dashbaord
      [_] components
        [_] recent-topics-list
        [_] todays-calendar-events-list
      [_] pages
        [_] dashboard-overview
      [_] store (?)
    [_] documents
      [_] pages
        [_] document-builder
      [_] store (?)
    [_] topics
      [_] components
        [_] section-create
        [_] section-form
        [_] section-list
        [_] section-update
        [_] topic-export
        [_] topic-list
        [_] topic-update
      [_] guards
        [_] section-by-id
        [_] sections-search
        [_] topic-by-id
        [_] topics-search
      [_] pages
        [_] edit-section-notes
        [_] topic-details
        [_] view-topics
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
