import React, {
  Fragment,
  memo,
} from 'react';
import {
  FormattedMessage,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  isEmpty,
  get,
} from 'lodash';

import * as stripesComponents from '@folio/stripes/components';

import * as components from '..';
import * as validators from '../../utils/formValidators';

const controls = {
  Fragment,
  Field,
  ...stripesComponents,
};

const getControl = controlType => components[controlType] || controls[controlType];
const getValidation = validation => validation.map(val => validators[val]);
const hasChildren = cfg => cfg.childControls && cfg.childControls.length;
const hasContent = (children, record) => children
  .map(child => get(record, child.name))
  .some(child => child !== undefined && child !== '-');

export const Control = memo(props => {
  const {
    controlType,
    staticControlType,
    component,
    label,
    intl,
    styles,
    classNames,
    dataOptions,
    repeatable,
    childControls,
    dataAttributes,
    componentsProps,
    record,
    id,
    optional,
    referenceTables,
    ...attributes
  } = props;

  const isEditable = isEmpty(record);
  const classes = styles && classNames ? classNames.map(className => styles[className]).join(' ') : undefined;
  const children = optional && !isEditable && !hasContent(childControls, record) ? [] : childControls;
  const isFragment = (isEditable && controlType === 'Fragment') || (!isEditable && staticControlType === 'Fragment');

  const getOptions = options => {
    return options.map(option => ({
      value: option.value,
      label: intl.formatMessage({ id: option.label }),
    }));
  };

  const getAttributes = () => {
    const {
      name,
      validate,
    } = props;

    let attrs = {
      label: label ? (<FormattedMessage id={label} />) : label,
      component: component ? getControl(component) : null,
      id,
      optional,
      ...attributes,
      ...dataAttributes,
    };

    if (dataOptions && dataOptions.length) {
      attrs = {
        ...attrs,
        dataOptions: getOptions(dataOptions),
      };
    }

    if (record && get(record, name)) {
      attrs = {
        ...attrs,
        value: get(record, name, '-'),
      };
    }

    if (validate && validate.length) {
      attrs = {
        ...attrs,
        validate: getValidation(validate),
      };
    }

    if (optional) {
      attrs = {
        ...attrs,
        optional: !!isEditable,
        enabled: !!(isEditable && hasContent(children, referenceTables)),
      };
    }

    if (componentsProps[id]) {
      attrs = {
        ...attrs,
        ...componentsProps[id],
      };
    }

    return attrs;
  };

  const attrs = getAttributes();

  const renderDefault = () => {
    const Cmp = !isEditable ? getControl(staticControlType) : getControl(controlType);

    if (isFragment) {
      return <Cmp />;
    }

    if (hasChildren(props)) {
      return (
        <Cmp
          className={classes}
          {...attrs}
        >
          {children.map((cfg, i) => (
            <Control
              key={`control-${i}`}
              intl={intl}
              styles={styles}
              referenceTables={referenceTables}
              componentsProps={componentsProps}
              record={record}
              {...cfg}
            />
          ))}
        </Cmp>
      );
    }

    return <Cmp {...attrs} />;
  };

  const renderRepeatable = () => {
    const {
      legend,
      addLabel,
      fields,
      onAdd,
      onRemove,
    } = props;

    const Cmp = getControl(controlType);
    const Repeatable = getControl('RepeatableField');

    if (isFragment) {
      return <Cmp />;
    }

    return (
      <Cmp
        className={classes}
        {...attrs}
      >
        <Repeatable
          legend={legend}
          addLabel={addLabel}
          fields={referenceTables[fields]}
          onAdd={onAdd}
          onRemove={onRemove}
          renderField={() => (
            <Fragment>
              {children.map((cfg, i) => (
                <Control
                  key={`control-${i}`}
                  intl={intl}
                  styles={styles}
                  referenceTables={referenceTables}
                  componentsProps={componentsProps}
                  record={record}
                  {...cfg}
                />
              ))}
            </Fragment>
          )}
        />
      </Cmp>
    );
  };

  return (repeatable && isEditable) ? renderRepeatable() : renderDefault();
});

Control.propTypes = {
  controlType: PropTypes.string.isRequired,
  staticControlType: PropTypes.string.isRequired,
  component: PropTypes.string,
  label: PropTypes.string || Node,
  intl: intlShape,
  styles: PropTypes.shape(PropTypes.string),
  classNames: PropTypes.arrayOf(PropTypes.string),
  dataOptions: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  repeatable: PropTypes.bool,
  childControls: PropTypes.arrayOf(Node),
  dataAttributes: PropTypes.object,
  componentsProps: PropTypes.object,
  record: PropTypes.object,
  id: PropTypes.string,
  optional: PropTypes.bool,
  name: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.string),
  referenceTables: PropTypes.object,
};
