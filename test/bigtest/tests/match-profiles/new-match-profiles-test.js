import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { setupApplication } from '../../helpers';

import {
  matchProfiles,
  matchProfileForm,
} from '../../interactors';

async function setupFormSubmitErrorScenario(server, responseData = {}) {
  const {
    response = {},
    status = 500,
    headers = {},
  } = responseData;

  server.post('/data-import-profiles/matchProfiles', () => new Response(status, headers, response));
  await matchProfileForm.nameField.fillAndBlur('Valid name');
  await matchProfileForm.descriptionField.fillAndBlur('Valid description');
  await matchProfileForm.submitFormButton.click();
}

describe('Match profile form', () => {
  setupApplication({ scenarios: ['fetch-match-profiles-success', 'fetch-users', 'fetch-tags'] });

  describe('appears', () => {
    beforeEach(async function () {
      this.visit('/settings/data-import/match-profiles');
      await matchProfiles.newMatchProfileButton.click();
      await matchProfileForm.whenLoaded();
    });

    it('upon click on new match profile button', () => {
      expect(matchProfileForm.isPresent).to.be.true;
    });
  });

  describe('when open', () => {
    beforeEach(async function () {
      this.visit('/settings/data-import/match-profiles?layer=create');
      await matchProfileForm.whenLoaded();
    });

    it('when not filled then the submit button is disabled', () => {
      expect(matchProfileForm.submitFormButtonDisabled).to.be.true;
    });

    describe('when filled correctly', () => {
      beforeEach(async () => {
        await matchProfileForm.nameField.fillAndBlur('Valid name');
        await matchProfileForm.descriptionField.fillAndBlur('Valid description');
      });

      it('the submit button is not disabled', () => {
        expect(matchProfileForm.submitFormButtonDisabled).to.be.false;
      });
    });

    describe('details accordion', () => {
      describe('"Record types select" component', () => {
        it('should render', () => {
          expect(matchProfileForm.recordTypesSelect.isPresent).to.be.true;
        });

        it('should show initial record select view', () => {
          expect(matchProfileForm.recordTypesSelect.initialRecord).to.be.true;
        });

        it('incoming record select has correct amount of items', () => {
          expect(matchProfileForm.recordTypesSelect.items().length).to.be.equal(8);
        });

        describe('when incoming record is selected', () => {
          beforeEach(async () => {
            await matchProfileForm.recordTypesSelect.select('ITEM');
          });

          it('should show compare record select view', () => {
            expect(matchProfileForm.recordTypesSelect.initialRecord).to.be.false;
            expect(matchProfileForm.recordTypesSelect.compareRecord).to.be.true;
          });

          it('then choose record to compare screen appears', () => {
            expect(matchProfileForm.recordTypesSelect.isPresent).to.be.true;
          });
        });
      });

      describe('"Match criterion" component', () => {
        it('should render', () => {
          expect(matchProfileForm.matchCriteria.isPresent).to.be.true;
        });

        it('is open by default', () => {
          expect(matchProfileForm.matchCriteria.isOpen).to.be.true;
        });

        describe('"Incoming MARC record" section', () => {
          it('has correct label', () => {
            expect(matchProfileForm.matchCriteria.incomingMarcRecord.label).to.be.equal('Incoming MARC record');
          });

          it('has correct length of sections', () => {
            expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children().length).to.be.equal(3);
          });

          describe('"MARC field in incoming record" section', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(0).label).to.be.equal('MARC field in incoming record');
            });

            it('content is visible', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(0).hasContent).to.be.true;
            });

            it('is optional', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(0).hasCheckbox).to.be.false;
            });

            describe('when not filled', () => {
              it('should have empty "Field" input', () => {
                expect(matchProfileForm.matchCriteria.inputMain.val).to.be.equal('');
              });

              it('should have empty "In.1" input', () => {
                expect(matchProfileForm.matchCriteria.inputIn1.val).to.be.equal('');
              });

              it('should have empty "In.2" input', () => {
                expect(matchProfileForm.matchCriteria.inputIn2.val).to.be.equal('');
              });

              it('should have empty "Subfield" input', () => {
                expect(matchProfileForm.matchCriteria.inputSubfield.val).to.be.equal('');
              });
            });
          });

          describe('"Use a qualifier" section', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(1).label).to.be.equal('Use a qualifier');
            });

            it('content is hidden', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(1).hasContent).to.be.false;
            });

            it('is optional', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(1).hasCheckbox).to.be.true;
            });

            describe('click checkbox', () => {
              beforeEach(async () => {
                await matchProfileForm.matchCriteria.incomingMarcRecordQualifierCheckbox.clickAndBlur();
              });

              it('checkbox is checked', () => {
                expect(matchProfileForm.matchCriteria.incomingMarcRecordQualifierCheckbox.isChecked).to.be.true;
              });

              it('content is visible', () => {
                expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(1).hasContent).to.be.true;
              });
            });
          });

          describe('"Only compare part of the value"', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(2).label).to.be.equal('Only compare part of the value');
            });

            it('content is hidden', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(2).hasContent).to.be.false;
            });

            it('is optional', () => {
              expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(2).hasCheckbox).to.be.true;
            });

            describe('click checkbox', () => {
              beforeEach(async () => {
                await matchProfileForm.matchCriteria.incomingMarcRecordPartCheckbox.clickAndBlur();
              });

              it('checkbox is checked', () => {
                expect(matchProfileForm.matchCriteria.incomingMarcRecordPartCheckbox.isChecked).to.be.true;
              });

              it('content is visible', () => {
                expect(matchProfileForm.matchCriteria.incomingMarcRecordSections.children(2).hasContent).to.be.true;
              });
            });
          });
        });

        describe('"Match criterion" section', () => {
          it('should render', () => {
            expect(matchProfileForm.matchCriteria.matchCriterionSection.isPresent).to.be.true;
          });

          it('has correct label', () => {
            expect(matchProfileForm.matchCriteria.matchCriterion.label).to.be.equal('Match criterion');
          });

          it('should have a dropdown', () => {
            expect(matchProfileForm.matchCriteria.matchCriterionSection.dropdown.isPresent).to.be.true;
          });
        });

        describe('"Existing record" section', () => {
          it('has correct label', () => {
            expect(matchProfileForm.matchCriteria.existingRecord.label).to.be.equal('Existing record');
          });

          it('has correct length of sections', () => {
            expect(matchProfileForm.matchCriteria.existingRecordSections.children().length).to.be.equal(3);
          });

          describe('"Existing record field" section', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(0).label).to.be.equal('Existing record field');
            });
          });

          describe('"Use a qualifier section" section', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(1).label).to.be.equal('Use a qualifier');
            });

            it('is optional', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(1).hasCheckbox).to.be.true;
            });

            it('content is hidden', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(1).hasContent).to.be.false;
            });

            describe('click checkbox', () => {
              beforeEach(async () => {
                await matchProfileForm.matchCriteria.existingRecordQualifierCheckbox.clickAndBlur();
              });

              it('checkbox is checked', () => {
                expect(matchProfileForm.matchCriteria.existingRecordQualifierCheckbox.isChecked).to.be.true;
              });

              it('content is visible', () => {
                expect(matchProfileForm.matchCriteria.existingRecordSections.children(1).hasContent).to.be.true;
              });
            });
          });

          describe('"Only compare part of the value"', () => {
            it('has correct label', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(2).label).to.be.equal('Only compare part of the value');
            });

            it('is optional', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(2).hasCheckbox).to.be.true;
            });

            it('content is hidden', () => {
              expect(matchProfileForm.matchCriteria.existingRecordSections.children(2).hasContent).to.be.false;
            });

            describe('click checkbox', () => {
              beforeEach(async () => {
                await matchProfileForm.matchCriteria.existingRecordPartCheckbox.clickAndBlur();
              });

              it('checkbox is checked', () => {
                expect(matchProfileForm.matchCriteria.existingRecordPartCheckbox.isChecked).to.be.true;
              });

              it('content is visible', () => {
                expect(matchProfileForm.matchCriteria.existingRecordSections.children(2).hasContent).to.be.true;
              });
            });
          });
        });
      });
    });
  });
});

describe('When match profile form', () => {
  setupApplication();

  beforeEach(async function () {
    this.visit('/settings/data-import/match-profiles?layer=create');
    await matchProfileForm.whenLoaded();
  });

  describe('is submitted and the response contains', () => {
    describe('error message', () => {
      beforeEach(async function () {
        await setupFormSubmitErrorScenario(this.server, {
          response: { errors: [{ message: 'matchProfile.duplication.invalid' }] },
          status: 422,
        });
      });

      it('then error callout appears', () => {
        expect(matchProfileForm.callout.errorCalloutIsPresent).to.be.true;
      });
    });

    describe('network error', () => {
      beforeEach(async function () {
        await setupFormSubmitErrorScenario(this.server);
      });

      it('then error callout appears', () => {
        expect(matchProfileForm.callout.errorCalloutIsPresent).to.be.true;
      });
    });
  });
});
