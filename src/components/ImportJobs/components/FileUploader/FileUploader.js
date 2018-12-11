import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import classNames from 'classnames/bind';
import { isFunction } from 'lodash';

import { Button } from '@folio/stripes/components';

import defaultStyles from './defaultStyles.css';
import css from './FileUploader.css';

const cx = classNames.bind(css);

const FileUploader = props => {
  const {
    title,
    uploadBtnText,
    accept,
    isDropZoneActive,
    className,
    acceptClassName,
    activeClassName,
    rejectClassName,
    disabledClassName,
    maxSize,
    children,
    style,
    getDataTransferItems,
    onDrop,
    onDragEnter,
    onDragLeave,
  } = props;
  const titleClassName = cx({
    uploadTitle: true,
    activeUploadTitle: isDropZoneActive,
  });

  return (
    <ReactDropzone
      disableClick
      className={className}
      style={style}
      activeClassName={activeClassName}
      accept={accept}
      acceptClassName={acceptClassName}
      rejectClassName={rejectClassName}
      disabledClassName={disabledClassName}
      maxSize={maxSize}
      getDataTransferItems={getDataTransferItems}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {({ open }) => (
        <Fragment>
          <span className={titleClassName}>
            {title}
          </span>
          <div hidden={isDropZoneActive}>
            <Button
              buttonStyle="primary"
              onClick={open}
            >
              {uploadBtnText}
            </Button>
          </div>
          <div hidden={isDropZoneActive}>
            {isFunction(children) ? children(open) : children}
          </div>
        </Fragment>
      )}
    </ReactDropzone>
  );
};

FileUploader.propTypes = {
  title: PropTypes.node.isRequired,
  uploadBtnText: PropTypes.node.isRequired,
  isDropZoneActive: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  className: PropTypes.string,
  acceptClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  rejectClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  maxSize: PropTypes.number,
  style: PropTypes.object,
  getDataTransferItems: PropTypes.func,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

FileUploader.defaultProps = {
  className: defaultStyles.defaultFileUploader,
};

export default FileUploader;
