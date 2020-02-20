import React, {
  memo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  debounce,
  noop,
} from 'lodash';

import { InitialRecordSelect } from './components/InitialRecordSelect';
import { CompareRecordSelect } from './components/CompareRecordSelect';
import {
  FOLIO_RECORD_TYPES,
  INCOMING_RECORD_TYPES,
} from '../ListTemplate';

const useForceUpdate = () => useState()[1];

const useUpdateOnResize = () => {
  // forceUpdate is used to re-render elements that are depending on DOM such as TreeLine
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const handleResize = debounce(forceUpdate);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [forceUpdate]);
};

export const RecordTypesSelect = memo(({
  id,
  existingRecordType,
  incomingRecordType,
  onExistingSelect,
  onIncomingSelect,
  isEditable,
}) => {
  useUpdateOnResize();
  const [existingRecord, setExistingRecord] = useState(undefined);
  const [incomingRecord, setIncomingRecord] = useState(undefined);

  useEffect(() => {
    setExistingRecord(FOLIO_RECORD_TYPES?.[existingRecordType]);
  }, [existingRecordType]);

  useEffect(() => {
    setIncomingRecord(INCOMING_RECORD_TYPES?.[incomingRecordType]);
  }, [incomingRecordType]);

  const handleSelect = selectedRecord => {
    setExistingRecord(selectedRecord);
    onExistingSelect(selectedRecord);
  };

  return (
    <div
      data-test-choose-existing-record
      id={id}
    >
      {existingRecord
        ? (
          <CompareRecordSelect
            id={id}
            incomingRecord={incomingRecord}
            existingRecord={existingRecord}
            setExistingRecord={handleSelect}
            setIncomingRecord={onIncomingSelect}
            isEditable={isEditable}
          />
        )
        : (
          <InitialRecordSelect
            id={id}
            onItemSelect={handleSelect}
            isEditable={isEditable}
          />
        )
      }
    </div>
  );
});

RecordTypesSelect.propTypes = {
  id: PropTypes.string,
  existingRecordType: PropTypes.string,
  incomingRecordType: PropTypes.string,
  onExistingSelect: PropTypes.func,
  onIncomingSelect: PropTypes.func,
  isEditable: PropTypes.bool,
};

RecordTypesSelect.defaultProps = {
  id: 'compare-record-types',
  existingRecordType: '',
  incomingRecordType: INCOMING_RECORD_TYPES.MARC_BIBLIOGRAPHIC,
  onExistingSelect: noop,
  onIncomingSelect: noop,
  isEditable: true,
};
