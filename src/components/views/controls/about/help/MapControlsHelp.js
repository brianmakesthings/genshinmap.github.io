/**
 * Provides the view which displays the About > Help tab of the map controls.
 */

import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '~/components/i18n/Localization';
import { useImageExtension } from '~/components/interface/Image';
import { SafeHTML } from '~/components/Util';

import './MapControlsHelp.css';

const _MapControlsHelp = ({ displayed }) => {
  const ext = useImageExtension();

  return (
    <div
      className={clsx(
        'map-controls-about-help-container',
        `map-controls-about-help-container-${ext}`,
        displayed ? '' : 'display-none'
      )}
    >
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-a')}
      </SafeHTML>
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-b')}
      </SafeHTML>
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-c')}
      </SafeHTML>
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-d')}
      </SafeHTML>
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-e')}
      </SafeHTML>
      <SafeHTML className={clsx('map-control-about-help-content')}>
        {t('map-about-help-content-f')}
      </SafeHTML>
    </div>
  );
};

const mapStateToProps = (state) => ({
  displayed: state.controlsTab === 'help' && !state.editorEnabled,
});
const mapDispatchToProps = (_dispatch) => ({});
const MapControlsHelp = connect(mapStateToProps, mapDispatchToProps)(React.memo(_MapControlsHelp));

export default MapControlsHelp;