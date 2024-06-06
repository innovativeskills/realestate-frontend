import { List, ListItem, ListItemText } from '@mui/material';

const ShowErrorInCourseDetails = ({ messages }) => {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index} style={{ borderBottom: '1px solid #ddd' }}>
          <ListItemText primary={message} primaryTypographyProps={{ style: { color: 'red' } }} />
        </ListItem>
      ))}
    </List>
  );
};

export default ShowErrorInCourseDetails;
