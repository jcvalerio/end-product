import './ksIcon.scss';

import { KuiIcon } from '@kleeen/components-react';
import React from 'react';

// ks-inherit-size is necessary to trick KUI lib, it is expecting one of their
// well known size classes (sizeXS, sizeS, sizeM, etc) but since we are sending
// one that doesn't exist, it just fall backs to use the parent's width and height.
const KsIcon = ({ icon }) => <KuiIcon kuiIcon={icon} kuiSize="ks-inherit-size" />;

export default KsIcon;
