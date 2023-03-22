import { Paper, Stack, TextField, Button } from "@mui/material";

import { useNotiContext } from "../../context/noti";

export const CopyUrlBox = () => {
  const url = window.location.href;
  const { showNoti } = useNotiContext();
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <TextField label="URL" value={url} />
        <Button
          variant="contained"
          onClick={() => {
            navigator.clipboard.writeText(url);
            showNoti({ type: "success", msg: "Copied" });
          }}
        >
          Copy
        </Button>
      </Stack>
    </Paper>
  );
};
