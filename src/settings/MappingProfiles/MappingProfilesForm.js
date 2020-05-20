import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { connect } from 'react-redux';
import {
  Field,
  change,
} from 'redux-form';
import {
  get,
  identity,
  isEmpty,
} from 'lodash';

import stripesForm from '@folio/stripes/form';
import {
  Headline,
  AccordionSet,
  AccordionStatus,
  Accordion,
  ExpandAllButton,
  TextField,
  Select,
  TextArea,
  Col,
  Row,
} from '@folio/stripes/components';

import {
  compose,
  withProfileWrapper,
  validateRequiredField,
  ENTITY_KEYS,
  LAYER_TYPES,
  PROFILE_TYPES,
  ITEM_STATUS_OPTIONS,
} from '../../utils';
import {
  INCOMING_RECORD_TYPES,
  FOLIO_RECORD_TYPES,
  FullScreenForm,
  FolioRecordTypeSelect,
  ProfileAssociator,
  MappedHeader,
} from '../../components';
import {
  MappingInstanceDetails,
  MappingHoldingsDetails,
  MappingItemDetails,
} from './detailsSections';

import {
  getInitialDetails,
  getInitialFields,
  getReferenceTables,
} from './initialDetails';

import styles from './MappingProfiles.css';

const formName = 'mappingProfilesForm';

