import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
  get,
  identity,
  omit,
  pick,
} from 'lodash';

import {
  Headline,
  TextArea,
  TextField,
  Accordion,
  AccordionSet,
  ConfirmationModal,
  Select,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import {
  compose,
  withProfileWrapper,
  validateRequiredField,
} from '../../utils';
import {
  ENTITY_KEYS,
  LAYER_TYPES,
  PROFILE_TYPES,
} from '../../utils/constants';
import {
  FolioRecordTypeSelect,
  ACTION_TYPES_SELECT,
  ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES,
  ProfileAssociator,
  FullScreenForm,
} from '../../components';

const formName = 'actionProfilesForm';

export const ActionProfilesFormComponent = ({
  intl: { formatMessage },
  pristine,
  submitting,
  initialValues,
  handleSubmit,
  location: { search },
  associatedJobProfilesAmount,
  onCancel,
  action,
  folioRecord,
  dispatch,
}) => {
  const [isConfirmEditModalOpen, setConfirmModalOpen] = useState(false);
  const [addedRelations, setAddedRelations] = useState([]);
  const [deletedRelations, setDeletedRelations] = useState([]);

  useEffect(() => {
    dispatch(change(formName, 'addedRelations', addedRelations));
  }, [addedRelations]);

  useEffect(() => {
    dispatch(change(formName, 'deletedRelations', deletedRelations));
  }, [deletedRelations]);

  const getFilteredActions = () => {
    switch (folioRecord) {
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.ORDER.type: {
        return pick(ACTION_TYPES_SELECT, ACTION_TYPES_SELECT.CREATE.type);
      }
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.INVOICE.type: {
        return pick(ACTION_TYPES_SELECT, [
          ACTION_TYPES_SELECT.CREATE.type,
          ACTION_TYPES_SELECT.COMBINE.type,
        ]);
      }
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.INSTANCE.type:
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.HOLDINGS.type:
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.ITEM.type: {
        return pick(ACTION_TYPES_SELECT, [
          ACTION_TYPES_SELECT.CREATE.type,
          ACTION_TYPES_SELECT.COMBINE.type,
          ACTION_TYPES_SELECT.REPLACE.type,
        ]);
      }
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_BIBLIOGRAPHIC.type:
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_HOLDINGS.type:
      case ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_AUTHORITY.type:
      default: {
        return ACTION_TYPES_SELECT;
      }
    }
  };

  const getActionsDataOptions = () => Object.entries(getFilteredActions())
    .map(([recordType, { captionId }]) => ({
      value: recordType,
      label: formatMessage({ id: captionId }),
    }));

  const getFilteredFolioRecordTypes = () => {
    switch (action) {
      case ACTION_TYPES_SELECT.COMBINE.type: {
        return omit(ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES, ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.ORDER.type);
      }
      case ACTION_TYPES_SELECT.MODIFY.type: {
        return pick(ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES, [
          ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_AUTHORITY.type,
          ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_BIBLIOGRAPHIC.type,
          ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.MARC_HOLDINGS.type,
        ]);
      }
      case ACTION_TYPES_SELECT.REPLACE.type: {
        return omit(ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES, [
          ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.ORDER.type,
          ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES.INVOICE.type,
        ]);
      }
      case ACTION_TYPES_SELECT.CREATE.type:
      default: {
        return ACTION_PROFILES_FORM_FOLIO_RECORD_TYPES;
      }
    }
  };

  const getFolioRecordTypesDataOptions = () => Object.entries(getFilteredFolioRecordTypes())
    .map(([recordType, { captionId }]) => ({
      value: recordType,
      label: formatMessage({ id: captionId }),
    }));
  const actionsDataOptions = useMemo(getActionsDataOptions, [folioRecord]);
  const folioRecordTypesDataOptions = useMemo(getFolioRecordTypesDataOptions, [action]);
  const { layer } = queryString.parse(search);
  const isEditMode = layer === LAYER_TYPES.EDIT;
  const isSubmitDisabled = pristine || submitting;

  const paneTitle = isEditMode ? (
    <FormattedMessage id="ui-data-import.edit">
      {txt => `${txt} ${initialValues.profile.name}`}
    </FormattedMessage>
  ) : <FormattedMessage id="ui-data-import.settings.actionProfiles.new" />;
  const headLine = isEditMode ? initialValues.profile.name : <FormattedMessage id="ui-data-import.settings.actionProfiles.new" />;
  const editWithModal = isEditMode && associatedJobProfilesAmount;
  const associations = [...[], ...initialValues.profile.parentProfiles, ...initialValues.profile.childProfiles];

  const onSubmit = e => {
    if (editWithModal) {
      e.preventDefault();
      setConfirmModalOpen(true);
    } else {
      handleSubmit(e);
    }
  };

  return (
    <FullScreenForm
      id="action-profiles-form"
      paneTitle={paneTitle}
      submitMessage={<FormattedMessage id="ui-data-import.saveAsProfile" />}
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Headline
        size="xx-large"
        tag="h2"
        data-test-header-title
      >
        {headLine}
      </Headline>
      <AccordionSet>
        <Accordion
          label={<FormattedMessage id="ui-data-import.summary" />}
          separator={false}
        >
          <div data-test-name-field>
            <Field
              label={<FormattedMessage id="ui-data-import.name" />}
              name="profile.name"
              required
              component={TextField}
              validate={[validateRequiredField]}
            />
          </div>
          <div data-test-description-field>
            <Field
              label={<FormattedMessage id="ui-data-import.description" />}
              name="profile.description"
              component={TextArea}
            />
          </div>
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-data-import.details" />}
          separator={false}
        >
          <div data-test-action-field>
            <FormattedMessage id="ui-data-import.selectAction">
              {placeholder => (
                <Field
                  label={<FormattedMessage id="ui-data-import.action" />}
                  name="profile.action"
                  component={Select}
                  required
                  itemToString={identity}
                  validate={[validateRequiredField]}
                  dataOptions={actionsDataOptions}
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>
          </div>
          <FolioRecordTypeSelect
            fieldName="folioRecord"
            dataOptions={folioRecordTypesDataOptions}
          />
        </Accordion>
        <Accordion
          id="actionProfileFormAssociatedMappingProfileAccordion"
          label={<FormattedMessage id="ui-data-import.settings.associatedMappingProfile" />}
          separator={false}
        >
          <ProfileAssociator
            entityKey={ENTITY_KEYS.MAPPING_PROFILES}
            namespaceKey="AMP"
            parentId={initialValues.profile.id}
            parentType={PROFILE_TYPES.ACTION_PROFILE}
            masterType={PROFILE_TYPES.ACTION_PROFILE}
            detailType={PROFILE_TYPES.MAPPING_PROFILE}
            contentData={associations}
            hasLoaded
            isMultiSelect={false}
            isMultiLink
            relationsToAdd={addedRelations}
            relationsToDelete={deletedRelations}
            onLink={setAddedRelations}
            onUnlink={setDeletedRelations}
          />
        </Accordion>
        <Accordion
          id="actionProfileFormAssociatedJobProfileAccordion"
          label={<FormattedMessage id="ui-data-import.settings.associatedJobProfiles" />}
          separator={false}
        >
          <ProfileAssociator
            entityKey={ENTITY_KEYS.JOB_PROFILES}
            namespaceKey="AJP"
            parentId={initialValues.profile.id}
            parentType={PROFILE_TYPES.ACTION_PROFILE}
            masterType={PROFILE_TYPES.JOB_PROFILE}
            detailType={PROFILE_TYPES.ACTION_PROFILE}
            contentData={associations}
            record={initialValues}
            hasLoaded
            isMultiSelect={false}
            isMultiLink
            useSearch={false}
          />
        </Accordion>
      </AccordionSet>
      <ConfirmationModal
        id="confirm-edit-action-profile-modal"
        open={isConfirmEditModalOpen}
        heading={<FormattedMessage id="ui-data-import.settings.actionProfiles.confirmEditModal.heading" />}
        message={(
          <FormattedMessage
            id="ui-data-import.settings.actionProfiles.confirmEditModal.message"
            values={{ amount: associatedJobProfilesAmount }}
          />
        )}
        confirmLabel={<FormattedMessage id="ui-data-import.confirm" />}
        onConfirm={() => {
          handleSubmit();
          setConfirmModalOpen(false);
        }}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </FullScreenForm>
  );
};

ActionProfilesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired || PropTypes.string.isRequired,
  associatedJobProfilesAmount: PropTypes.number.isRequired,
  action: PropTypes.string,
  folioRecord: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const selector = formValueSelector(formName);

const mapStateToProps = state => {
  const { length: associatedJobProfilesAmount } = get(
    state,
    ['folio_data_import_associated_jobprofiles', 'records', 0, 'childSnapshotWrappers'],
    [],
  );
  const action = selector(state, 'profile.action');
  const folioRecord = selector(state, 'profile.folioRecord');

  return {
    associatedJobProfilesAmount,
    action,
    folioRecord,
  };
};

export const ActionProfilesForm = compose(
  injectIntl,
  withProfileWrapper,
  stripesForm({
    form: formName,
    navigationCheck: true,
    enableReinitialize: true,
  }),
  connect(mapStateToProps),
)(ActionProfilesFormComponent);
