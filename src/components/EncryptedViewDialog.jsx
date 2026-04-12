import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export default function EncryptedViewDialog({ open, onClose, data, loading }) {
  const fields = data
    ? [
        { label: 'Encrypted Name', value: data.encryptedName },
        { label: 'Encrypted Email', value: data.encryptedEmail },
        { label: 'Encrypted Phone', value: data.encryptedPhone },
        { label: 'Encrypted Department', value: data.encryptedDepartment },
      ]
    : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box className="dialog-title">
          <Box className="dialog-title-icon dialog-title-icon--encrypted">
            <LockIcon />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Raw Encrypted Data — Employee #{data?.id}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 400 }}>
              This is exactly how data is stored in the database. AES-256-CBC ciphertext (Base64).
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#6C63FF' }} />
          </Box>
        ) : (
          <Box className="encrypted-display" sx={{ mt: 1 }}>
            {fields.map((field) => (
              <Box key={field.label}>
                <Typography className="encrypted-field-label">{field.label}</Typography>
                <Typography className="encrypted-field-value">{field.value}</Typography>
              </Box>
            ))}
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(148,163,184,0.1)' }}>
              <Typography sx={{ fontSize: '0.72rem', color: '#64748B', fontStyle: 'italic' }}>
                ⚡ Each field uses a unique IV (Initialization Vector), so encrypting the same value twice produces
                different ciphertext — preventing pattern analysis.
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onClose} sx={{ color: '#94A3B8', borderColor: '#334155' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
