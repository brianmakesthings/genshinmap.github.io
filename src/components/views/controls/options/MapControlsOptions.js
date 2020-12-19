/**
 * Provides the interface for the Options tab of the map controls.
 */

import { Button, Switch } from '@material-ui/core';
import clsx from 'clsx';
import ReactSlider from 'rc-slider';
import React from 'react';
import { connect } from 'react-redux';

import { f, t } from '~/components/i18n/Localization';
import { useImageExtension } from '~/components/interface/Image';
import { exportDataJSON } from '~/components/preferences/DataExport';
import { exportLegacyDataJSON } from '~/components/preferences/LegacyExport';
import { getApplicationVersion } from '~/components/Util';
import MapControlsOptionsLanguage from '~/components/views/controls/options/MapControlsOptionsLanguage';
import ClearMapDataPopup from '~/components/views/popups/ClearMapDataPopup';
import ExportDataPopup from '~/components/views/popups/ExportDataPopup';
import ImportDataPopup from '~/components/views/popups/ImportDataPopup';
import { clearMapPreferences } from '~/redux/ducks';
import {
  importNewDataFromString,
  importLegacyDataFromString,
  SET_IMPORT_ERROR,
} from '~/redux/ducks/import';
import {
  setClusterMarkers,
  setCompletedAlpha,
  setHideFeaturesInEditor,
  setHideRoutesInEditor,
  setOverrideLang,
  setRegionLabelsEnabled,
  setShowHiddenFeatures,
  setWorldBorderEnabled,
} from '~/redux/ducks/options';
import { setEditorEnabled } from '~/redux/ducks/ui';

import './MapControlsOptions.css';
import 'rc-slider/assets/index.css';

// Note: The dispatchers generated by mapDispatchToProps
// shadow their associated action generators.
/* eslint-disable no-shadow */
const _MapControlsOptions = ({
  displayed,
  options,
  editorEnabled,
  setEditorEnabled,
  setCompletedAlpha,
  setWorldBorderEnabled,
  setRegionLabelsEnabled,
  setClusterMarkers,
  setHideFeaturesInEditor,
  setShowHiddenFeatures,
  setHideRoutesInEditor,
  importData,
  importLegacyData,
  clearState,
}) => {
  const ext = useImageExtension();

  return (
    <div className={clsx(displayed ? '' : 'display-none')}>
      <span className={clsx('map-controls-options-subtitle')}>
        {f('options-subtitle-format', { version: getApplicationVersion() })}
      </span>
      <MapControlsOptionsLanguage />
      <div
        className={clsx('map-controls-options-container', `map-controls-options-container-${ext}`)}
      >
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>{t('options-editor-enable')}</span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setEditorEnabled(event.target.checked)}
            checked={editorEnabled}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>
            {t('options-editor-hide-features')}
          </span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setHideFeaturesInEditor(event.target.checked)}
            checked={options.hideFeaturesInEditor}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>
            {t('options-editor-hide-routes')}
          </span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setHideRoutesInEditor(event.target.checked)}
            checked={options.hideRoutesInEditor}
          />
        </div>
      </div>
      <div
        className={clsx('map-controls-options-container', `map-controls-options-container-${ext}`)}
      >
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>
            {t('options-completed-opacity')}
          </span>
          <ReactSlider
            className={clsx('map-controls-option-slider')}
            min={0.1}
            max={1}
            value={options.completedAlpha}
            step={0.1}
            onChange={setCompletedAlpha}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>{t('options-cluster-markers')}</span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setClusterMarkers(event.target.checked)}
            checked={options.clusterMarkers}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>{t('options-world-border')}</span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setWorldBorderEnabled(event.target.checked)}
            checked={options.worldBorderEnabled}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>{t('options-region-labels')}</span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setRegionLabelsEnabled(event.target.checked)}
            checked={options.regionLabelsEnabled}
          />
        </div>
        <div className={clsx('map-controls-option-switch')}>
          <span className={clsx('map-controls-option-label')}>
            {t('options-show-hidden-features')}
          </span>
          <Switch
            size="small"
            color="primary"
            onChange={(event) => setShowHiddenFeatures(event.target.checked)}
            checked={options.showHiddenFeatures}
          />
        </div>
      </div>
      <div
        className={clsx('map-controls-options-container', `map-controls-options-container-${ext}`)}
      >
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>{t('options-import-new')}</span>
          <ImportDataPopup
            title={t('options-import-new')}
            content={t('popup-import-new-content')}
            trigger={
              <Button className={clsx('map-controls-option-button')} variant="contained">
                {t('options-import-button')}
              </Button>
            }
            onConfirm={importData}
          />
        </div>
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>{t('options-export-new')}</span>
          <ExportDataPopup
            title={t('options-export-new')}
            message={t('popup-export-new-content')}
            fetchData={exportDataJSON}
            trigger={
              <Button className={clsx('map-controls-option-button')} variant="contained">
                {t('options-export-button')}
              </Button>
            }
          />
        </div>
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>{t('options-clear-data')}</span>
          <ClearMapDataPopup
            trigger={
              <Button className={clsx('map-controls-option-button')} variant="contained">
                {t('options-clear-data-button')}
              </Button>
            }
            onConfirm={clearState}
          />
        </div>
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>{t('options-import-old')}</span>
          <ImportDataPopup
            title={t('options-import-old')}
            content={t('popup-import-old-content')}
            trigger={
              <Button className={clsx('map-controls-option-button')} variant="contained">
                {t('options-import-button')}
              </Button>
            }
            onConfirm={importLegacyData}
          />
        </div>
        <div className={clsx('map-controls-option')}>
          <span className={clsx('map-controls-option-label')}>{t('options-export-old')}</span>
          <ExportDataPopup
            title={t('options-export-old')}
            message={t('popup-export-old-content')}
            fetchData={exportLegacyDataJSON}
            trigger={
              <Button className={clsx('map-controls-option-button')} variant="contained">
                {t('options-export-button')}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  displayed: state.controlsTab === 'options',
  options: state.options,
  editorEnabled: state.editorEnabled,
});
const mapDispatchToProps = (dispatch) => ({
  setEditorEnabled: (enabled) => dispatch(setEditorEnabled(enabled)),
  setCompletedAlpha: (alpha) => dispatch(setCompletedAlpha(alpha)),
  setWorldBorderEnabled: (enabled) => dispatch(setWorldBorderEnabled(enabled)),
  setRegionLabelsEnabled: (enabled) => dispatch(setRegionLabelsEnabled(enabled)),
  setClusterMarkers: (enabled) => dispatch(setClusterMarkers(enabled)),
  setHideFeaturesInEditor: (enabled) => dispatch(setHideFeaturesInEditor(enabled)),
  setHideRoutesInEditor: (enabled) => dispatch(setHideRoutesInEditor(enabled)),
  setShowHiddenFeatures: (enabled) => dispatch(setShowHiddenFeatures(enabled)),
  setOverrideLang: (lang) => dispatch(setOverrideLang(lang)),
  importData: (data) => {
    const action = importNewDataFromString(data);
    dispatch(action);
    // Return a result to the popup to tell it whether to close.
    return action.type !== SET_IMPORT_ERROR;
  },
  importLegacyData: (data) => {
    const action = importLegacyDataFromString(data);
    dispatch(action);
    // Return a result to the popup to tell it whether to close.
    return action.type !== SET_IMPORT_ERROR;
  },
  clearState: () => dispatch(clearMapPreferences()),
});
const MapControlsOptions = connect(mapStateToProps, mapDispatchToProps)(_MapControlsOptions);

export default MapControlsOptions;