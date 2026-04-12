import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

const initialForm = { name: '', email: '', phone: '', department: '' };

export default function EmployeeFormDialog({ open, onClose, onSubmit, editData }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(editData);

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || '',
        email: editData.email || '',
        phone: editData.phone || '',
        department: editData.department || '',
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editData, open]);

  const validate = () => {
    const e = {};
    if (!isEdit && !form.name.trim()) e.name = 'Name is required';
    if (!isEdit && !form.email.trim()) e.email = 'Email is required';
    if (!isEdit && !form.phone.trim()) e.phone = 'Phone is required';
    if (!isEdit && !form.department.trim()) e.department = 'Department is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (isEdit) {
      const updates = {};
      if (form.name.trim()) updates.name = form.name;
      if (form.email.trim()) updates.email = form.email;
      if (form.phone.trim()) updates.phone = form.phone;
      if (form.department.trim()) updates.department = form.department;
      onSubmit(updates);
    } else {
      onSubmit(form);
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box className="dialog-title">
          <Box className={`dialog-title-icon ${isEdit ? 'dialog-title-icon--edit' : 'dialog-title-icon--add'}`}>
            {isEdit ? <EditIcon /> : <PersonAddIcon />}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {isEdit ? 'Edit Employee' : 'Add New Employee'}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 400 }}>
              {isEdit
                ? 'Update fields you want to change. Data will be re-encrypted.'
                : 'All data will be AES-256 encrypted before storage.'}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: '16px !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handleChange('name')}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            placeholder={isEdit ? 'Leave blank to keep current' : 'e.g. Ahmed Khan'}
          />
          <TextField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            placeholder={isEdit ? 'Leave blank to keep current' : 'e.g. ahmed@company.com'}
          />
          <TextField
            label="Phone Number"
            value={form.phone}
            onChange={handleChange('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            fullWidth
            placeholder={isEdit ? 'Leave blank to keep current' : 'e.g. +923001234567'}
          />
          <TextField
            label="Department"
            value={form.department}
            onChange={handleChange('department')}
            error={Boolean(errors.department)}
            helperText={errors.department}
            fullWidth
            placeholder={isEdit ? 'Leave blank to keep current' : 'e.g. Engineering'}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} sx={{ color: '#94A3B8', borderColor: '#334155' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? 'Update & Re-Encrypt' : 'Encrypt & Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
