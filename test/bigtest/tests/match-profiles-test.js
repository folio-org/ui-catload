import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import translation from '../../../translations/ui-data-import/en';
import { setupApplication } from '../helpers';
import {
  matchProfiles,
  matchProfileDetails,
} from '../interactors';

describe('Match profiles', () => {
  setupApplication({ scenarios: ['fetch-match-profiles-success'] });

  beforeEach(function () {
    this.visit('/settings/data-import/match-profiles');
  });

  describe('table', () => {
    it('renders proper amount of items', () => {
      expect(matchProfiles.list.rowCount).to.equal(8);
    });

    it('has proper columns order', () => {
      expect(matchProfiles.list.headers(1).text).to.equal(translation.name);
      expect(matchProfiles.list.headers(2).text).to.equal(translation.match);
      expect(matchProfiles.list.headers(3).text).to.equal(translation.tags);
      expect(matchProfiles.list.headers(4).text).to.equal(translation.updated);
      expect(matchProfiles.list.headers(5).text).to.equal(translation.updatedBy);
    });

    describe('can sort', () => {
      beforeEach(async () => {
        await matchProfiles.list.headers(0).click();
      });

      it('by first column', () => {
        expect(matchProfiles.list.rowCount).to.equal(8);
      });

      describe('and', () => {
        beforeEach(async () => {
          await matchProfiles.list.headers(1).click();
        });

        it('by second column', () => {
          expect(matchProfiles.list.rowCount).to.equal(8);
        });
      });
    });

    describe('has select all checkbox', () => {
      beforeEach(async () => {
        await matchProfiles.selectAllCheckBox.clickAndBlur();
      });

      it('upon click changes its state', () => {
        expect(matchProfiles.selectAllCheckBox.isChecked).to.be.true;
      });
    });

    describe('has select individual item checkbox', () => {
      beforeEach(async () => {
        await matchProfiles.checkBoxes(0).clickAndBlur();
      });

      it('upon click changes its state', () => {
        expect(matchProfiles.checkBoxes(0).isChecked).to.be.true;
      });
    });

    describe('has select individual item checkbox', () => {
      beforeEach(async () => {
        await matchProfiles.checkBoxes(0).clickAndBlur();
      });

      it('upon click changes its state', () => {
        expect(matchProfiles.checkBoxes(0).isChecked).to.be.true;
      });
    });

    describe('has correctly built Match column', () => {
      describe('when current language is LTR', () => {
        beforeEach(async () => {
          document.dir = 'ltr';
        });

        it('for record #1', () => {
          expect(matchProfiles.list.rows(0).cells(2).content).to.equal('Order&nbsp;&middot;&nbsp;990&nbsp;&rarr;&nbsp;PO Line Number');
        });

        it('for record #2', () => {
          expect(matchProfiles.list.rows(1).cells(2).content).to.equal('Instance&nbsp;&middot;&nbsp;020&nbsp;&rarr;&nbsp;ISBN');
        });

        it('for record #3', () => {
          expect(matchProfiles.list.rows(2).cells(2).content).to.equal('MARC Bibliographic&nbsp;&middot;&nbsp;935&nbsp;&rarr;&nbsp;035');
        });

        it('for record #4', () => {
          expect(matchProfiles.list.rows(3).cells(2).content).to.equal('Instance&nbsp;&middot;&nbsp;001&nbsp;&rarr;&nbsp;Instance HRID');
        });

        it('for record #5', () => {
          expect(matchProfiles.list.rows(4).cells(2).content).to.equal('Holdings&nbsp;&middot;&nbsp;Holdings&nbsp;&rarr;&nbsp;Location Code');
        });

        it('for record #6', () => {
          expect(matchProfiles.list.rows(5).cells(2).content).to.equal('MARC Authority&nbsp;&middot;&nbsp;010&nbsp;&rarr;&nbsp;010');
        });

        it('for record #7', () => {
          expect(matchProfiles.list.rows(6).cells(2).content).to.equal('MARC Bibliographic&nbsp;&middot;&nbsp;035&nbsp;&rarr;&nbsp;035');
        });

        it('for record #8', () => {
          expect(matchProfiles.list.rows(7).cells(2).content).to.equal('Order&nbsp;&middot;&nbsp;TBD&nbsp;&rarr;&nbsp;PO Line Number');
        });
      });

      describe('when current language is RTL', () => {
        beforeEach(async () => {
          document.dir = 'rtl';
        });

        it('for record #1', () => {
          expect(matchProfiles.list.rows(0).cells(2).content).to.equal('PO Line Number&nbsp;&larr;&nbsp;990&nbsp;&middot;&nbsp;Order');
        });

        it('for record #2', () => {
          expect(matchProfiles.list.rows(1).cells(2).content).to.equal('ISBN&nbsp;&larr;&nbsp;020&nbsp;&middot;&nbsp;Instance');
        });

        it('for record #3', () => {
          expect(matchProfiles.list.rows(2).cells(2).content).to.equal('035&nbsp;&larr;&nbsp;935&nbsp;&middot;&nbsp;MARC Bibliographic');
        });

        it('for record #4', () => {
          expect(matchProfiles.list.rows(3).cells(2).content).to.equal('Instance HRID&nbsp;&larr;&nbsp;001&nbsp;&middot;&nbsp;Instance');
        });

        it('for record #5', () => {
          expect(matchProfiles.list.rows(4).cells(2).content).to.equal('Location Code&nbsp;&larr;&nbsp;Holdings&nbsp;&middot;&nbsp;Holdings');
        });

        it('for record #6', () => {
          expect(matchProfiles.list.rows(5).cells(2).content).to.equal('010&nbsp;&larr;&nbsp;010&nbsp;&middot;&nbsp;MARC Authority');
        });

        it('for record #7', () => {
          expect(matchProfiles.list.rows(6).cells(2).content).to.equal('035&nbsp;&larr;&nbsp;035&nbsp;&middot;&nbsp;MARC Bibliographic');
        });

        it('for record #8', () => {
          expect(matchProfiles.list.rows(7).cells(2).content).to.equal('PO Line Number&nbsp;&larr;&nbsp;TBD&nbsp;&middot;&nbsp;Order');
        });
      });
    });

    describe('opens job profile details', () => {
      beforeEach(async () => {
        await matchProfiles.list.rows(0).click();
      });

      it('upon click on row', () => {
        expect(matchProfileDetails.isPresent).to.be.true;
      });
    });
  });
});
