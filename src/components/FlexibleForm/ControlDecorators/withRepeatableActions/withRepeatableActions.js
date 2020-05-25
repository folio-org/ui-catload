import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  get,
  identity,
} from 'lodash';

import {
  Select,
  Headline,
} from '@folio/stripes/components';

import {
  ENTITY_KEYS,
  FORMS_SETTINGS,
  isFormattedMessage,
  isTranslationId,
} from '../../../../utils';

import styles from './withRepeatableActions.css';

export const withRepeatableActions = memo(props => {
  const {
    intl,
    enabled,
    legend,
    children,
    wrapperLabel,
    wrapperFieldName,
  } = props;

  const actions = get(FORMS_SETTINGS, [ENTITY_KEYS.MAPPING_PROFILES, 'DECORATORS', 'REPEATABLE_ACTIONS'], []);
  const dataOptions = Object.keys(actions).map(key => ({
    value: key,
    label: intl.formatMessage({ id: actions[key] }),
  }));

  const needsTranslation = wrapperLabel && !isFormattedMessage(wrapperLabel) && isTranslationId(wrapperLabel);

  const legendHeadline = (
    <Headline
      tag="h3"
      margin="xx-small"
    >
      <FormattedMessage id={legend} />
    </Headline>
  );

  return (
    <div className={styles.decorator}>
      {legend && legendHeadline}
      {enabled && (
        <div
          className={styles.selectHolder}
          data-test-repeatable-decorator
        >
          {needsTranslation ? (
            <FormattedMessage id={wrapperLabel}>
              {placeholder => (
                <Field
                  name={wrapperFieldName}
                  component={Select}
                  itemToString={identity}
                  dataOptions={dataOptions}
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>
          ) : (
            <Field
              name={wrapperFieldName}
              component={Select}
              itemToString={identity}
              dataOptions={dataOptions}
              placeholder={wrapperLabel}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
});

withRepeatableActions.propTypes = {
  intl: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  children: Node.isRequired,
  wrapperFieldName: PropTypes.string.isRequired,
  legend: PropTypes.oneOfType([PropTypes.string, Node]),
  wrapperLabel: PropTypes.oneOfType([PropTypes.string, Node]),
};

withRepeatableActions.defaultProps = { wrapperLabel: 'ui-data-import.settings.mappingProfiles.map.wrapper.repeatableActions' };
