import { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import { searchEmployees } from '../services/api';

const FIELD_OPTIONS = [
  { value: '', label: 'All Fields' },
  { value: 'Name', label: 'Name' },
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
  { value: 'Department', label: 'Department' },
];

export default function Header({ onSearchResults, onClearSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim().length < 3) return;
    setLoading(true);
    try {
      const res = await searchEmployees(searchTerm, fieldName || null);
      onSearchResults(res.data);
    } catch {
      onSearchResults(null);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, fieldName, onSearchResults]);

  const handleClear = () => {
    setSearchTerm('');
    setFieldName('');
    onClearSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <AppBar position="sticky" elevation={0} className="app-header">
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Box className="header-logo">
          <Box className="header-logo-icon">
            <LockIcon sx={{ fontSize: 22, color: '#fff' }} />
          </Box>
          <Box>
            <Typography className="header-title">CipherSearch</Typography>
            <Typography className="header-subtitle">Encrypted Data Search Engine</Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Inline Search Bar in Header */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search encrypted data (min 3 chars)…"
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              if (!val.trim()) handleClear();
            }}
            onKeyDown={handleKeyDown}
            sx={{ width: 280 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: '#64748B', fontSize: 20 }} />,
            }}
          />
          <TextField
            select
            size="small"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            sx={{ width: 130 }}
          >
            {FIELD_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || searchTerm.trim().length < 3}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          </Button>
          {searchTerm && (
            <Button variant="outlined" size="small" onClick={handleClear} sx={{ minWidth: 'auto' }}>
              Clear
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
