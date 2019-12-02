import {
  interactor,
  scoped,
  isPresent,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import ConfirmationModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

import { AssociatedActionProfiles } from '../associated-action-profiles';

@interactor
class MappingProfileDetailsInteractor {
  paneHeaderDropdown = scoped('[class*="paneHeaderCenterButton"]');
  dropdownEditButton = new ButtonInteractor('[data-test-edit-item-menu-button]');
  dropdownDeleteButton = new ButtonInteractor('[data-test-delete-item-menu-button]');
  dropdownDuplicateButton = new ButtonInteractor('[data-test-duplicate-item-menu-button]');
  editButton = new ButtonInteractor('[data-test-edit-item-button]');
  headline = scoped('[data-test-headline]');
  description = scoped('[data-test-description]');
  incomingRecordType = scoped('[data-test-incoming-record-type]');
  folioRecordType = scoped('[data-test-folio-record-type]');
  isTagsPresent = isPresent('[data-test-tags-accordion]');
  associatedActionProfiles = new AssociatedActionProfiles('[data-test-associated-action-profiles]');
  confirmationModal = new ConfirmationModalInteractor('#delete-mapping-profile-modal');
  callout = new CalloutInteractor();

  expandPaneHeaderDropdown() {
    return this.paneHeaderDropdown.click();
  }
}

export const mappingProfileDetails = new MappingProfileDetailsInteractor('#pane-mapping-profile-details');
