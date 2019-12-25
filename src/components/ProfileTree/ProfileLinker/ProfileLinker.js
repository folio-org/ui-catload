import React, {
  memo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { noop } from 'lodash';
import classNames from 'classnames';

import { Dropdown } from '@folio/stripes/components';

import {
  LinkerMenu,
  LinkerTrigger,
} from '.';

import css from '../ProfileTree.css';

export const ProfileLinker = memo(({
  id,
  title,
  linkingRules,
  className,
  onTypeSelected,
  onLink,
}) => {
  const [typeSelectorOpen, setTypeSelectorOpen] = useState(false);

  return (
    <Dropdown
      id="type-selector-dropdown"
      className={classNames(css['linker-button'], className)}
      open={typeSelectorOpen}
      onToggle={noop}
      renderTrigger={triggerProps => (
        <LinkerTrigger
          id={id}
          title={title}
          onClick={() => setTypeSelectorOpen(!typeSelectorOpen)}
          {...triggerProps}
        />
      )}
      renderMenu={menuProps => {
        console.log('Menu Props: ', menuProps);

        return (
          <LinkerMenu
            id={id}
            linkingRules={linkingRules}
            onTypeSelected={onTypeSelected}
            onLink={onLink}
            onClose={() => setTypeSelectorOpen(false)}
            {...menuProps}
          />
        );
      }}
      usePortal={false}
      relativePosition
    />
  );
});

ProfileLinker.propTypes = {
  id: PropTypes.string.isRequired,
  onTypeSelected: PropTypes.func.isRequired,
  onLink: PropTypes.func.isRequired,
  linkingRules: PropTypes.object.isRequired,
  title: PropTypes.node || PropTypes.string,
  className: PropTypes.string,
};

ProfileLinker.defaultProps = {
  title: '',
  className: '',
};
