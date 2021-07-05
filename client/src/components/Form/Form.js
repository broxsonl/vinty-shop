import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import { createPost } from '../../actions/posts';
import useStyles from './styles';

const Form = () => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost(postData));
  };

  const clear = () => {

  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          value={postData.creator}
          variant="outlined"
          label="Creator"
          fullWidth
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />

        <TextField
          name="title"
          value={postData.title}
          variant="outlined"
          label="Title"
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name="message"
          value={postData.message}
          variant="outlined"
          label="Message"
          fullWidth
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
          name="tags"
          value={postData.tags}
          variant="outlined"
          label="Tags"
          fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectFile: base64 })}
          />
        </div>
        <Button onClick={handleSubmit} type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>
          Submit
        </Button>
        <Button onClick={clear} variant="contained" color="secondary" size="small" fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