export const MappingProfilesFormComponent = ({
  pristine,
  submitting,
  initialValues,
  okapi,
  existingRecordTypeInitial,
  mappingDetailsInitial,
  mappingDetails,
  location: { search },
  handleSubmit,
  onCancel,
  dispatch,
  intl,
}) => {
  const { profile } = initialValues;
  const { layer } = queryString.parse(search);

  const isEditMode = layer === LAYER_TYPES.EDIT;
  const isSubmitDisabled = pristine || submitting;

  const associations = [
    ...get(initialValues, ['profile', 'parentProfiles'], []),
    ...get(initialValues, ['profile', 'childProfiles'], []),
  ];

  const getIncomingRecordTypesDataOptions = () => Object.entries(INCOMING_RECORD_TYPES)
    .map(([recordType, { captionId }]) => ({
      value: recordType,
      label: intl.formatMessage({ id: captionId }),
    }));
  const getFolioRecordTypesDataOptions = () => Object.entries(FOLIO_RECORD_TYPES)
    .map(([recordType, { captionId }]) => ({
      value: recordType,
      label: intl.formatMessage({ id: captionId }),
    }));

  const folioRecordTypesDataOptions = useMemo(getFolioRecordTypesDataOptions, []);
  const incomingRecordTypesDataOptions = useMemo(getIncomingRecordTypesDataOptions, []);

  const paneTitle = isEditMode ? (
    <FormattedMessage id="ui-data-import.edit">
      {txt => `${txt} ${profile.name}`}
    </FormattedMessage>
  ) : <FormattedMessage id="ui-data-import.settings.mappingProfiles.new" />;
  const headLine = isEditMode ? profile.name : <FormattedMessage id="ui-data-import.settings.mappingProfiles.new" />;

  const prevExistingRecordType = useRef(existingRecordTypeInitial);
  const [folioRecordType, setFolioRecordType] = useState(get(profile, 'existingRecordType', null));
  const [initials, setInitials] = useState({
    ...profile,
    mappingDetails: isEmpty(mappingDetails) ? getInitialDetails(prevExistingRecordType.current, true) : mappingDetails,
  });
  const [addedRelations, setAddedRelations] = useState([]);
  const [deletedRelations, setDeletedRelations] = useState([]);

  useLayoutEffect(() => {
    const isEqual = folioRecordType === prevExistingRecordType.current;
    const needsUpdate = !profile.id || (profile.id && (!isEqual || isEmpty(mappingDetails)));

    if (!needsUpdate) {
      return;
    }

    const newInitDetails = folioRecordType === existingRecordTypeInitial && !isEmpty(mappingDetails)
      ? mappingDetailsInitial
      : getInitialDetails(folioRecordType, true);
    const newInitials = {
      ...initials,
      mappingDetails: newInitDetails,
    };

    setInitials(newInitials);
    // @TODO: change method should be changed to initialize
    dispatch(change(formName, 'profile.mappingDetails', newInitDetails));
    if (!isEqual) {
      prevExistingRecordType.current = folioRecordType;
    }
  }, [folioRecordType]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(change(formName, 'addedRelations', addedRelations));
  }, [addedRelations]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(change(formName, 'deletedRelations', deletedRelations));
  }, [deletedRelations]); // eslint-disable-line react-hooks/exhaustive-deps

  const referenceTables = getReferenceTables(get(mappingDetails, 'mappingFields', []));
  const initialFields = getInitialFields(folioRecordType);

  const injectedProps = {
    'profile-headline': { children: headLine },
    'field-record-type-incoming': {
      dataOptions: incomingRecordTypesDataOptions,
      itemToString: identity,
    },
    'field-record-type-existing': {
      dataOptions: folioRecordTypesDataOptions,
      itemToString: identity,
      onChange: (event, newValue) => setFolioRecordType(newValue),
    },
    'section-mapping-details': { stateFieldValue: folioRecordType },
    'mappingProfile.actionsAssociator': {
      entityKey: ENTITY_KEYS.ACTION_PROFILES,
      namespaceKey: 'AAP',
      parentId: profile.id,
      parentType: PROFILE_TYPES.MAPPING_PROFILE,
      masterType: PROFILE_TYPES.ACTION_PROFILE,
      detailType: PROFILE_TYPES.MAPPING_PROFILE,
      profileName: profile.name,
      contentData: associations,
      relationsToAdd: addedRelations,
      relationsToDelete: deletedRelations,
      onLink: setAddedRelations,
      onUnlink: setDeletedRelations,
    },
    'item-status': {
      acceptedValuesList: ITEM_STATUS_OPTIONS.map(option => ({
        value: option.value,
        label: <FormattedMessage id={option.label} />,
      })),
    },
  };
  const stateMethods = {
    dispatch,
    change,
  };

  const setReferenceTables = (fieldsPath, refTable) => {
    dispatch(change(formName, fieldsPath, refTable));
  };

  const renderDetails = {
    INSTANCE: (
      <MappingInstanceDetails
        initialFields={initialFields}
        referenceTables={referenceTables}
        setReferenceTables={setReferenceTables}
        okapi={okapi}
        intl={intl}
      />
    ),
    HOLDINGS: <MappingHoldingsDetails />,
    ITEM: <MappingItemDetails />,
  };

  return (
    <>
      <FullScreenForm
        id="mapping-profiles-form"
        paneTitle={paneTitle}
        submitMessage={<FormattedMessage id="ui-data-import.saveAsProfile" />}
        isSubmitDisabled={isSubmitDisabled}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        contentClassName={styles.mappingForm}
      >
        <Headline
          data-test-header-title
          id="profile-headline"
          size="xx-large"
          tag="h2"
        >
          {headLine}
        </Headline>
        <AccordionSet>
          <Accordion
            id="summary"
            label={<FormattedMessage id="ui-data-import.summary" />}
            separator
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
            <div data-test-incoming-record-type-field>
              <FormattedMessage id="ui-data-import.chooseIncomingRecordType">
                {placeholder => (
                  <Field
                    label={<FormattedMessage id="ui-data-import.incomingRecordType" />}
                    name="profile.incomingRecordType"
                    component={Select}
                    required
                    itemToString={identity}
                    validate={[validateRequiredField]}
                    dataOptions={incomingRecordTypesDataOptions}
                    placeholder={placeholder}
                  />
                )}
              </FormattedMessage>
            </div>
            <FolioRecordTypeSelect
              fieldName="existingRecordType"
              dataOptions={folioRecordTypesDataOptions}
              onRecordSelect={e => setFolioRecordType(e.target.value)}
            />
            <div data-test-description-field>
              <Field
                label={<FormattedMessage id="ui-data-import.description" />}
                name="profile.description"
                component={TextArea}
              />
            </div>
          </Accordion>
          <Accordion
            id="mapping-profile-details"
            label={<FormattedMessage id="ui-data-import.details" />}
            separator={false}
          >
            <AccordionStatus>
              <Row between="xs">
                <Col>
                  <MappedHeader
                    mappedLabelId="ui-data-import.settings.profiles.select.mappingProfiles"
                    mappedLabel="Field mapping"
                    mappableLabelId="ui-data-import.settings.mappingProfiles.map.instance"
                    mappableLabel="Instance"
                    headlineProps={{ margin: 'small' }}
                  />
                </Col>
                <Col>
                  <div data-test-expand-all-button>
                    <ExpandAllButton />
                  </div>
                </Col>
              </Row>
              {renderDetails[folioRecordType]}
            </AccordionStatus>
          </Accordion>
          <Accordion
            id="mappingProfileFormAssociatedActionProfileAccordion"
            label={<FormattedMessage id="ui-data-import.settings.associatedActionProfiles" />}
            separator
          >
            <ProfileAssociator
              entityKey={ENTITY_KEYS.ACTION_PROFILES}
              namespaceKey="AAP"
              parentId={profile.id}
              parentType={PROFILE_TYPES.MAPPING_PROFILE}
              masterType={PROFILE_TYPES.ACTION_PROFILE}
              detailType={PROFILE_TYPES.MAPPING_PROFILE}
              profileName={profile.name}
              contentData={associations}
              hasLoaded
              isMultiSelect
              isMultiLink={false}
              relationsToAdd={addedRelations}
              relationsToDelete={deletedRelations}
              onLink={setAddedRelations}
              onUnlink={setDeletedRelations}
            />
          </Accordion>
        </AccordionSet>
      </FullScreenForm>
    </>
  );
};

MappingProfilesFormComponent.propTypes = {
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.string.isRequired,
  ]),
  okapi: PropTypes.object.isRequired,
  existingRecordTypeInitial: PropTypes.string.isRequired,
  mappingDetailsInitial: PropTypes.object.isRequired,
  mappingDetails: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // @TODO: Remove this when FlexibleForm internal state mamagement will be implemented.
  const okapi = get(state, ['okapi'], null);
  const mappingDetailsInitial = get(state, ['form', formName, 'initial', 'profile', 'mappingDetails'], null);
  const mappingDetails = get(state, ['form', formName, 'values', 'profile', 'mappingDetails'], null);
  const existingRecordTypeInitial = get(state, ['form', formName, 'initial', 'profile', 'existingRecordType'], null);

  return {
    okapi,
    existingRecordTypeInitial,
    mappingDetailsInitial,
    mappingDetails,
  };
};

export const MappingProfilesForm = compose(
  injectIntl,
  withProfileWrapper,
  stripesForm({
    form: formName,
    navigationCheck: true,
    enableReinitialize: true,
  }),
  connect(mapStateToProps),
)(MappingProfilesFormComponent);
