import { Box, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SearchIcon from '@mui/icons-material/Search';

export default function StatsCards({ totalEmployees, totalIndices, searchCount }) {
  const stats = [
    {
      label: 'Total Employees',
      value: totalEmployees,
      variant: 'primary',
      icon: <PeopleAltIcon sx={{ fontSize: 26 }} />,
    },
    {
      label: 'Encrypted Fields',
      value: totalEmployees * 4,
      variant: 'secondary',
      icon: <EnhancedEncryptionIcon sx={{ fontSize: 26 }} />,
    },
    {
      label: 'Search Indices',
      value: totalIndices,
      variant: 'warning',
      icon: <FingerprintIcon sx={{ fontSize: 26 }} />,
    },
    {
      label: 'Searches Run',
      value: searchCount,
      variant: 'info',
      icon: <SearchIcon sx={{ fontSize: 26 }} />,
    },
  ];

  return (
    <Box className="stats-grid">
      {stats.map((stat, i) => (
        <Box
          key={stat.label}
          className={`stat-card stat-card--${stat.variant} fade-in-up fade-in-up-delay-${i + 1}`}
        >
          <Box className={`stat-card__icon stat-card__icon--${stat.variant}`}>
            {stat.icon}
          </Box>
          <Typography className="stat-card__value">{stat.value}</Typography>
          <Typography className="stat-card__label">{stat.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
