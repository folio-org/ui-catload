import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { isEmpty } from 'lodash';

import {
  isFormattedMessage,
  isTranslationId,
} from '../../../../utils';

import { OptionsList } from '../partials';

import styles from './withReferenceValues.css';

export const withReferenceValues = memo(props => {
  const {
    id,
    input,
    dataOptions,
    optionValue,
    optionLabel,
    WrappedComponent,
    wrapperLabel,
    wrapperExplicitInsert,
    disabled,
    ...rest
  } = props;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [listOptions, setListOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(input?.value || '');
  const [wrapperValue, setWrapperValue] = useState(null);

  const handleChange = e => {
    const val = e.target ? e.target.value : e;

    setCurrentValue(val);
    input.onChange(e);
  };

  useEffect(() => {
    setHasLoaded(!isEmpty(dataOptions));
    setListOptions(dataOptions);
  }, [dataOptions]);

  useLayoutEffect(() => {
    let newValue = '';

    if (wrapperValue) {
      if (wrapperExplicitInsert || !currentValue) {
        newValue = `"${wrapperValue}"`;
      } else {
        newValue = `${currentValue} "${wrapperValue}"`;
      }
    }

    if (newValue) {
      setCurrentValue(newValue);
      handleChange(newValue);
    }
  }, [wrapperValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const needsTranslation = wrapperLabel && !isFormattedMessage(wrapperLabel) && isTranslationId(wrapperLabel);
  const currentInput = useRef(input);

  const {
    onBlur,
    onDragStart,
    onDrop,
    onFocus,
  } = input;

  return (
    <div className={styles.decorator}>
      <WrappedComponent
        value={currentValue}
        inputRef={currentInput}
        onBlur={onBlur}
        onChange={handleChange}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFocus={onFocus}
        loading={!hasLoaded}
        disabled={disabled}
        {...rest}
      />
      {needsTranslation ? (
        <FormattedMessage id={wrapperLabel}>
          {localized => (
            <OptionsList
              id={id}
              label={localized}
              dataOptions={listOptions}
              optionValue={optionValue}
              optionLabel={optionLabel}
              className={styles['options-dropdown']}
              disabled={!hasLoaded || disabled}
              onSelect={setWrapperValue}
            />
          )}
        </FormattedMessage>
      ) : (
        <OptionsList
          id={id}
          label={wrapperLabel}
          dataOptions={listOptions}
          optionValue={optionValue}
          optionLabel={optionLabel}
          className={styles['options-dropdown']}
          disabled={!hasLoaded || disabled}
          onSelect={setWrapperValue}
        />
      )}
    </div>
  );
});

withReferenceValues.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  dataOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionValue: PropTypes.string.isRequired,
  optionLabel: PropTypes.string.isRequired,
  WrappedComponent: PropTypes.oneOfType([React.Component, PropTypes.func]).isRequired,
  wrapperExplicitInsert: PropTypes.bool,
  id: PropTypes.string,
  wrapperLabel: PropTypes.oneOfType([PropTypes.string, Node]),
  disabled: PropTypes.bool,
};

withReferenceValues.defaultProps = {
  id: null,
  wrapperLabel: 'ui-data-import.settings.mappingProfiles.map.wrapper.acceptedValues',
  wrapperExplicitInsert: false,
  disabled: false,
};
