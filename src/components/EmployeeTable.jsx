import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SearchOffIcon from '@mui/icons-material/SearchOff';

function getDepartmentClass(department) {
  const key = department?.toLowerCase().replace(/\s+/g, '-') || '';
  const known = ['engineering', 'marketing', 'finance', 'human-resources'];
  return known.includes(key) ? `department-chip--${key}` : 'department-chip--default';
}

export default function EmployeeTable({
  employees,
  loading,
  isSearchResult,
  searchMeta,
  onAdd,
  onEdit,
  onDelete,
  onViewEncrypted,
}) {
  return (
    <Box className="table-section fade-in-up">
      <Box className="table-header">
        <Box>
          <Typography className="table-header__title">
            {isSearchResult ? 'Search Results' : 'Employee Directory'}
          </Typography>
          {isSearchResult && searchMeta && (
            <Typography sx={{ fontSize: '0.78rem', color: '#64748B', mt: 0.5 }}>
              Found <strong style={{ color: '#00D9A6' }}>{searchMeta.totalResults}</strong> result(s)
              for "<strong style={{ color: '#6C63FF' }}>{searchMeta.searchTerm}</strong>"
              {searchMeta.fieldSearched && (
                <> in <Chip label={searchMeta.fieldSearched} size="small" sx={{ ml: 0.5, height: 20, fontSize: '0.7rem' }} /></>
              )}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography className="table-header__count">
            {employees.length} record{employees.length !== 1 ? 's' : ''}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            size="small"
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box>
          {[...Array(4)].map((_, i) => (
            <Box key={i} className="skeleton-row">
              <Box className="skeleton-block" sx={{ width: '5%' }} />
              <Box className="skeleton-block" sx={{ width: '22%' }} />
              <Box className="skeleton-block" sx={{ width: '28%' }} />
              <Box className="skeleton-block" sx={{ width: '15%' }} />
              <Box className="skeleton-block" sx={{ width: '15%' }} />
              <Box className="skeleton-block" sx={{ width: '10%' }} />
            </Box>
          ))}
        </Box>
      ) : employees.length === 0 ? (
        <Box className="empty-state">
          <Box className="empty-state__icon">
            {isSearchResult ? <SearchOffIcon sx={{ fontSize: 36 }} /> : <LockOpenIcon sx={{ fontSize: 36 }} />}
          </Box>
          <Typography className="empty-state__title">
            {isSearchResult ? 'No matches found' : 'No employees yet'}
          </Typography>
          <Typography className="empty-state__text">
            {isSearchResult
              ? 'Try a different search term or field filter. Remember, minimum 3 characters.'
              : 'Add your first employee to see their data encrypted and searchable.'}
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Department</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp, idx) => (
                <TableRow
                  key={emp.id}
                  className="fade-in-up"
                  sx={{
                    animationDelay: `${idx * 0.03}s`,
                    '&:hover': { backgroundColor: 'rgba(108, 99, 255, 0.04)' },
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 700, color: '#6C63FF', fontSize: '0.85rem' }}>
                      #{emp.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{emp.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#94A3B8', fontSize: '0.85rem' }}>{emp.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.82rem', color: '#CBD5E1' }}>
                      {emp.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={emp.department}
                      size="small"
                      className={`department-chip ${getDepartmentClass(emp.department)}`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Encrypted Data" arrow>
                      <IconButton
                        className="action-btn"
                        size="small"
                        onClick={() => onViewEncrypted(emp.id)}
                        sx={{ color: '#00D9A6' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        className="action-btn"
                        size="small"
                        onClick={() => onEdit(emp)}
                        sx={{ color: '#38BDF8' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        className="action-btn"
                        size="small"
                        onClick={() => onDelete(emp.id)}
                        sx={{ color: '#FF6B6B' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
