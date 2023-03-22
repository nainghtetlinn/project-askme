import SendIcon from "@mui/icons-material/Send";
import {
  Paper,
  Stack,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotiContext } from "../../context/noti";
import { questionInstance } from "../../requests";

type Props = { user?: string };

export const AskQuestionBox = ({ user }: Props) => {
  const { showNoti } = useNotiContext();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const handleAsk = () => {
    if (!question) {
      return showNoti({ type: "error", msg: "Message required" });
    }
    questionInstance
      .post(`/${user}`, {
        question: question,
      })
      .then((res) => {
        navigate("/success");
      })
      .catch((err) => {
        showNoti({ type: "error", msg: "Something went wrong." });
      });
  };
  return (
    <Paper>
      <Typography align="center" sx={{ pt: 1 }}>
        Ask anonymously to
      </Typography>
      <Typography variant="h5" align="center">
        {user}
      </Typography>

      <DialogContent>
        <TextField
          fullWidth
          label="Question"
          margin="dense"
          multiline
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Stack direction="row" justifyContent="right">
          <IconButton color="primary" onClick={handleAsk}>
            <SendIcon />
          </IconButton>
        </Stack>
      </DialogContent>
    </Paper>
  );
};
