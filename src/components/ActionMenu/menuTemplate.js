import React from 'react';

import { createLayerURL } from '../../utils';
import { LAYER_TYPES } from '../../utils/constants';

import {
  LinkTo,
  GroupAction,
  Default,
} from './ItemTemplates';

/**
 * Retrieves and returns list of Column Templates renderProps
 *
 * @param {Component} entity
 * @param {object} menu
 * @returns {{(function() *)}}
 */
export const menuTemplate = (entity, menu) => {
  const {
    entityKey,
    props: {
      checkboxList,
      location,
    },
  } = entity;

  return {
    addNew: key => (
      <LinkTo
        key={key}
        caption={`ui-data-import.settings.${entityKey}.new`}
        icon="plus-sign"
        menu={menu}
        location={createLayerURL(location, LAYER_TYPES.CREATE)}
        dataAttributes={{ 'data-test-new-item-menu-button': '' }}
      />
    ),
    edit: key => (
      <LinkTo
        key={key}
        caption="ui-data-import.edit"
        icon="edit"
        menu={menu}
        location={createLayerURL(location, LAYER_TYPES.EDIT)}
        dataAttributes={{ 'data-test-edit-item-menu-button': '' }}
      />
    ),
    duplicate: key => (
      <LinkTo
        key={key}
        caption="ui-data-import.duplicate"
        icon="duplicate"
        menu={menu}
        location={createLayerURL(location, LAYER_TYPES.DUPLICATE)}
        dataAttributes={{ 'data-test-duplicate-item-menu-button': '' }}
      />
    ),
    exportSelected: key => {
      const { selectedRecords: { size: selectedCount } } = checkboxList;

      return (
        <GroupAction
          key={key}
          menu={menu}
          caption="ui-data-import.exportSelected"
          icon="arrow-down"
          selectedCount={selectedCount}
          dataAttributes={{ 'data-test-export-selected-items-menu-button': '' }}
        />
      );
    },
    selectAll: key => {
      const { selectAll } = checkboxList;

      const handleSelectAllButton = () => {
        menu.onToggle();
        selectAll();
      };

      return (
        <Default
          key={key}
          caption="ui-data-import.selectAll"
          icon="select-all"
          dataAttributes={{ 'data-test-select-all-items-menu-button': '' }}
          onClick={handleSelectAllButton}
        />
      );
    },
    deselectAll: key => {
      const { deselectAll } = checkboxList;

      const handleDeselectAllButton = () => {
        menu.onToggle();
        deselectAll();
      };

      return (
        <Default
          key={key}
          caption="ui-data-import.deselectAll"
          icon="deselect-all"
          dataAttributes={{ 'data-test-deselect-all-items-menu-button': '' }}
          onClick={handleDeselectAllButton}
        />
      );
    },
    delete: key => {
      const handleDelete = () => {
        menu.onToggle();
        entity.showDeleteConfirmation();
      };

      return (
        <Default
          key={key}
          caption="ui-data-import.delete"
          icon="trash"
          dataAttributes={{ 'data-test-delete-item-menu-button': '' }}
          onClick={handleDelete}
        />
      );
    },
    restoreDefault: key => {
      const handleRestoreDefaultFileExtensions = () => {
        menu.onToggle();
        entity.showRestoreDefaultFileExtensionsModal();
      };

      return (
        <Default
          key={key}
          caption="ui-data-import.settings.fileExtensions.reset"
          icon="replace"
          dataAttributes={{ 'data-test-restore-default-file-extensions-button': '' }}
          onClick={handleRestoreDefaultFileExtensions}
        />
      );
    },
  };
};
