import React, {
  Fragment,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';

import { Pluggable } from '@folio/stripes-core';
import {
  Button,
  Dropdown,
} from '@folio/stripes/components';

import {
  LinkerMenu,
  LinkerTrigger,
} from '.';

import css from '../ProfileTree.css';

export const ProfileLinker = ({
  id,
  onLink,
  linkingRules: { profilesAllowed },
  title,
  className,
}) => {
  const [typeSelectorOpen, setTypeSelectorOpen] = useState(false);
  const buttonRefs = {
    matchProfiles: useRef(null),
    actionProfiles: useRef(null),
  };

  const handleMenuClick = entityKey => buttonRefs[entityKey].current.click();

  const trigger = triggerProps => (
    <LinkerTrigger
      id={`type-selector-trigger-${id}`}
      title={title}
      onClick={() => setTypeSelectorOpen(!typeSelectorOpen)}
      {...triggerProps}
    />
  );

  const menu = menuProps => (
    <LinkerMenu
      id={`type-selector-menu-${id}`}
      entityKeys={profilesAllowed}
      onClick={handleMenuClick}
      {...menuProps}
    />
  );

  const renderPluginButton = (triggerProps, entityKey) => {
    buttonRefs[entityKey] = triggerProps.buttonRef;

    return (
      <Button
        buttonRef={buttonRefs[entityKey]}
        onClick={triggerProps.onClick}
      />
    );
  };

  return (
    <Fragment>
      <Dropdown
        id={`type-selector-dropdown-${id}`}
        className={classNames(css['linker-button'], className)}
        open={typeSelectorOpen}
        onToggle={() => setTypeSelectorOpen(!typeSelectorOpen)}
        renderTrigger={trigger}
        renderMenu={menu}
        usePortal={false}
        relativePosition
      />
      <div style={{ display: 'none' }}>
        {profilesAllowed.map((entityKey, i) => (
          <Pluggable
            key={i}
            type="find-import-profile"
            id={`${id}-clickable-find-import-profile`}
            entityKey={entityKey}
            dataKey={entityKey}
            disabled={false} // @TODO: Change this to actual value from LinkingRules object
            isSingleSelect
            isMultiLink
            onLink={records => onLink(records, entityKey)}
            renderTrigger={triggerProps => renderPluginButton(triggerProps, entityKey)}
          >
            <span data-test-no-plugin-available>
              <FormattedMessage id="ui-data-import.find-import-profile-plugin-unavailable" />
            </span>
          </Pluggable>
        ))}
      </div>
    </Fragment>
  );
};

ProfileLinker.propTypes = {
  id: PropTypes.string.isRequired,
  onLink: PropTypes.func.isRequired,
  linkingRules: PropTypes.object.isRequired,
  title: PropTypes.node || PropTypes.string,
  className: PropTypes.string,
};

ProfileLinker.defaultProps = {
  title: '',
  className: '',
};
