import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from '../../components/ArticleItem/Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Markdowns(props) {
  const classes = useStyles();

  return (
        <Markdown className={classes.markdown}>
          # Sample blog post

        #### April 1, 2020 by [Olivier](/)

        This blog post shows a few different types of content that are supported and styled with
        Material styles. Basic typography, images, and code are all supported.
        You can extend these by modifying `Markdown.js`.

        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
        </Markdown>
  );
}