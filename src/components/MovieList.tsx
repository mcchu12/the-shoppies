import React, { FC, ReactNode } from 'react';
import { List, Typography } from '@material-ui/core';

type Props = { title: string | ReactNode };

const MovieList: FC<Props> = ({ title, children }) => {
  return (
    <List subheader={<Typography variant="h5">{title}</Typography>}>
      {children}
    </List>
  );
};

export default MovieList;
