import { Typography, Container, Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Container maxWidth="md">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
      </Box>
    </Container>
  );
}
