import React, { FC } from 'react';
import { Collapse, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

type Props = {
  isOpen: boolean;
  message: string;
};
const Banner: FC<Props> = ({ isOpen, message }) => {
  return (
    <Collapse in={isOpen}>
      <Box mb={2}>
        <Alert>{message}</Alert>
      </Box>
    </Collapse>
  );
};

export default Banner;
