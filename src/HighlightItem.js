import { ListItem, ListItemText, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

function HighlightItem({ annotation, handleDelete }) {
    return <ListItem
        secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(annotation.id)}>
                <DeleteIcon />
            </IconButton>
        }
    >
        <ListItemText
            disableTypography
            primary={<Typography variant="body2" style={{ color: annotation.color }}>{annotation.description}</Typography>}
        />
    </ListItem>
}

export default HighlightItem;
