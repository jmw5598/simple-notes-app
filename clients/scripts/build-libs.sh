#!/bin/sh

echo "\nBuilding project libs.....\n"

ng build core-framing
ng build shared-models
ng build core-services
ng build shared-animations
ng build button
ng build alert
ng build checkbox
ng build drawer
ng build empty
ng build toolbar
ng build toaster
ng build overlay-content
ng build paginator
ng build debounce-search
ng build card
ng build loading-spinner
ng build markdown
ng build tag-input
ng build radio
ng build section-header
ng build form
ng build list

echo "\nProject libs built successfully!\n"
