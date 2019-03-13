import {
  interactor,
  isPresent,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import TextAreaInteractor from '@folio/stripes-components/lib/TextArea/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import MultiSelectionInteractor from '@folio/stripes-components/lib/MultiSelection/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class NewFileExtensionInteractor {
  isLoaded = isPresent('[name="description"]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  descriptionField = new TextAreaInteractor('[data-test-description-field]');
  extensionField = new TextFieldInteractor('[data-test-extension-field]');
  blockedField = new CheckboxInteractor('[data-test-blocked-field]');
  dataTypesField = new MultiSelectionInteractor('[data-test-types-field]');
  submitFormButton = new ButtonInteractor('[data-test-update-file-extension-button]');
  paneHeaderDropdown = scoped('[class*="paneHeaderCenterButton"]');
  paneHeaderCancelButton = new ButtonInteractor('[data-test-cancel-form-action]');
  callout = new CalloutInteractor();

  expandPaneHeaderDropdown() {
    return this
      .paneHeaderDropdown
      .click();
  }
}

export const fileExtensionForm = new NewFileExtensionInteractor('[data-test-file-extension-form]');
