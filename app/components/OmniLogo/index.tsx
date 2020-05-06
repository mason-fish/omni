import React from 'react';

import Omni from './omni.svg';

export default function OmniLogo(props: unknown) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <img src={Omni} alt="Omni Logo" {...props} />;
}
