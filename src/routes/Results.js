/* istanbul ignore file */
import React, { Component } from 'react';

import {
  Button,
  Icon,
  Pane,
  Paneset,
  PaneMenu,
  IconButton,
} from '@folio/stripes/components';

import { SearchPanel } from '../components/SearchPanel';
import { ResultPanel } from '../components/ResultPanel';
import { Report } from '../components/Report';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterPaneIsVisible: true,
      recordDetailsPaneIsVisible: true,
    };
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  };

  toggleRecordDetailsPane = () => {
    this.setState(prevState => ({ recordDetailsPaneIsVisible: !prevState.recordDetailsPaneIsVisible }));
  };

  addFirstMenu() {
    return (
      <PaneMenu>
        <IconButton
          icon="times"
          onClick={this.toggleFilterPane}
        />
      </PaneMenu>
    );
  }

  addResultsFirstMenu() {
    return (
      <PaneMenu>
        <IconButton
          icon="search"
          onClick={this.toggleFilterPane}
        />
      </PaneMenu>
    );
  }

  addResultsLastMenu() {
    return (
      <PaneMenu>
        <Button
          href="#"
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
        >
          Export <Icon icon="caret-down" />
        </Button>
      </PaneMenu>
    );
  }

  addRecordDetailsMenu() {
    return (
      <PaneMenu>
        <IconButton
          icon="times"
          onClick={this.toggleRecordDetailsPane}
        />
      </PaneMenu>
    );
  }

  render() {
    const {
      filterPaneIsVisible,
      recordDetailsPaneIsVisible,
    } = this.state;

    return (
      <Paneset>
        {filterPaneIsVisible &&
          <Pane
            defaultWidth="20"
            paneTitle="Search and Filter"
            firstMenu={this.addFirstMenu()}
          >
            <SearchPanel />
          </Pane>
        }
        <Pane
          defaultWidth="fill"
          paneTitle={<div>Search Results <Icon icon="caret-down" /></div>}
          paneSub="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur beatae blanditiis"
          firstMenu={this.addResultsFirstMenu()}
          lastMenu={this.addResultsLastMenu()}
        >
          <ResultPanel itemOnClick={this.toggleRecordDetailsPane} />
        </Pane>
        {recordDetailsPaneIsVisible &&
          <Pane
            defaultWidth="fill"
            paneTitle="Source Record 51/354"
            firstMenu={this.addRecordDetailsMenu()}
          >
            <Report />
          </Pane>
        }
      </Paneset>
    );
  }
}
