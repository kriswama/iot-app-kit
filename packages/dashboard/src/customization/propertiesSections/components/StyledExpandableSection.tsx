import { ExpandableSection } from '@cloudscape-design/components';
import { colorBackgroundCellShaded } from '@cloudscape-design/design-tokens';
import styled from 'styled-components';

export const StyledExpandableSection = styled(ExpandableSection)`
  > div:first-child {
    background-color: ${colorBackgroundCellShaded};
  }
`;
