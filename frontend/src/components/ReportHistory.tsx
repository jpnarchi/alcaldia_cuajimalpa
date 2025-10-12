import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  Download,
  Visibility,
  FilterList,
  Refresh,
  Description,
  CalendarToday,
  Person,
} from '@mui/icons-material';

interface Report {
  id: string;
  title: string;
  type: string;
  department: string;
  createdBy: string;
  createdAt: string;
  status: 'completed' | 'processing' | 'failed';
  format: string;
  size: string;
}

export const ReportHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos de ejemplo
  const reports: Report[] = [
    {
      id: '1',
      title: 'Reporte Financiero Q1 2024',
      type: 'Reporte Financiero',
      department: 'Finanzas',
      createdBy: 'Juan Pérez',
      createdAt: '2024-01-15',
      status: 'completed',
      format: 'PDF',
      size: '2.3 MB',
    },
    {
      id: '2',
      title: 'Servicios Ciudadanos - Enero',
      type: 'Servicios Ciudadanos',
      department: 'Servicios Públicos',
      createdBy: 'María García',
      createdAt: '2024-01-20',
      status: 'completed',
      format: 'Excel',
      size: '1.8 MB',
    },
    {
      id: '3',
      title: 'Infraestructura - Proyectos',
      type: 'Infraestructura',
      department: 'Obras Públicas',
      createdBy: 'Carlos López',
      createdAt: '2024-01-25',
      status: 'processing',
      format: 'PDF',
      size: '0 MB',
    },
    {
      id: '4',
      title: 'Programas Sociales - Diciembre',
      type: 'Programas Sociales',
      department: 'Desarrollo Social',
      createdBy: 'Ana Martínez',
      createdAt: '2024-01-10',
      status: 'failed',
      format: 'PDF',
      size: '0 MB',
    },
    {
      id: '5',
      title: 'Reporte Administrativo Q4 2023',
      type: 'Reporte Administrativo',
      department: 'Administración',
      createdBy: 'Luis Rodríguez',
      createdAt: '2023-12-30',
      status: 'completed',
      format: 'PDF',
      size: '3.1 MB',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'Procesando';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || report.type === filterType;
    const matchesStatus = !filterStatus || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleDownloadReport = (report: Report) => {
    if (report.status === 'completed') {
      // Simular descarga
      console.log(`Descargando reporte: ${report.title}`);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Historial de Reportes
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Buscar reportes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Tipo"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Reporte Financiero">Reporte Financiero</MenuItem>
                <MenuItem value="Reporte Administrativo">Reporte Administrativo</MenuItem>
                <MenuItem value="Servicios Ciudadanos">Servicios Ciudadanos</MenuItem>
                <MenuItem value="Infraestructura">Infraestructura</MenuItem>
                <MenuItem value="Programas Sociales">Programas Sociales</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Estado"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="completed">Completado</MenuItem>
                <MenuItem value="processing">Procesando</MenuItem>
                <MenuItem value="failed">Fallido</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setFilterStatus('');
                setCurrentPage(1);
              }}
            >
              Limpiar
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Creado por</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Formato</TableCell>
              <TableCell>Tamaño</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {report.title}
                  </Typography>
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.department}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1, fontSize: 16, color: 'action.active' }} />
                    {report.createdBy}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'action.active' }} />
                    {new Date(report.createdAt).toLocaleDateString('es-MX')}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(report.status)}
                    color={getStatusColor(report.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{report.format}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleViewReport(report)}
                      title="Ver detalles"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDownloadReport(report)}
                      disabled={report.status !== 'completed'}
                      title="Descargar"
                    >
                      <Download />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Dialog para ver detalles del reporte */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Description sx={{ mr: 1 }} />
            Detalles del Reporte
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedReport.title}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tipo de Reporte
                  </Typography>
                  <Typography variant="body1">{selectedReport.type}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Departamento
                  </Typography>
                  <Typography variant="body1">{selectedReport.department}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Creado por
                  </Typography>
                  <Typography variant="body1">{selectedReport.createdBy}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Creación
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedReport.createdAt).toLocaleDateString('es-MX')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={getStatusLabel(selectedReport.status)}
                    color={getStatusColor(selectedReport.status) as any}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Formato
                  </Typography>
                  <Typography variant="body1">{selectedReport.format}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
          {selectedReport?.status === 'completed' && (
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => handleDownloadReport(selectedReport)}
            >
              Descargar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
