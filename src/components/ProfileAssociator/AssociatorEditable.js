import React, {
  memo,
  useState,
  Fragment,
} from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { noop } from 'lodash';

import { Pluggable } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';

import { useCheckboxList } from '../../utils';
import { AssociatedList } from './AssociatedList';

import css from './ProfileAssociator.css';

export const AssociatorEditable = memo(({
  entityKey,
  namespaceKey,
  parentId,
  parentType,
  masterType,
  detailType,
  contentData,
  dataAttributes,
  isMultiSelect,
  isMultiLink,
  relationsToAdd,
  relationsToDelete,
  onLink,
  onUnlink,
}) => {
  const checkboxList = useCheckboxList(contentData);
  const columnWidths = {
    name: 250,
    updated: 100,
    tags: 150,
    unlink: 65,
  };
  const [data, setData] = useState(contentData);
  const isPluginDisabled = curData => !isMultiSelect && curData && curData.length > 0;
  const [pluginDisabled, setPluginDisabled] = useState(isPluginDisabled(data));
  const [current, setCurrent] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const findRelIndex = (relations, line) => {
    const masterId = masterType === parentType ? parentId : line.id;
    const detailId = masterType === parentType ? line.id : parentId;

    return relations.findIndex(rel => rel.masterProfileId === masterId && rel.detailProfileId === detailId);
  };

  const composeRelations = lines => lines.map(item => ({
    masterProfileId: masterType === parentType ? parentId : item.id,
    masterProfileType: masterType,
    detailProfileId: masterType === parentType ? item.id : parentId,
    detailProfileType: detailType,
  }));

  const link = lines => {
    const uniqueLines = lines.filter(line => data.findIndex(item => item.id === line.id) === -1);
    const newData = [...data, ...uniqueLines];
    const linesToAdd = uniqueLines.filter(line => findRelIndex(relationsToDelete, line) === -1);

    if (linesToAdd && linesToAdd.length) {
      const relsToAdd = [...relationsToAdd, ...composeRelations(linesToAdd)];

      onLink(relsToAdd);
    }

    setData(newData);
    setPluginDisabled(isPluginDisabled(newData));
  };

  const remove = row => {
    const index = data.findIndex(item => item.id === row.id);
    const newIdx = findRelIndex(relationsToAdd, row);

    if (newIdx < 0) {
      const relsToDel = [...relationsToDelete, ...composeRelations([row])];

      onUnlink(relsToDel);
    }

    data.splice(index, 1);
    setData(data);
    setPluginDisabled(isPluginDisabled(data));
  };

  return (
    <Fragment {...dataAttributes}>
      <AssociatedList
        entityKey={entityKey}
        namespaceKey={namespaceKey}
        checkboxList={checkboxList}
        columnWidths={columnWidths}
        contentData={data}
        onSort={noop}
        onRemove={cur => {
          setCurrent(cur);
          setConfirmationOpen(true);
        }}
        className={css['list-editable']}
        isStatic={false}
        isMultiSelect
      />
      <br />
      <Pluggable
        aria-haspopup="true"
        type="find-import-profile"
        id="clickable-find-import-profile"
        searchLabel={<FormattedMessage id="ui-data-import.settings.profile.select" />}
        searchButtonStyle="default"
        onLink={link}
        entityKey={entityKey}
        dataKey={entityKey}
        disabled={pluginDisabled}
        isSingleSelect={!isMultiSelect}
        isMultiLink={isMultiLink}
        marginTop0
        data-test-plugin-find-record-button
      >
        <span data-test-no-plugin-available>
          <FormattedMessage id="ui-data-import.find-import-profile-plugin-unavailable" />
        </span>
      </Pluggable>
      <ConfirmationModal
        id="confirm-edit-action-profile-modal"
        open={confirmationOpen}
        heading={<FormattedMessage id="ui-data-import.modal.profile.unlink.heading" />}
        message={(
          <FormattedMessage
            id="ui-data-import.modal.profile.unlink.message"
            values={{ name: current ? current.name : '' }}
          />
        )}
        confirmLabel={<FormattedMessage id="ui-data-import.confirm" />}
        onConfirm={() => {
          setConfirmationOpen(false);
          remove(current);
        }}
        onCancel={() => setConfirmationOpen(false)}
      />
    </Fragment>
  );
});

AssociatorEditable.propTypes = {
  entityKey: PropTypes.string.isRequired,
  namespaceKey: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired || PropTypes.number.isRequired,
  parentType: PropTypes.string.isRequired,
  masterType: PropTypes.string.isRequired,
  detailType: PropTypes.string.isRequired,
  contentData: PropTypes.arrayOf(PropTypes.object),
  isMultiSelect: PropTypes.bool,
  isMultiLink: PropTypes.bool,
  dataAttributes: PropTypes.shape(PropTypes.object),
  relationsToAdd: PropTypes.arrayOf(PropTypes.object),
  relationsToDelete: PropTypes.arrayOf(PropTypes.object),
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
};

AssociatorEditable.defaultProps = {
  contentData: [],
  isMultiSelect: true,
  isMultiLink: true,
  dataAttributes: null,
  relationsToAdd: [],
  relationsToDelete: [],
  onLink: noop,
  onUnlink: noop,
};