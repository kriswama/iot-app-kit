import React, { FC, useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ButtonDropdown, SpaceBetween } from '@cloudscape-design/components';
import { useIntl } from 'react-intl';

import { KnownComponentType } from '../../interfaces';
import { sceneComposerIdContext } from '../../common/sceneComposerIdContext';
import { ICameraComponentInternal, accessStore } from '../../store';
import useActiveCamera from '../../hooks/useActiveCamera';
import useMatterportViewer from '../../hooks/useMatterportViewer';
import { findComponentByType } from '../../utils/nodeUtils';
import { getCameraSettings } from '../../utils/cameraUtils';

// TODO: SpaceBetween is not intended to have custom styles, we should refactor this to use our own spacing component
// if these styles are really needed.
const StyledSpaceBetween = styled(SpaceBetween)`
  flex: 1;
  justify-content: right;
`;

export const TopBar: FC = () => {
  const sceneComposerId = useContext(sceneComposerIdContext);
  const nodeMap = accessStore(sceneComposerId)((state) => state.document.nodeMap);
  const getSceneNodeByRef = accessStore(sceneComposerId)((state) => state.getSceneNodeByRef);
  const getObject3DBySceneNodeRef = accessStore(sceneComposerId)((state) => state.getObject3DBySceneNodeRef);
  const { setActiveCameraSettings } = useActiveCamera();
  const { enableMatterportViewer } = useMatterportViewer();
  const intl = useIntl();

  const cameraItems = useMemo(() => {
    return Object.values(nodeMap)
      .filter((node) => {
        return findComponentByType(node, KnownComponentType.Camera);
      })
      .map((cameraNode) => {
        return {
          id: cameraNode.ref,
          text: cameraNode!.name,
        };
      });
  }, [nodeMap]);

  const hasCameraView = cameraItems.length > 0 && !enableMatterportViewer;
  const showTopBar = hasCameraView;

  const setActiveCameraOnItemClick = useCallback(
    ({ detail }) => {
      const node = getSceneNodeByRef(detail.id);
      const cameraComponent = findComponentByType(node, KnownComponentType.Camera) as ICameraComponentInternal;
      const object3D = getObject3DBySceneNodeRef(detail.id);

      setActiveCameraSettings(getCameraSettings(object3D, cameraComponent), 'transition', true);
    },
    [setActiveCameraSettings],
  );

  if (showTopBar) {
    return (
      <StyledSpaceBetween direction='horizontal' size='xxs'>
        {hasCameraView && (
          <ButtonDropdown data-testid='camera-views' items={cameraItems} onItemClick={setActiveCameraOnItemClick}>
            {intl.formatMessage({ defaultMessage: 'Camera View', description: 'camera views dropdown button text' })}
          </ButtonDropdown>
        )}
      </StyledSpaceBetween>
    );
  }

  return <></>;
};
