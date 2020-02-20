import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  DropdownMenu,
} from '@folio/stripes-components';

import { INCOMING_RECORD_TYPES } from '../../ListTemplate/incomingRecordTypes';

export const IncomingRecordMenu = ({
  open,
  onClick,
  onToggle,
  keyHandler,
  dataAttributes,
}) => (
  <DropdownMenu
    role="menu"
    placement="bottom-end"
    aria-label="available permissions"
    onToggle={onToggle}
    onKeyDown={keyHandler}
    open={open}
    minWidth="auto"
  >
    {Object.keys(INCOMING_RECORD_TYPES).map((recordType, i) => (
      <Button
        key={i}
        buttonStyle="dropdownItem"
        onClick={() => onClick(INCOMING_RECORD_TYPES[recordType])}
        {...dataAttributes}
      >
        <FormattedMessage id={INCOMING_RECORD_TYPES[recordType].captionId} />
      </Button>
    ))}
  </DropdownMenu>
);

IncomingRecordMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  keyHandler: PropTypes.func.isRequired,
  dataAttributes: PropTypes.object,
};

IncomingRecordMenu.defaultProps = { dataAttributes: null };
