import React, {
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';
import classNames from 'classnames';

import {
  AppIcon,
  Dropdown,
} from '@folio/stripes/components';

import { IncomingRecordMenu } from './IncomingRecordMenu';
import { IncomingRecordTrigger } from './IncomingRecordTrigger';

import css from '../RecordTypesSelect.css';

export const RecordItem = memo(({
  item,
  className,
  style,
  onClick,
  isEditable,
}) => {
  const ref = useRef();
  const [recordSelectorOpen, setRecordSelectorOpen] = useState(false);
  const [incomingRecord, setIncomingRecord] = useState(item);

  useEffect(() => {
    setIncomingRecord(item);
  }, [item]);

  const isInitial = !className?.includes('incomingRecord');

  const trigger = triggerProps => (
    <IncomingRecordTrigger
      className={className}
      style={style}
      onClick={() => setRecordSelectorOpen(!recordSelectorOpen)}
      iconKey={incomingRecord.iconKey}
      captionId={incomingRecord.captionId}
      {...triggerProps}
    />
  );
  const menu = menuProps => (
    <IncomingRecordMenu
      onClick={record => {
        setIncomingRecord(record);
        onClick(record);
        setRecordSelectorOpen(!recordSelectorOpen);
      }}
      {...menuProps}
    />
  );

  const initialButton = (
    <div // eslint-disable-line jsx-a11y/click-events-have-key-events
      data-test-record-item
      tabIndex="0"
      role="button"
      id={incomingRecord.type}
      className={classNames(css.item, { [css.clickableItem]: isEditable }, className)}
      style={style}
      ref={ref}
      onClick={() => (isEditable ? onClick(incomingRecord) : noop)}
    >
      {incomingRecord.iconKey ? (
        <AppIcon
          size="medium"
          app="data-import"
          iconKey={incomingRecord.iconKey}
        >
          <FormattedMessage id={incomingRecord.captionId} />
        </AppIcon>
      ) : (
        <FormattedMessage id={incomingRecord.captionId} />
      )}

    </div>
  );
  const dropdownButton = (
    <div data-test-incoming-record-selector>
      <Dropdown
        id="record-selector-dropdown"
        open={recordSelectorOpen}
        renderTrigger={trigger}
        renderMenu={menu}
        usePortal={false}
        relativePosition
        style={{ width: '100%' }}
      />
    </div>
  );

  return isEditable && !isInitial ? dropdownButton : initialButton;
});

RecordItem.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  isEditable: PropTypes.bool,
};

RecordItem.defaultProps = { isEditable: true };
