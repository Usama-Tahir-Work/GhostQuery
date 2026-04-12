import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFormDialog from './components/EmployeeFormDialog';
import EncryptedViewDialog from './components/EncryptedViewDialog';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEncryptedEmployee,
} from './services/api';

export default function App() {
  /* ── State ─────────────────────────────────────────── */
  const [employees, setEmployees] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCount, setSearchCount] = useState(0);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchMeta, setSearchMeta] = useState(null);

  // Dialogs
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [encryptedOpen, setEncryptedOpen] = useState(false);
  const [encryptedData, setEncryptedData] = useState(null);
  const [encryptedLoading, setEncryptedLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Snackbar
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  /* ── Load employees ────────────────────────────────── */
  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data || []);
      if (!isSearchResult) setDisplayList(res.data || []);
    } catch {
      showSnack('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  }, [isSearchResult]);

  useEffect(() => {
    loadEmployees();
  }, []);

  /* ── Helpers ───────────────────────────────────────── */
  const showSnack = (message, severity = 'success') =>
    setSnack({ open: true, message, severity });

  /* ── Search callbacks ──────────────────────────────── */
  const handleSearchResults = useCallback((data) => {
    setSearchCount((c) => c + 1);
    if (data) {
      setIsSearchResult(true);
      setSearchMeta(data);
      setDisplayList(data.results || []);
      showSnack(
        `Database-level encrypted search returned ${data.totalResults} result(s)`,
        data.totalResults > 0 ? 'success' : 'info'
      );
    } else {
      showSnack('Search failed', 'error');
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setIsSearchResult(false);
    setSearchMeta(null);
    setDisplayList(employees);
  }, [employees]);

  /* ── CRUD handlers ─────────────────────────────────── */
  const handleAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editData) {
        await updateEmployee(editData.id, formData);
        showSnack('Employee updated — data re-encrypted & search indices rebuilt');
      } else {
        await createEmployee(formData);
        showSnack('Employee created — all fields AES-256 encrypted');
      }
      setFormOpen(false);
      setEditData(null);
      setIsSearchResult(false);
      setSearchMeta(null);
      await loadEmployees();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Operation failed';
      showSnack(msg, 'error');
    }
  };

  const handleDeleteClick = (id) => setDeleteConfirm(id);

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(deleteConfirm);
      showSnack('Employee and all search indices deleted');
      setDeleteConfirm(null);
      setIsSearchResult(false);
      setSearchMeta(null);
      await loadEmployees();
    } catch {
      showSnack('Delete failed', 'error');
    }
  };

  const handleViewEncrypted = async (id) => {
    setEncryptedOpen(true);
    setEncryptedLoading(true);
    try {
      const res = await getEncryptedEmployee(id);
      setEncryptedData(res.data);
    } catch {
      showSnack('Failed to load encrypted data', 'error');
      setEncryptedOpen(false);
    } finally {
      setEncryptedLoading(false);
    }
  };

  /* ── Estimated index count (approx) ────────────────── */
  const estimatedIndices = employees.length > 0 ? employees.length * 330 : 0;

  /* ── Render ────────────────────────────────────────── */
  return (
    <>
      <Box className="app-background" />

      <Header onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />

      <Box className="page-container">
        <StatsCards
          totalEmployees={employees.length}
          totalIndices={estimatedIndices}
          searchCount={searchCount}
        />

        <EmployeeTable
          employees={displayList}
          loading={loading}
          isSearchResult={isSearchResult}
          searchMeta={searchMeta}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onViewEncrypted={handleViewEncrypted}
        />
      </Box>

      {/* ── Add / Edit Dialog ─────────────────────────── */}
      <EmployeeFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditData(null);
        }}
        onSubmit={handleFormSubmit}
        editData={editData}
      />

      {/* ── Encrypted Data Dialog ─────────────────────── */}
      <EncryptedViewDialog
        open={encryptedOpen}
        onClose={() => {
          setEncryptedOpen(false);
          setEncryptedData(null);
        }}
        data={encryptedData}
        loading={encryptedLoading}
      />

      {/* ── Delete Confirmation ───────────────────────── */}
      <Dialog
        open={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>
          <Box className="dialog-title">
            <WarningAmberIcon sx={{ color: '#FF6B6B' }} />
            <Typography sx={{ fontWeight: 700 }}>Delete Employee</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#94A3B8' }}>
            This will permanently delete the employee record and <strong>all associated HMAC search indices</strong>.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button variant="outlined" onClick={() => setDeleteConfirm(null)} sx={{ color: '#94A3B8', borderColor: '#334155' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B, #EE5A5A)',
              '&:hover': { background: 'linear-gradient(135deg, #EE5A5A, #DD4444)' },
            }}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ──────────────────────────────────── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
